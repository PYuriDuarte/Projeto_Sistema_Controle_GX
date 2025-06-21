// ====== FUNÇÃO PARA CRIAR O HTML DE UM CHAMADO ====== //
function criar_item_chamado_enviado(chamado) {
    fotoSolicitante = ""
    fotoResponsavel = ""
    progresso = 0
    return `
    <li class="chamados_enviados_item" data-id-chamado="${chamado.idChamado}">
        <div class="chamados_enviados_informacoes">
            <div class="chamados_enviados_foto">
                <div class="chamados_enviados_icone ${fotoSolicitante}">
                    <i class="material-icons">person</i>
                </div>
            </div>
            <div class="chamados_enviados_nome">
                <span>${chamado.nomeSolicitante}</span>
            </div>
            <div class="chamados_enviados_tipo">
                <span>${chamado.nomeTipo}</span>
            </div>
            <div class="chamados_enviados_data">
                <span>${formatar_data_modelo_consulta_chamados(chamado.dataAbertura)}</span>
            </div>
            <div class="chamados_enviados_foto_responsavel">
                <div class="chamados_enviados_icone ${fotoResponsavel}">
                    <i class="material-icons">person</i>
                </div>
            </div>
            <div class="chamados_enviados_nome_responsavel">
                <span>${chamado.nomeResponsavel}</span>
            </div>
            <div class="chamados_enviados_status">
                <span>${chamado.nomeStatus}</span>
            </div>
            <div class="chamados_enviados_info">
                <button id="botao_chamados_enviados_info" onclick="modal_info_chamado_enviado(this)">
                    <i class="material-icons">visibility</i>
                </button>
            </div>
        </div>
        <div class="chamados_enviados_barra_progresso">
            <span class="chamados_enviados_progresso" style="width: ${progresso}%"></span>
        </div>
    </li>
    `;
}

// ====== FUNÇÃO PARA RENDERIZAR O CAMPO SOLICITANTE NO FILTRO ====== //
function preencher_chamados_enviados_consultados(event) {
    event.preventDefault();

    const id_tipo_chamado = document.getElementById('chamados_enviados_tipo_chamado').value;
    const id_responsavel = document.getElementById('chamados_enviados_responsavel').value;
    const id_solicitante = document.getElementById('chamados_enviados_solicitante').value;
    const data_inicio = document.getElementById('chamados_enviados_data_inicio').value;
    const data_fim = document.getElementById('chamados_enviados_data_fim').value;
    const id_setor = document.getElementById('chamados_enviados_setor').value;
    const id_status = document.getElementById('chamados_enviados_status').value;
   
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

    renderizar_chamados_enviados(retorno_consulta)
}

// ====== FUNÇÃO PARA RENDERIZAR TODOS OS CHAMADOS ====== //
function renderizar_chamados_enviados(retorno_consulta) {
    retorno_consulta.then(chamados => {
        const ul = document.querySelector('.chamados_enviados_lista');
        if (ul) {
            const chamadosComResponsavel = chamados.filter(chamado => chamado.nomeResponsavel);
            ul.innerHTML = chamadosComResponsavel.map(criar_item_chamado_enviado).join('');
        }
    });
}

function modal_info_chamado_enviado(botao) {
    const li = botao.closest('.chamados_enviados_item');
    if (li) {
        const idChamado = li.dataset.idChamado;

        // Só carrega o modal se ainda não tiver carregado
        if (!document.getElementById('modal_chamado_enviado')) {
            fetch('chamados_enviados_modal_info.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('modal_chamado_enviado_container').innerHTML = html;
                    
                    // Mostra o modal
                    document.getElementById('modal_chamado_enviado').style.display = 'flex';
                });
        } else {
            // Se já está carregado, só atualiza o ID e exibe de novo
            document.getElementById('modal_chamado_enviado').style.display = 'flex';
        }
    }
}

function fechar_modal_chamado_enviado() {
    const modal = document.getElementById('modal_chamado_enviado');
    if (modal) modal.style.display = 'none';
}