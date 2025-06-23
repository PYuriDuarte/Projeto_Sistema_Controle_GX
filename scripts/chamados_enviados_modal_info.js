document.addEventListener('mouseenter', function(event) {
    const td = event.target;
    if (td.classList && td.classList.contains('valor_conteudo')) {
        if (td.offsetWidth < td.scrollWidth) {
            td.setAttribute('title', td.textContent);
        } else {
            td.removeAttribute('title');
        }
    }
}, true); // <--- O 'true' garante o hover correto em tabela

function iniciarChatChamado_enviados() {
    const chatMensagens = document.getElementById('modal_info_chamado_enviado_chat_mensagens');
    const inputMensagem = document.getElementById('modal_info_chamado_enviado_mensagem_input');
    const btnEnviar = document.getElementById('modal_info_chamado_enviado_btn_enviar');

    // Garante que os elementos existem
    if (!chatMensagens || !inputMensagem || !btnEnviar) {
        console.warn("Elementos do chat não encontrados.");
        return;
    }

    // Função que adiciona uma mensagem ao chat
    function adicionarMensagem(texto, tipo = 'solicitante') {
        const msg = document.createElement('div');
        msg.classList.add('modal_info_chamado_enviado_msg', tipo);
        msg.textContent = texto;
        chatMensagens.appendChild(msg);
        chatMensagens.scrollTop = chatMensagens.scrollHeight;
    }

    // Função chamada ao enviar mensagem
    function enviarMensagem() {
        const texto = inputMensagem.value.trim();
        if (!texto) return;
        adicionarMensagem(texto, 'solicitante'); // Adiciona a mensagem do usuário
        inputMensagem.value = ''; // Limpa o campo

        // Resposta automática de simulação
        setTimeout(function() {
            adicionarMensagem('Ok! Mensagem recebida.', 'responsavel');
        }, 1200);
    }

    // Evento de click no botão Enviar
    btnEnviar.addEventListener('click', function() {
        enviarMensagem();
    });

    // Evento de pressionar Enter no campo de texto
    inputMensagem.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });

    // Mensagem inicial simulada do responsável
    adicionarMensagem('Olá, em que posso ajudar?', 'responsavel');
}

async function preencher_chamados_enviados_modal_consultados(event, id_chamado) {
    event.preventDefault();

    const payload = { IdChamado: id_chamado };

    try {
        /* ---------------- 1ª consulta ---------------- */
        const chamados = await consultar_chamados(payload);
        
        const tbody = document.getElementById('tbody_enviados_modal_info');
        if (tbody && chamados.length) {
            tbody.innerHTML = chamados
                .map(c => criar_item_chamado_enviado_modal(c))
                .join('');
        }

        const id_tipo_chamado = chamados[0]?.idTipoChamado;
        if (!id_tipo_chamado) return;

        /* ---------------- 2ª consulta ---------------- */
        const arquivosObrig = await consultar_chamados_arquivos_obrigatorios_por_tipo(id_chamado, id_tipo_chamado);

        const lista = document.querySelector('.lista_anexar_arquivos_comprovacao_chamado_enviado');
        if (lista) {
            lista.innerHTML = arquivosObrig
                .map(a => criar_item_chamados_enviados_arquivos_obrigatorios_por_tipo(a))
                .join('');
        }

        ativarUploadArquivos_chamado_enviado_modal(id_chamado, lista)

    } 
    catch (err) {
        console.error('Erro ao preencher modal:', err);
    }
}

function criar_item_chamado_enviado_modal(chamado) {
    campo = `
        <tr>
            <td class="valor_tarefa">
                <span>${chamado.nomeCampo}</span>
            </td>
            <td class="valor_conteudo">
                ${texto_parece_caminho(chamado.valor)
                    ? `<span><button>${chamado.valor}</button></span>`
                    : `<span>${chamado.valor}</span>`
                }
            </td>
        </tr>
        `;
    
    return campo
}

function consultar_chamados_arquivos_obrigatorios_por_tipo(id_chamado, id_tipo_chamado) {
    const sql_comando =
        `
            SELECT
                t.*,
                c.*
            FROM tbl_Chamados_Arquivos_Obrigatorios_Por_Tipo AS t
            LEFT JOIN tbl_Chamados_Arquivos_Caminhos AS c
                ON  c.id_tipo_arquivo = t.id_chamado_arquivo_obrigatorio_por_tipo
                AND c.id_chamado  = @id_chamado
            WHERE t.id_tipo_chamado = @id_tipo_chamado;
        `;
        
    retorno_sql = runSqlSelect(sql_comando, { 
        id_chamado: id_chamado,
        id_tipo_chamado: id_tipo_chamado
    })
    return retorno_sql
}

function criar_item_chamados_enviados_arquivos_obrigatorios_por_tipo(arquivo_obrigatorio) {
    const campo = `
        <li ${arquivo_obrigatorio.caminho_arquivo
            ? 'class="active"'
            : ''} tabindex="0">
            ${arquivo_obrigatorio.nome_tipo_arquivo}

            <input
                type="file"
                data-nome-arquivo="${arquivo_obrigatorio.caminho_arquivo}"
                style="display:none;"
            >
        </li>`;
    
    return campo
}

function ativarUploadArquivos_chamado_enviado_modal(id_chamado, lista) {
    lista.addEventListener('click', event => {
        const li = event.target.closest('li');
        if (!li || !lista.contains(li)) return;

        if (!li.classList.contains('active')) {
            alert('Este item não possui arquivo anexado até o momento.');
            return
        }

        const input = li.querySelector('input[data-nome-arquivo]');
        const caminhoCompleto = input ? input.dataset.nomeArquivo : "";
        const nomeArquivo = caminhoCompleto.split(/[\\/]/).pop();

        const ok = confirm(`Deseja baixar o arquivo:\n\n${nomeArquivo}?`);
        if (!ok) return;

        baixar_arquivo_servidor(String(id_chamado).padStart(7, '0'), categoria_arquivo.COMPROVACAO, nomeArquivo)
    });
}