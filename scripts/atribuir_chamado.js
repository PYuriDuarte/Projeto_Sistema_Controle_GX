function monitorar_clique_itens_adribuicao_chamado() {
    const container = document.querySelector('.lista_chamados');
    if (!container) return;

    container.addEventListener('click', function(event) {
        if (event.target.tagName === 'SELECT' || event.target.closest('select')) {
            event.stopPropagation();
            return;
        }

        if (event.target.tagName === 'BUTTON' || event.target.closest('button')) {
            event.stopPropagation();
            return;
        }

        const li = event.target.closest('li');
        if (!li || !container.contains(li)) return;
        li.classList.toggle('ativo');
    });
}

function atualizar_consulta_chamados_sem_responsaveis() {
    const payload = {
        "IdChamado": null,
        "IdTipoChamado": null,
        "IdResponsavel": null,
        "IdSolicitante": null,
        "DataInicio": null,
        "DataFim": null,
        "IdSetor": null,
        "IdStatus": 1
    }

    retorno_consulta = consultar_chamados(payload)

    retorno_consulta.then(chamados => {
        const chamados_agrupados = chamados.filter(chamado => !chamado.nomeResponsavel).reduce((acc, chamado) => {
            if (!acc[chamado.idChamado]) {
                acc[chamado.idChamado] = [];
            }
            acc[chamado.idChamado].push(chamado);
            return acc;
        }, {});

        // Gerar o HTML dinâmico para a lista de chamados
        const listaChamadosContainer = document.querySelector('.lista_chamados');
        if (listaChamadosContainer) {
            listaChamadosContainer.innerHTML = Object.values(chamados_agrupados).map(grupo => criar_item_chamado(grupo)).join('');
        }
    });
}

function criar_item_chamado(grupoChamados) {
    // Função para extrair o valor de um campo específico, baseado no nome do campo
    const getValorPorCampo = (nomeCampo) => {
        const campo = grupoChamados.find(chamado => chamado.nomeCampo === nomeCampo);
        return campo ? campo.valor : '';  // Se encontrar o campo, retorna o valor, caso contrário retorna uma string vazia
    };

    // Para cada grupo de chamados (com o mesmo id_chamado), geramos um item da lista <li>
    return `
        <li class="item_chamado">
            <div class="informacoes_chamado">
                <div class="icone_solicitante chamado_nao_atribuido">
                    <i class="material-icons">person</i>
                </div>

                <span>${grupoChamados[0].nomeSolicitante || 'Sem nome'}</span>
                
                <div class="nome_tipo_chamado">${grupoChamados[0].nomeTipo || 'Sem tipo'}</div>
                
                <div class="data_hora_abertura_chamado">${formatar_data_modelo_consulta_chamados(grupoChamados[0].dataAbertura) || 'Data não disponível'}</div>
            </div>
            
            <div class="resumo_chamado">
                <div class="modelo_resumo_chamado">
                    Razao (Opção 1): ${getValorPorCampo('Razão Social - Opção 1')} <br>
                    Razao (Opção 2): ${getValorPorCampo('Razão Social - Opção 2')} <br>
                    Nome Fantasia: ${getValorPorCampo('Nome Fantasia')} <br>
                    Natureza Jurídica: ${getValorPorCampo('Natureza Jurídica')} <br>
                    Atividade Principal: ${getValorPorCampo('Atividade Principal')} <br>
                    Atividade Secundária: {<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;1: ${getValorPorCampo('Atividade Secundária 1')} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;2: ${getValorPorCampo('Atividade Secundária 2')} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;3: ${getValorPorCampo('Atividade Secundária 3')} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;4: ${getValorPorCampo('Atividade Secundária 4')} <br>
                    }<br>
                    Valor Capital Social: ${getValorPorCampo('Valor Capital Social')} <br>
                    Forma de Integralização: ${getValorPorCampo('Forma de Integralização')} <br>
                    Porte da Empresa: ${getValorPorCampo('Porte da Empresa')} <br>
                    Sócio: {<br>
                        &nbsp;&nbsp;&nbsp;&nbsp;1: ${getValorPorCampo('Sócio 1')} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;2: ${getValorPorCampo('Sócio 2')} <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;3: ${getValorPorCampo('Sócio 3')} <br>
                    }<br>
                    Representante Legal: ${getValorPorCampo('Representante Legal')} <br>
                    E-mail: ${getValorPorCampo('E-mail')} <br>
                    Telefone: ${getValorPorCampo('Telefone')} <br>
                    Número IPTU: ${getValorPorCampo('Número IPTU')} <br>
                    Arquivo IPTU: ${getValorPorCampo('Arquivo IPTU')} <br>
                </div>
                
                <div class="campo_form">
                    <label class="rotulo_campo">Colaboradores</label>
                    <select id="colaboradores" name="colaboradores" required class="campo_selecao"
                            onfocus="popular_select_colaboradores('colaboradores', 
                                                                   document.getElementById('titulo_pagina_atribuir_chamado').textContent.trim())">
                        <option value="" disabled selected>Selecione o colaborador</option>
                    </select>
                    <button class="btn_selecionar_colaborador">Salvar</button>
                </div>
            </div>
        </li>
    `;
}

function criar_item_chamado(grupoChamados) {
    // Gerar o HTML para os campos que têm valor
    const camposHTML = grupoChamados.map(chamado => {
        if (chamado.valor && chamado.valor.trim() !== '') {
            return `${chamado.nomeCampo}: ${chamado.valor} <br>`;
        }
        return ''; // Se o valor estiver vazio, não exibe nada
    }).join('');  // Junta todos os campos válidos para o grupo

    // Gerar o HTML do item <li> para o grupo de chamados
    return `
        <li class="item_chamado">
            <div class="informacoes_chamado">
                <div class="icone_solicitante chamado_nao_atribuido">
                    <i class="material-icons">person</i>
                </div>

                <span>${grupoChamados[0].nomeSolicitante || 'Sem nome'}</span>
                
                <div class="nome_tipo_chamado">${grupoChamados[0].nomeTipo || 'Sem tipo'}</div>
                
                <div class="data_hora_abertura_chamado">${formatar_data_modelo_consulta_chamados(grupoChamados[0].dataAbertura) || 'Data não disponível'}</div>
            </div>
            
            <div class="resumo_chamado">
                <div class="modelo_resumo_chamado">
                    ${camposHTML}  <!-- Exibe todos os campos com valor -->
                </div>
                
                <div class="campo_form">
                    <label class="rotulo_campo">Colaboradores</label>
                    <select id="colaboradores" name="colaboradores" required class="campo_selecao"
                            onfocus="popular_select_colaboradores('colaboradores', 
                                                                   document.getElementById('titulo_pagina_atribuir_chamado').textContent.trim())">
                        <option value="" disabled selected>Selecione o colaborador</option>
                    </select>
                    <button class="btn_selecionar_colaborador">Salvar</button>
                </div>
            </div>
        </li>
    `;
}