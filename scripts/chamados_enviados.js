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
                <button id="botao_chamados_enviados_info" onclick="modal_info_chamado_enviado(this, event)">
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
        const chamados_agrupados = {};

        // Agrupar chamados por idChamado
        chamados.forEach(chamado => {
            if (chamado.nomeResponsavel) {
                if (!chamados_agrupados[chamado.idChamado]) {
                    chamados_agrupados[chamado.idChamado] = [];
                }
                chamados_agrupados[chamado.idChamado].push(chamado);
            }
        });
        
        // Gerar o HTML dinâmico para a lista de chamados
        const listaChamadosContainer = document.querySelector('.chamados_enviados_lista');
        if (listaChamadosContainer) {
            // Utilizar Object.values para pegar os grupos de chamados e gerar o HTML
            listaChamadosContainer.innerHTML = Object.values(chamados_agrupados)
                .map(grupo => criar_item_chamado_enviado(grupo[0])) // Passar o primeiro chamado do grupo para criar_item_chamado_enviado
                .join('');
        }
    });
}

async function modal_info_chamado_enviado(botao, event) {
    // 1. Descobre o id do chamado
    const li = botao.closest('.chamados_enviados_item');
    if (!li) return;

    const idChamado = li.dataset.idChamado;   // camelCase no dataset!

    // 2. Recarrega SEMPRE o html do modal
    const container = document.getElementById('modal_chamado_enviado_container');
    const html      = await fetch('chamados_enviados_modal_info.html')
                            .then(r => r.text());

    container.innerHTML = html;                       // substitui o antigo
    const modal = container.querySelector('#modal_chamado_enviado');

    // 3. Preenche campos + inicia chat com o novo id
    preencher_chamados_enviados_modal_consultados(event, idChamado);
    iniciarChatChamado_enviados();

    // 4. Exibe
    modal.style.display = 'flex';
}

function fechar_modal_chamado_enviado() {
    const modal = document.getElementById('modal_chamado_enviado');
    if (modal) modal.style.display = 'none';
}