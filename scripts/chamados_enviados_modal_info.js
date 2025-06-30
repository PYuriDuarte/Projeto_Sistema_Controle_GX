let id_chamado_enviados_modal_info = 0

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

async function preencher_chamados_enviados_modal_consultados(event, id_chamado) {
    event.preventDefault();

    id_chamado_enviados_modal_info = id_chamado

    const payload = { IdChamado: id_chamado_enviados_modal_info };

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
        carregar_lista_arquivos_obrigatorios_enviado(id_tipo_chamado)
    } 
    catch (err) {
        console.error('Erro ao preencher modal:', err);
    }
}

async function carregar_lista_arquivos_obrigatorios_enviado(id_tipo_chamado) {
    try {
        const lista = document.querySelector('.lista_anexar_arquivos_comprovacao_chamado_enviado');
        const arquivosObrig = await consultar_chamados_arquivos_obrigatorios_por_tipo_enviado(id_tipo_chamado);
        if (lista) {
            lista.innerHTML = arquivosObrig
                .map(a => criar_item_chamados_enviados_arquivos_obrigatorios_por_tipo(a))
                .join('');
        }

        ativarUploadArquivos_chamado_enviado_modal(lista)
    } catch (err) {
        console.error('Erro ao carregar arquivos obrigatórios:', err);
    }
}

function criar_item_chamado_enviado_modal(chamado) {
    campo = `
        <tr data-id-chamado="${chamado.IdChamado}" class="tr_item_modal_info">
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

function consultar_chamados_arquivos_obrigatorios_por_tipo_enviado(id_tipo_chamado) {
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
        id_chamado: id_chamado_enviados_modal_info,
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

function ativarUploadArquivos_chamado_enviado_modal(lista) {
    lista.addEventListener('click', event => {
        const li = event.target.closest('li');
        if (!li || !lista.contains(li)) return;

        if (!li.classList.contains('active')) {
            alertaInfo('Este item não possui arquivo anexado até o momento.');
            return
        }

        const input = li.querySelector('input[data-nome-arquivo]');
        const caminhoCompleto = input ? input.dataset.nomeArquivo : "";
        const nomeArquivo = caminhoCompleto.split(/[\\/]/).pop();

        const ok = confirm(`Deseja baixar o arquivo:\n\n${nomeArquivo}?`);
        if (!ok) return;

        baixar_arquivo_servidor(String(id_chamado_enviados_modal_info).padStart(7, '0'), categoria_arquivo.COMPROVACAO, nomeArquivo)
    });
}