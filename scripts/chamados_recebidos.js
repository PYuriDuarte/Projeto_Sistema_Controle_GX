// ====== FUNÇÃO PARA CRIAR O HTML DE UM CHAMADO ====== //
function criar_item_chamado_recebido(chamado) {
    fotoSolicitante = ""
    fotoResponsavel = ""
    progresso = 0
    teste(usuario_logado)
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
                <button ${
                            !colaborador_eh_lider && chamado.idResponsavel !== usuario_logado.idColaborador
                            ? `disabled`
                            : ``
                        }
                    data-status-chamado="${chamado.nomeStatus}" id="botao_chamados_recebidos_info" onclick="modal_info_chamado_recebido(this, event)">
                    <i class="material-icons">visibility</i>
                </button>

                <button ${
                            !colaborador_eh_lider || chamado.nomeStatus.toUpperCase() === 'ATENDIDOS'
                            ? `style="visibility: hidden;"`
                            : ``
                        }
                    id="botao_reatribuir_chamados_recebidos" onclick="modal_reatribuir_chamado_recebido(this, event)">
                    <i class="material-icons">swap_horizontal_circle</i>
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
        const listaChamadosContainer = document.querySelector('.chamados_recebidos_lista');
        if (listaChamadosContainer) {
            // Utilizar Object.values para pegar os grupos de chamados e gerar o HTML
            listaChamadosContainer.innerHTML = Object.values(chamados_agrupados)
                .map(grupo => criar_item_chamado_recebido(grupo[0])) // Passar o primeiro chamado do grupo para criar_item_chamado_recebido
                .join('');
        }
    });
}

async function modal_info_chamado_recebido(botao, event) {
    // 1. Descobre o id do chamado
    const li = botao.closest('.chamados_recebidos_item');
    if (!li) return;

    const idChamado = li.dataset.idChamado;   // camelCase no dataset!
    const statusChamado = botao.dataset.statusChamado

    // 2. Recarrega SEMPRE o html do modal
    const container = document.getElementById('modal_chamado_recebido_container');
    const html      = await fetch('chamados_recebidos_modal_info.html')
                            .then(r => r.text());

    container.innerHTML = html;                       // substitui o antigo
    const modal = container.querySelector('#modal_chamado_recebido');

    // 3. Preenche campos + inicia chat com o novo id
    const botao_finalizar_chamado = document.getElementById('modal_info_chamado_recebido_btn_finalizar');
    if(statusChamado.toUpperCase() === 'ATENDIDOS')
        botao_finalizar_chamado.style.display = "none"
    preencher_chamados_recebidos_modal_consultados(event, idChamado);
    iniciarChatChamado_recebidos();

    // 4. Exibe
    modal.style.display = 'flex';
}

function fechar_modal_chamado_recebido() {
    const modal = document.getElementById('modal_chamado_recebido');
    if (modal) modal.style.display = 'none';
}

async function modal_reatribuir_chamado_recebido(botao, event) {
    // 1. Descobre o id do chamado
    const li = botao.closest('.chamados_recebidos_item');
    if (!li) return;

    const idChamado = li.dataset.idChamado;   // camelCase no dataset!

    // 2. Recarrega SEMPRE o html do modal
    const container = document.getElementById('modal_chamado_recebido_container');
    const html      = await fetch('chamados_recebidos_modal_reatribuir.html')
                            .then(r => r.text());

    container.innerHTML = html;                       // substitui o antigo
    const modal = container.querySelector('#modal_reatribuir_chamado');

    select_colaboradores = document.querySelector('.campo_de_pesquisa_reatribuir')
    select_colaboradores.dataset.idChamado = idChamado;

    let colaboradores_por_setor_normalizada = normalizarLista(
        colaboradores_por_setor, 
        'id_colaborador', 
        item => `${maximizar_primeiraletra(item.primeiro_nome)} ${maximizar_primeiraletra(item.segundo_nome)}`)
    
    criarCampoDePesquisa('.campo_de_pesquisa_reatribuir', 'colaboradores_para_reatribuir', '.lista_de_valores_reatribuir',
                        'modal_chamado_recebido_content', 'Digite para filtrar', colaboradores_por_setor_normalizada, '100%');
    
    // 4. Exibe
    modal.style.display = 'flex';
}

function fechar_modal_reatribuir_chamado_recebido() {
    const modal = document.getElementById('modal_reatribuir_chamado');
    if (modal) modal.style.display = 'none';
}

function salvar_reatribuicao_chamado() {
    let id_chamado = document.querySelector('.campo_de_pesquisa_reatribuir').dataset.idChamado
    let id_responsavel = document.getElementById('colaboradores_para_reatribuir').value

    if (!id_responsavel || id_responsavel.trim() === "") {
        alertaInfo("Selecione um colaborador para ser o responsavel do chamado antes de salvar.")
        return
    }

    const payload = {
        "IdChamado": parseInt(id_chamado),
        "IdStatus": 2,
        "IdResponsavel": parseInt(id_responsavel),
        "DataFechamento": null,
    }
    
    retorno_consulta = atualizar_chamados(payload)
    retorno_consulta.then(resposta => {
        if(resposta[0].mensagem === '[SQL] CHAMADO ATUALIZADO COM SUCESSO') {
            alertaSucesso('Responsável atribuido ao chamado.')
            fechar_modal_reatribuir_chamado_recebido()

            preencher_chamados_recebidos_consultados({preventDefault() {}});
        }
    });
}