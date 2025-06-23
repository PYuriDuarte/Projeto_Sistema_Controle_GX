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

function iniciarChatChamado_recebidos() {
    const chatMensagens = document.getElementById('modal_info_chamado_recebido_chat_mensagens');
    const inputMensagem = document.getElementById('modal_info_chamado_recebido_mensagem_input');
    const btnEnviar = document.getElementById('modal_info_chamado_recebido_btn_enviar');

    // Garante que os elementos existem
    if (!chatMensagens || !inputMensagem || !btnEnviar) {
        console.warn("Elementos do chat não encontrados.");
        return;
    }

    // Função que adiciona uma mensagem ao chat
    function adicionarMensagem(texto, tipo = 'solicitante') {
        const msg = document.createElement('div');
        msg.classList.add('modal_info_chamado_recebido_msg', tipo);
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

async function preencher_chamados_recebidos_modal_consultados(event, id_chamado) {
    event.preventDefault();

    const payload = { IdChamado: id_chamado };

    try {
        /* ---------------- 1ª consulta ---------------- */
        const chamados = await consultar_chamados(payload);

        const tbody = document.getElementById('tbody_recebidos_modal_info');
        if (tbody && chamados.length) {
            tbody.innerHTML = chamados
                .map(c => criar_item_chamado_recebido_modal(c))
                .join('');
        }

        const id_tipo_chamado = chamados[0]?.idTipoChamado;
        if (!id_tipo_chamado) return;

        /* ---------------- 2ª consulta ---------------- */
        carregar_lista_arquivos_obrigatorios(id_chamado, id_tipo_chamado)
    } 
    catch (err) {
        console.error('Erro ao preencher modal:', err);
    }
}

function criar_item_chamado_recebido_modal(chamado) {
    campo = `
        <tr>
            <td class="valor_tarefa">
                <span>${chamado.nomeCampo}</span>
            </td>
            <td class="valor_conteudo">
                ${texto_parece_caminho(chamado.valor)
                    ? `<span><button 
                                class="botao_com_anexo" 
                                data-caminho="${chamado.valor}"
                                onclick="baixar_arquivo_anexado_obrigatorio(this)">ANEXADO</button></span>`
                    : `<span>${chamado.valor}</span>`
                }
            </td>
        </tr>
        `;
    
    return campo
}

function baixar_arquivo_anexado_obrigatorio(botao) {
    const caminho_base = "D:\\Público\\Z_Controle_Chamados\\"
    const caminho_completo = botao.dataset.caminho || '';

    const caminho_relativo = caminho_completo.startsWith(caminho_base)
                            ? caminho_completo.slice(caminho_base.length)
                            : caminho_completo;

    const partes = caminho_relativo.split('\\').filter(Boolean);

    const id_chamado = partes[0];
    const categoria = partes[1] ?? '';
    const nome_arquivo = partes.slice(2).join('\\');
    
    baixar_arquivo_servidor(id_chamado, categoria, nome_arquivo)
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

function criar_item_chamados_recebidos_arquivos_obrigatorios_por_tipo(arquivo_obrigatorio) {
    const campo = `
        <li ${arquivo_obrigatorio.caminho_arquivo
            ? 'class="active"'
            : ''} tabindex="0">
            ${arquivo_obrigatorio.nome_tipo_arquivo}

            <input
                type="file"
                data-id-tipo-arquivo="${arquivo_obrigatorio.id_chamado_arquivo_obrigatorio_por_tipo}"
                data-nome-arquivo="${arquivo_obrigatorio.caminho_arquivo}"
                style="display:none;"
            >
        </li>`;
    return campo
}

function ativarUploadArquivos_chamado_recebido_modal(id_chamado, id_tipo_chamado, lista) {
    lista.addEventListener('click', event => {
        const li = event.target.closest('li');
        if (!li || !lista.contains(li)) return;

        if (li.classList.contains('active')) {
            console.log('Este item já possui arquivo — nada a fazer.');
            return;
        }

        let input = li.querySelector('input[type="file"]');
        if (!input) {
            input = document.createElement('input');
            input.type   = 'file';
            input.hidden = true;
            li.appendChild(input);
        }

        if (!input.dataset.listenerAdded) {
            const id_tipo_arquivo = input.dataset.idTipoArquivo;

            input.addEventListener('change', () => {
                const file = input.files[0];
                if (file) {
                    let id_chamado_formatado = String(id_chamado).padStart(7, '0')
                    let nome_arquivo = li.textContent.trim().replace(/\s+/g, "_")
                    const extensao = file.name.split('.').pop().toLowerCase();
                    arquivo_foi_enviado = enviar_arquivo_servidor(file, id_chamado_formatado, categoria_arquivo.COMPROVACAO, nome_arquivo)
                    
                    if (!arquivo_foi_enviado) return;

                    const sql =
                    `
                        INSERT INTO tbl_Chamados_Arquivos_Caminhos (
                            id_chamado,
                            id_tipo_arquivo,
                            caminho_arquivo
                        )
                        VALUES (
                            @js_id_chamado,
                            @js_id_tipo_arquivo,
                            @js_caminho_arquivo
                        )
                    `;
                    let caminho_arquivo = `D:\\Público\\Z_Controle_Chamados\\${id_chamado_formatado}\\${categoria_arquivo.COMPROVACAO}\\${nome_arquivo}.${extensao}`
                    retorno_insert = runSqlInsert(sql, { js_id_chamado: id_chamado, js_id_tipo_arquivo: String(id_tipo_arquivo), js_caminho_arquivo: caminho_arquivo })
                    retorno_insert.then(id_insert => {
                        console.log("O ID inserido na tabela foi o ID: " + id_insert)
                        carregar_lista_arquivos_obrigatorios(id_chamado, id_tipo_chamado)                        
                    })
                }
            });
            
            input.dataset.listenerAdded = '1';
        }

        input.click(); // abre o File Picker
    });
}

async function carregar_lista_arquivos_obrigatorios(id_chamado, id_tipo_chamado) {
  try {
        const lista = document.querySelector('.lista_anexar_arquivos_comprovacao_chamado_recebido');
        const arquivosObrig = await consultar_chamados_arquivos_obrigatorios_por_tipo(id_chamado, id_tipo_chamado);

        if (lista) {
            lista.innerHTML = arquivosObrig
                .map(a => criar_item_chamados_recebidos_arquivos_obrigatorios_por_tipo(a))
                .join('');
        }

        ativarUploadArquivos_chamado_recebido_modal(id_chamado, id_tipo_chamado, lista)
  } catch (err) {
    console.error('Erro ao carregar arquivos obrigatórios:', err);
  }
}