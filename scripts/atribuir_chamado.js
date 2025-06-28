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

function preencher_select_colaboradores_atribuir_chamado(selectId) {
    const select = document.getElementById(selectId); // Pega o elemento select pelo ID dinâmico
    select.innerHTML = '<option value="" disabled selected>Selecione o colaborador</option>'; // Reseta as opções atuais
    
    // Itera sobre a lista de colaboradores e cria uma nova opção para cada um
    colaboradores.forEach(colaborador => {
        if (String(usuario_logado.idSetor) !== String(colaborador.idSetor)) {
            return;
        }
        const option = document.createElement('option');
        option.value = colaborador.idColaborador; // Define o value da opção
        nomeItemCompleto = `${maximizar_primeiraletra(colaborador.primeiroNome) ?? ""} ${maximizar_primeiraletra(colaborador.segundoNome) ?? ""}`.trim()
        option.textContent = nomeItemCompleto; // Define o texto visível da opção
        select.appendChild(option); // Adiciona a opção ao select
    });
}

function criar_item_chamado(grupoChamados) {
    // Gerar o HTML para os campos que têm valor
    const camposHTML = grupoChamados.map((chamado, index) => {
        if (chamado.valor && chamado.valor.trim() !== '') {
            // Substituir os caracteres "|" por <br> para criar uma nova linha no HTML
            let valorComQuebras = chamado.valor
                                    .replace('false', 'NÃO')
                                    .replace('true', 'SIM')
                                    .replace(/\|/g, ';<br>');
            
            return `<span class="nome_campo_chamado">${chamado.nomeCampo}:<br></span> ${valorComQuebras}<br>`;
        }
        return ''; // Se o valor estiver vazio, não exibe nada
    }).join('');  // Junta todos os campos válidos para o grupo
    
    const chamados_ja_adicionados = [];
    const chamadosUnicos = grupoChamados.filter((chamado) => {
        if (!chamados_ja_adicionados.includes(chamado.idChamado)) {
            chamados_ja_adicionados.push(chamado.idChamado);
            return true; // Mantém no array filtrado
        }
        return false; // Descarta se já existir
    });

    const corpo = chamadosUnicos.map((chamado, index) => {
        const selectId = `colaboradores_${chamado.idChamado}`; // Gerar um ID dinâmico para o select
        
        let itemHTML = `
            <li class="item_chamado">
                <div class="informacoes_chamado">
                    <div class="icone_solicitante chamado_nao_atribuido">
                        <i class="material-icons">person</i>
                    </div>

                    <span>${chamado.nomeSolicitante || 'Sem nome'}</span>

                    <div class="nome_tipo_chamado">${chamado.nomeTipo || 'Sem tipo'}</div>

                    <div class="data_hora_abertura_chamado">${formatar_data_modelo_consulta_chamados(chamado.dataAbertura) || 'Data não disponível'}</div>
                </div>

                <div class="resumo_chamado">
                    <div class="modelo_resumo_chamado">
                        ${camposHTML}  <!-- Exibe todos os campos com valor -->
                    </div>

                    <div class="campo_form">
                        <label class="rotulo_campo">Colaboradores</label>
                        <select id="${selectId}" name="colaboradores_${index}" required class="campo_selecao">
                            <option value="" disabled selected>Selecione o colaborador</option>
                        </select>
                        <button class="btn_selecionar_colaborador" onclick="salvar_atribuicao_chamado(${chamado.idChamado}, 'colaboradores_')">Salvar</button>
                    </div>
                </div>
            </li>
        `;

        // Adiciona um delay para garantir que o DOM tenha sido atualizado
        setTimeout(() => {
            preencher_select_colaboradores_atribuir_chamado(selectId);
        }, 0);  // 0ms de atraso garante que a função seja executada após o render do DOM

        return itemHTML;
    }).join(''); // Junta todos os itens de chamado

    return corpo;
}

function atualizar_pagina_atribuir_chamados() {
    const lista_chamados = document.querySelector('.lista_chamados');
    lista_chamados.innerHTML = ''; // limpa conteúdo

    atualizar_consulta_chamados_sem_responsaveis()
}

function salvar_atribuicao_chamado(id_chamado, id_campo_responsavel) {
    const id_responsavel = document.getElementById(id_campo_responsavel + id_chamado).value;
    if (!id_responsavel || id_responsavel.trim() === "") {
        alert("Selecione um colaborador para ser o responsavel do chamado antes de salvar.")
        return
    }

    const payload = {
        "IdChamado": id_chamado,
        "IdStatus": 2, // Chamado "Em andamento"
        "IdResponsavel": parseInt(id_responsavel),
        "DataFechamento": null,
    }

    retorno_consulta = atualizar_chamados(payload)
    retorno_consulta.then(resposta => {
        if(resposta[0].mensagem === '[SQL] CHAMADO ATUALIZADO COM SUCESSO') {
            alert('CHAMADO FINALIZADO COM SUCESSO.')
        }
    });
}