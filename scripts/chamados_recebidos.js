// ====== FUNÇÃO PARA CRIAR O HTML DE UM CHAMADO ====== //
function criar_item_chamado_recebido(chamado) {
    fotoSolicitante = ""
    fotoResponsavel = ""
    progresso = 0
    return `
    <li class="chamados_recebidos_item" data-id-chamado="${chamado.idChamado}">
        <div class="chamados_recebidos_informacoes">
            <div class="chamados_recebidos_foto">
                <div class="chamados_recebidos_icone ${fotoSolicitante}">
                    <i class="material-icons">person</i>
                </div>
            </div>
            <div class="chamados_recebidos_nome">
                <span>${chamado.nomeSolicitante}</span>
            </div>
            <div class="chamados_recebidos_tipo">
                <span>${chamado.nomeTipo}</span>
            </div>
            <div class="chamados_recebidos_data">
                <span>${formatar_data_modelo_consulta_chamados(chamado.dataAbertura)}</span>
            </div>
            <div class="chamados_recebidos_foto_responsavel">
                <div class="chamados_recebidos_icone ${fotoResponsavel}">
                    <i class="material-icons">person</i>
                </div>
            </div>
            <div class="chamados_recebidos_nome_responsavel">
                <span>${chamado.nomeResponsavel}</span>
            </div>
            <div class="chamados_recebidos_status">
                <span>${chamado.nomeStatus}</span>
            </div>
            <div class="chamados_recebidos_info">
                <button id="botao_chamados_recebidos_info" onclick="modal_info_chamado_recebido(this)">
                    <i class="material-icons">visibility</i>
                </button>
            </div>
        </div>
        <div class="chamados_recebidos_barra_progresso">
            <span class="chamados_recebidos_progresso" style="width: ${progresso}%"></span>
        </div>
    </li>
    `;
}

// ====== FUNÇÃO PARA RENDERIZAR O CAMPO SOLICITANTE NO FILTRO ====== //
// Exemplo de uso: renderizarCampoSolicitante(true, 'João Pedro', solicitantesOptions);
function preencher_chamados_recebidos_consultados(event) {
    event.preventDefault();

    const id_tipo_chamado = document.getElementById('chamados_recebidos_tipo_chamado').value;
    const id_responsavel = document.getElementById('chamados_recebidos_responsavel').value;
    const id_solicitante = document.getElementById('chamados_recebidos_solicitante').value;
    const data_inicio = document.getElementById('chamados_recebidos_data_inicio').value;
    const data_fim = document.getElementById('chamados_recebidos_data_fim').value;
    const id_setor = document.getElementById('chamados_recebidos_setor').value;
    const id_status = document.getElementById('chamados_recebidos_status').value;
    
    const payload = {
        "IdChamado": null,
        "IdTipoChamado": id_tipo_chamado !== "" ? id_tipo_chamado : null,
        "IdResponsavel": id_responsavel !== "" ? id_responsavel : null,
        "IdSolicitante": id_solicitante !== "" ? id_solicitante : null,
        "DataInicio": data_inicio,
        "DataFim": data_fim,
        "IdSetor": id_setor !== "" ? id_setor : null,
        "IdStatus": id_status !== "" ? id_status : null
    }

    retorno_consulta = consultar_chamados(payload)

    renderizar_chamados_recebidos(retorno_consulta)
}

// ====== FUNÇÃO PARA RENDERIZAR TODOS OS CHAMADOS ====== //
function renderizar_chamados_recebidos(retorno_consulta) {
    retorno_consulta.then(chamados => {
        const ul = document.querySelector('.chamados_recebidos_lista');
        if (ul) {
            const chamadosComResponsavel = chamados.filter(chamado => chamado.nomeResponsavel);
            ul.innerHTML = chamadosComResponsavel.map(criar_item_chamado_enviado).join('');
        }
    });
}

function modal_info_chamado_recebido(botao) {
    const li = botao.closest('.chamados_recebidos_item');
    if (li) {
        const idChamado = li.dataset.idChamado;
        
        // Só carrega o modal se ainda não tiver carregado
        if (!document.getElementById('modal_chamado_recebido')) {
            fetch('chamados_recebidos_modal_info.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('modal_chamado_recebido_container').innerHTML = html;
                    document.getElementById('modal_chamado_recebido').style.display = 'flex';
                    
                    iniciarChatChamado()
                });
        } else {
            // Se já está carregado, só atualiza o ID e exibe de novo
            document.getElementById('modal_chamado_recebido').style.display = 'flex';
        }
    }
}

function fechar_modal_chamado_recebido() {
    const modal = document.getElementById('modal_chamado_recebido');
    if (modal) modal.style.display = 'none';
}