const combinacoes_setor_tipo_chamado = {
    "PARALEGAL|CONTRATO SOCIAL ABERTURA": {
        arquivo: "abrir_chamado_paralegal_contrato_social_abertura.html",
        display: "block",
    },
    "PARALEGAL|ADITIVO/ALTERAÇÃO": {
        arquivo: "abrir_chamado_paralegal_ativoalteracao.html",
        display: "block",
    },
    "PARALEGAL|DISTRATO SOCIAL": {
        arquivo: "abrir_chamado_paralegal_distrato_social.html",
        display: "block",
    },
    "PARALEGAL|LICENÇAS": {
        arquivo: "abrir_chamado_paralegal_licencas.html",
        display: "block",
    },
    "PARALEGAL|SEFAZ": {
        arquivo: "abrir_chamado_paralegal_sefaz.html",
        display: "block",
    },
    "PARALEGAL|SEFIN": {
        arquivo: "abrir_chamado_paralegal_sefin.html",
        display: "block",
    },
    "PARALEGAL|CERTIDÃO": {
        arquivo: "abrir_chamado_paralegal_certidao.html",
        display: "block",
    },
    "PARALEGAL|RECEITA FEDERAL": {
        arquivo: "abrir_chamado_paralegal_receita_federal.html",
        display: "block",
    },
    "PARALEGAL|OUTROS": {
        arquivo: "abrir_chamado_paralegal_outros.html",
        display: "block",
    },
};

function monitorar_opcoes_entrada_abrir_chamado() {
    const selectSetor = document.getElementById('setor_atendimento');
    const selectTipo = document.getElementById('tipo_chamado');

    // Escuta mudanças em ambos os selects
    [selectSetor, selectTipo].forEach(function(select) {
        select.addEventListener('change', function() {
            tentar_carregar_corpo_abrir_chamado();
        });
    });
}

function tentar_carregar_corpo_abrir_chamado() {
    // Para 'setor_atendimento'
    const selectSetor = document.getElementById('setor_atendimento');
    const optionSelecionadaSetor = selectSetor ? selectSetor.options[selectSetor.selectedIndex] : null;
    const textoSelecionadoSetor = optionSelecionadaSetor ? optionSelecionadaSetor.textContent : '';
    
    // Para 'tipo_chamado'
    const selectTipo = document.getElementById('tipo_chamado');
    const optionSelecionadaTipo = selectTipo ? selectTipo.options[selectTipo.selectedIndex] : null;
    const textoSelecionadoTipo = optionSelecionadaTipo ? optionSelecionadaTipo.textContent : '';

    const chave = `${textoSelecionadoSetor}|${textoSelecionadoTipo}`;
    const config = combinacoes_setor_tipo_chamado[chave];

    if (!config){
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.style.display = 'none';
        return null
    }
    
    carregar_corpo_abrir_chamado(config.arquivo, config.display, chave);
}

async function carregar_corpo_abrir_chamado(arquivo, display, chave) {
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    let clientes = await preencher_lista_clientes()
    
    fetch(arquivo)
        .then(response => response.text())
        .then(html => {
            container_corpo.innerHTML = html;
            container_corpo.style.display = display;
                        
            let altura_tela = null
            switch (chave) {
                case "PARALEGAL|CONTRATO SOCIAL ABERTURA":
                    altura_tela = 68.5
                    popular_select({id_campo: 'atividade_principal', tipo: 'atividades'});
                    popular_select({id_campo: 'atividade_secundaria', tipo: 'atividades'});
                    popular_select({id_campo: 'natureza_juridica', tipo: 'campos_valores', campos_dinamicos: ["CONTRATO SOCIAL ABERTURA", "PARALEGAL", "Natureza Jurídica"]});
                    popular_select({id_campo: 'forma_integralizacao', tipo: 'campos_valores', campos_dinamicos: ["CONTRATO SOCIAL ABERTURA", "PARALEGAL", "Forma de Integralização"]});
                    popular_select({id_campo: 'porte_empresa', tipo: 'campos_valores', campos_dinamicos: ["CONTRATO SOCIAL ABERTURA", "PARALEGAL", "Porte da empresa"]});
                    break;
                case "PARALEGAL|ADITIVO/ALTERAÇÃO":
                    altura_tela = 74
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    popular_select({id_campo: 'atividade_principal', tipo: 'atividades'});
                    popular_select({id_campo: 'atividade_secundaria', tipo: 'atividades'});
                    popular_select({id_campo: 'natureza_juridica', tipo: 'campos_valores', campos_dinamicos: ["CONTRATO SOCIAL ABERTURA", "PARALEGAL", "Natureza Jurídica"]});
                    popular_select({id_campo: 'forma_integralizacao', tipo: 'campos_valores', campos_dinamicos: ["CONTRATO SOCIAL ABERTURA", "PARALEGAL", "Forma de Integralização"]});
                    popular_select({id_campo: 'porte_empresa', tipo: 'campos_valores', campos_dinamicos: ["CONTRATO SOCIAL ABERTURA", "PARALEGAL", "Porte da empresa"]});
                    break;
                case "PARALEGAL|DISTRATO SOCIAL":
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    const out = document.getElementById('razao_social_id');

                    new MutationObserver(() => {
                        console.log('Mutação detectada; valor atual →', out.value);

                        popular_select({
                            id_campo: 'responsavel_livros',
                            tipo: 'socios',
                            campos_dinamicos: out.value
                        });
                    }).observe(out, { childList: true });
                    
                    altura_tela = 20
                    break;
                case "PARALEGAL|LICENÇAS":
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    altura_tela = 31
                    break;
                case "PARALEGAL|SEFAZ":
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    altura_tela = 32
                    break;
                case "PARALEGAL|SEFIN":
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    altura_tela = 32
                    break;
                case "PARALEGAL|CERTIDÃO":
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    altura_tela = 39
                    break;
                case "PARALEGAL|RECEITA FEDERAL":
                    criarCampoDePesquisa('.campo_de_pesquisa', 'razao_social_id', '.lista_de_valores', 'corpo_abertura_chamado', 'Selecione um cliente', clientes);
                    altura_tela = 39
                    break;
                case "PARALEGAL|OUTROS":
                    altura_tela = 34.5
                    break;
            }

            container_corpo.style.height = `${altura_tela}rem`
            container_corpo.style.minHeight = `${altura_tela}rem`
        })
        .catch(err => {
            container_corpo.style.display = display;
    });
}

function mudar_tamanho_tela_abrir_chamado(altura, operacao){
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    if (!container_corpo) return;

    const alturaAtualRem = parseFloat(getComputedStyle(container_corpo).height) / parseFloat(getComputedStyle(document.documentElement).fontSize);
    let acao;

    if (operacao.toUpperCase() === "SOMA"){
        acao = `${alturaAtualRem + altura}rem`;
    }
    else if (operacao.toUpperCase() === "SUBTRAÇÃO" || operacao.toUpperCase() === "SUBTRACAO"){
        acao = `${alturaAtualRem - altura}rem`;
    }

    container_corpo.style.height = acao;
}

function resetar_pagina_ao_finalizar(chave){
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    container_corpo.innerHTML = ''; // limpa conteúdo

    const config = combinacoes_setor_tipo_chamado[chave];
    if (config) {
        carregar_corpo_abrir_chamado(config.arquivo, config.display, chave);
    }
}

function exibir_campo_numero_inscricao_municipal(valor) {
    const numero_inscricao_municipal = document.getElementById('numero_inscricao_municipal');
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    
    const alturaAtualRem = parseFloat(getComputedStyle(container_corpo).height) / parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    const alturaBaseRem = 20;
    
    if (valor === 'sim') {
        numero_inscricao_municipal.style.display = 'block';
        container_corpo.style.height = `${alturaAtualRem + 3}rem`;
    } 
    else {
        numero_inscricao_municipal.style.display = 'none';
        container_corpo.style.height = `${alturaBaseRem}rem`;
    }
}

function exibir_campo_cnae_antes_depois(tipo, elementoCheckbox) {
    const tipoLower = tipo.toLowerCase(); // Corrigindo a chamada à função lower()
    const campoCNAE = document.getElementById(`campo_cnae_antes_depois_${tipoLower}`);
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    
    const alturaAtualRem = parseFloat(getComputedStyle(container_corpo).height) / parseFloat(getComputedStyle(document.documentElement).fontSize);
    const alturaBaseRem = 31;    

    if (campoCNAE) {
        campoCNAE.style.display = elementoCheckbox.checked ? 'block' : 'none';
        container_corpo.style.height = elementoCheckbox.checked ? `${alturaAtualRem + 8}rem` : `${alturaBaseRem}rem`;
    }
}

function exibir_campo_novo_regime(tipo, elementoCheckbox) {
    const tipoLower = tipo.toLowerCase(); // Corrigindo a chamada à função lower()
    const campoCNAE = document.getElementById(`campo_novo_regime_${tipoLower}`);
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    
    const alturaAtualRem = parseFloat(getComputedStyle(container_corpo).height) / parseFloat(getComputedStyle(document.documentElement).fontSize);
    const alturaBaseRem = 31;    

    if (campoCNAE) {
        campoCNAE.style.display = elementoCheckbox.checked ? 'block' : 'none';
        container_corpo.style.height = elementoCheckbox.checked ? `${alturaAtualRem + 8}rem` : `${alturaBaseRem}rem`;
    }
}

function pegar_atividades_secundarias() {
    const atividades = [];

    const inputs = document.querySelectorAll('input[name="atividade_escolhida"]');

    inputs.forEach(input => {
        const descricao = input.value.trim();

        // Tenta obter o código CNAE via option original (caso necessário)
        const option = Array.from(document.getElementById('atividade_secundaria').options)
            .find(opt => opt.title === descricao);

        // const codigo = option ? option.value : '';

        if (descricao) {
            atividades.push(`${descricao}`);
        }
    });

    return atividades.join('/');
}

function adicionar_atividade_selecionada(){
    const atividade_secundaria = document.getElementById('atividade_secundaria')
    const codigo = atividade_secundaria.value;
    const descricao = atividade_secundaria.options[atividade_secundaria.selectedIndex].text;
    
    const container = document.getElementById('inputs_atividades');
    
    const jaExisteInput = Array.from(container.querySelectorAll('input[name="atividade_escolhida"]'))
        .find(input => input.value.toUpperCase() === descricao.toUpperCase());

    if (jaExisteInput) {
        jaExisteInput.classList.add('elemento_lista_ja_escolhido');
        setTimeout(() => {
            jaExisteInput.classList.remove('elemento_lista_ja_escolhido');
        }, 1000);
        return;
    }
    
    // Cria o container do input e botão
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '0.3rem';

    // Cria o input
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'atividade_escolhida';
    input.required = true;
    input.className = 'campo_texto';
    input.value = descricao;
    input.readOnly = true;

    // Cria o botão X
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '✖';
    btn.className = 'botao_remover_elemento_lista';
    btn.style.marginLeft = '0.2rem';
    btn.onclick = function() {
        div.remove();
        mudar_tamanho_tela_abrir_chamado(2.15, "subtração")
    };

    div.appendChild(input); // Adiciona input ao div
    div.appendChild(btn); // Adiciona botão ao div
    container.appendChild(div); // Adiciona div ao container principal

    mudar_tamanho_tela_abrir_chamado(2.15, "soma")
}

function pegar_dados_socios() {
    const socios = [];
    
    // Seleciona todos os inputs de sócios e porcentagens
    const nomeSocios = document.querySelectorAll('input[name="nome_socio"]');
    const porcentagemSocios = document.querySelectorAll('input[name="porcentagem_socio"]');

    // Cria a string no formato "nome_socio, percentual; nome_socio, percentual"
    for (let i = 0; i < nomeSocios.length; i++) {
        const nome = nomeSocios[i].value.trim();
        const percentual = porcentagemSocios[i].value.trim();
        
        if (nome && percentual) {
            socios.push(`${nome}|${percentual}`);
        }
    }

    // Retorna a string concatenada
    return socios.join('/');
}

function adicionar_socio_na_listagem() {
    const nome_socio = document.getElementById('nome_socio').value.trim();
    const porcentagem_socio = document.getElementById('porcentagem_socio').value.trim();
    const container = document.getElementById('socios_adicionados');

    // Não permitir adicionar se nome ou porcentagem estiverem vazios
    if (!nome_socio || !porcentagem_socio) return;

    // Verifica se já existe sócio com o mesmo nome e mesma porcentagem
    const jaExisteInput = Array.from(container.querySelectorAll('input[name="nome_socio"]'))
        .find(input => input.value.toUpperCase() === nome_socio.toUpperCase());
    
    if (jaExisteInput) {
        jaExisteInput.classList.add('elemento_lista_ja_escolhido');
        setTimeout(() => {
            jaExisteInput.classList.remove('elemento_lista_ja_escolhido');
        }, 1000);
        return;
    }

    // Cria o container do input e botão
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '0.3rem';

    // Cria input para nome do sócio
    const input_nome = document.createElement('input');
    input_nome.type = 'text';
    input_nome.name = 'nome_socio';
    input_nome.required = true;
    input_nome.className = 'campo_texto campo_nome_socio';
    input_nome.value = nome_socio;
    input_nome.readOnly = true;

    // Cria input para porcentagem do sócio
    const input_percentual = document.createElement('input');
    input_percentual.type = 'text';
    input_percentual.name = 'porcentagem_socio';
    input_percentual.required = true;
    input_percentual.className = 'campo_texto campo_percentual_socio';
    input_percentual.value = porcentagem_socio;
    input_percentual.readOnly = true;

    // Cria o botão X
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '✖';
    btn.className = 'botao_remover_elemento_lista';
    btn.style.marginLeft = '0.2rem';
    btn.onclick = function() {
        div.remove();
        mudar_tamanho_tela_abrir_chamado(2.15, "subtração");
    };

    div.appendChild(input_nome);
    div.appendChild(input_percentual);
    div.appendChild(btn);
    container.appendChild(div);

    mudar_tamanho_tela_abrir_chamado(2.15, "soma");

    // Limpa os campos do formulário após adicionar
    document.getElementById('nome_socio').value = '';
    document.getElementById('porcentagem_socio').value = '';
}

function verificar_preencimento_de_todos_os_campos(campos_valores) {
    let camposVazios = [];

    // Iterar sobre os campos e verificar se algum valor está vazio ou inválido
    for (let campo in campos_valores) {
        const valor = campos_valores[campo];
        if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
            camposVazios.push(campo); // Adiciona o campo à lista se estiver vazio
        }
    }

    // Se houver campos vazios, exibe o alert com os nomes desses campos
    if (camposVazios.length > 0) {
        alertaInfo('Os seguintes campos estão sem valor: ' + camposVazios.join(',\n'));
        return false
    }
    return true
}

function verificar_preencimento_de_ao_menos_um_campo(campos_valores) {
    let camposPreenchidos = false;

    // Iterar sobre os campos e verificar se algum valor está preenchido
    for (let campo in campos_valores) {
        const valor = campos_valores[campo];
        if (valor && (typeof valor === 'string' && valor.trim() !== '')) {
            camposPreenchidos = true; // Marca que há pelo menos um campo preenchido
            break; // Sai do loop, pois já encontramos um campo preenchido
        }
    }

    // Se nenhum campo estiver preenchido, exibe o alert
    if (!camposPreenchidos) {
        alertaInfo('Pelo menos um campo deve ser preenchido.');
        return false;
    }
    return true;
}

function enviar_chamado_contrato_social_abertura(event) {
    const lista_socios = document.getElementById('socios_adicionados');
    const socios_nomes = Array.from(lista_socios.querySelectorAll('input[name="nome_socio"]'));
    const socios_percentuais = Array.from(lista_socios.querySelectorAll('input[name="porcentagem_socio"]'));
    if (socios_nomes.length === 0) {
        alertaInfo("É obrigatório a adição de ao menos um sócio.");
        return false;
    }

    // Soma os percentuais dos sócios
    let soma_percentual = 0;
    socios_percentuais.forEach(input => {
        soma_percentual += Number(input.value);
    });

    if (soma_percentual !== 100) {
        alertaInfo("A soma das porcentagens dos sócios deve ser 100%.\nSoma atual: " + soma_percentual + "%");
        return false;
    }
    
    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador

    const campos_valores = {
        "Razão Social - Opção 1": document.getElementById('razao_social_1').value,
        "Razão Social - Opção 2": document.getElementById('razao_social_2').value,
        "Nome Fantasia": document.getElementById('nome_fantasia').value,
        "Natureza Jurídica": document.getElementById('natureza_juridica').value,
        "Atividade Principal": document.getElementById('atividade_principal').options[document.getElementById('atividade_principal').selectedIndex].text,
        "Atividade Secundária": pegar_atividades_secundarias(),
        "Valor Capital Social": document.getElementById('capital_social').value,
        "Forma de Integralização": document.getElementById('forma_integralizacao').value,
        "Porte da empresa": document.getElementById('porte_empresa').value,
        "Percentual de participação de cada sócio": pegar_dados_socios(),
        "Representante legal junto à Receita Federal": document.getElementById('representante_legal').value,
        "E-mail para constar no CNPJ": document.getElementById('email_cnpj').value,
        "Telefone para constar no CNPJ": document.getElementById('telefone_cnpj').value,
        "Número do IPTU": document.getElementById('numero_iptu').value,
    };

    const fileInput = document.getElementById('anexo_iptu');
    if(fileInput.files[0]){
        const fileName = fileInput.files[0].name; // Obtém o nome do arquivo
        const fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexar IPTU"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_iptu." + fileExtension
    }

    event.preventDefault()

    if (!verificar_preencimento_de_todos_os_campos(campos_valores))
        return

    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "CONTRATO SOCIAL ABERTURA", "PARALEGAL")

    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')
    
    event.preventDefault()

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');

        enviar_arquivo_servidor(document.getElementById('anexo_iptu').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_iptu')

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar("PARALEGAL|CONTRATO SOCIAL ABERTURA")
    });
}

function enviar_chamado_aditivo_alteracao(event) {
    const campos_valores = {
        "Nome Fantasia": document.getElementById('nome_fantasia').value,
        "Natureza Jurídica": document.getElementById('natureza_juridica').value,
        "Atividade Principal": document.getElementById('atividade_principal').options[document.getElementById('atividade_principal').selectedIndex].text,
        "Atividade Secundária": pegar_atividades_secundarias(),
        "Valor Capital Social": document.getElementById('capital_social').value,
        "Forma de Integralização": document.getElementById('forma_integralizacao').value,
        "Porte da empresa": document.getElementById('porte_empresa').value,
        "Percentual de participação de cada sócio": pegar_dados_socios(),
        "Representante legal junto à Receita Federal": document.getElementById('representante_legal').value,
        "E-mail para constar no CNPJ": document.getElementById('email_cnpj').value,
        "Telefone para constar no CNPJ": document.getElementById('telefone_cnpj').value,
        "Número do IPTU": document.getElementById('numero_iptu').value,
        "OUTROS (descrever)": document.getElementById('outros_descrever').value,
    };

    event.preventDefault()

    if (!verificar_preencimento_de_ao_menos_um_campo(campos_valores))
        return

    campos_valores["Razão Social"] = document.getElementById('razao_social_id').value;

    const fileInput = document.getElementById('anexo_iptu');
    if(fileInput.files[0]){
        const fileName = fileInput.files[0].name; // Obtém o nome do arquivo
        const fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexar IPTU"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_iptu." + fileExtension
    }
    
    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "ADITIVO/ALTERAÇÃO", "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');
        
        if(campos_valores["Anexar IPTU"]){
            enviar_arquivo_servidor(document.getElementById('anexo_iptu').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_iptu')
        }

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar("PARALEGAL|ADITIVO/ALTERAÇÃO")
    });
}

function enviar_chamado_distrato_social(event) {
    const campos_valores = {
        "Razão Social": document.getElementById('razao_social_id').value,
        "Possui Funcionários?": document.getElementById('possui_funcionarios').value,
        "Possui Inscrição Municipal Ativa?": document.getElementById('inscricao_municipal_ativa').value,
        "Quem ficará responsável pela guarda dos livros?": document.getElementById('responsavel_livros').options[document.getElementById('responsavel_livros').selectedIndex].text,
    };

    event.preventDefault()

    if (!verificar_preencimento_de_todos_os_campos(campos_valores))
        return

    campos_valores["Número da Inscrição Municipal"] = campos_valores["Possui Inscrição Municipal Ativa?"].toUpperCase() == "SIM" 
                                                    ? document.getElementById('numero_inscricao_municipal').value
                                                    : "";
                                                    
    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "DISTRATO SOCIAL", "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar("PARALEGAL|DISTRATO SOCIAL")
    });
}

function enviar_chamado_licencas(event) {
    const campos_valores = {}
    const anexo_iptu = document.getElementById('anexo_iptu');
    if(anexo_iptu.files[0]){
        let fileName = anexo_iptu.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexar IPTU"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_iptu." + fileExtension
    }

    const alvara_funcionamento = document.getElementById('alvara_funcionamento');
    if(alvara_funcionamento.files[0]){
        let fileName = alvara_funcionamento.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Alvará de Funcionamento"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\alvara_funcionamento." + fileExtension
    }

    const licenca_sanitaria = document.getElementById('licenca_sanitaria');
    if(licenca_sanitaria.files[0]){
        let fileName = licenca_sanitaria.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Licença Sanitária"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\licenca_sanitaria." + fileExtension
    }

    const licenca_bombeiros = document.getElementById('licenca_bombeiros');
    if(licenca_bombeiros.files[0]){
        let fileName = licenca_bombeiros.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Licença Bombeiros"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\licenca_bombeiros." + fileExtension
    }
    
    event.preventDefault()

    if (!verificar_preencimento_de_ao_menos_um_campo(campos_valores))
        return
    
    campos_valores["Razão Social"] = document.getElementById('razao_social_id').value;
    campos_valores["Número do IPTU"] = document.getElementById('numero_iptu').value;
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "LICENÇAS", "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');
        
        if(campos_valores["Anexar IPTU"]){
            enviar_arquivo_servidor(document.getElementById('anexo_iptu').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_iptu')
        }
        if(campos_valores["Alvará de Funcionamento"]){
            enviar_arquivo_servidor(document.getElementById('alvara_de_funcionamento').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'alvara_de_funcionamento')
        }
        if(campos_valores["Licença Sanitária"]){
            enviar_arquivo_servidor(document.getElementById('licenca_sanitaria').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'licenca_sanitaria')
        }
        if(campos_valores["Licença Bombeiros"]){
            enviar_arquivo_servidor(document.getElementById('licenca_bombeiros').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'licenca_bombeiros')
        }

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar("PARALEGAL|LICENÇAS")
    });
}

function enviar_chamado_sefaz_sefin(sefaz_ou_sefin, event) {
    const campos_valores = {
        "Atualização Quadro Societário": document.getElementById('flag_atualizacao_quadro_societario').checked,
        "Atualização Endereço": document.getElementById('flag_atualizacao_endereco').checked,
        "Alteração Sócio": document.getElementById('flag_alteracao_socio').checked,
        "Alteração Regime": document.getElementById('flag_alteracao_regime').checked,
        "Alteração CNAE": document.getElementById('flag_alteracao_cnae').checked,
    };
    
    event.preventDefault()

    campos_valores["Razão Social"] = document.getElementById('razao_social_id').value;
    campos_valores["OUTROS (descrever)"] = document.getElementById('outros_descrever').value;

    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, sefaz_ou_sefin.toUpperCase(), "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar(`PARALEGAL|${sefaz_ou_sefin.toUpperCase()}`)
    });
}

function enviar_chamado_certidao(event) {
    const campos_valores = {
        "Certidão Simplificada": document.getElementById('flag_certidao_simplificada').checked,
        "Certidão Inteiro Teor": document.getElementById('flag_certidao_inteiro_teor').checked,
        "Certidão Específica": document.getElementById('flag_certidao_especifica').checked,
        "Certidão Falência Concordata": document.getElementById('flag_certidao_falencia_concordata').checked,
        "Certidão Municipal": document.getElementById('flag_certidao_municipal').checked,
        "Certidão Estadual": document.getElementById('flag_certidao_estadual').checked,
        "Certidão Federal": document.getElementById('flag_certidao_federal').checked,
    };

    event.preventDefault()

    campos_valores["Razão Social"] = document.getElementById('razao_social_id').value;
    campos_valores["OUTROS (descrever)"] = document.getElementById('outros_descrever').value;

    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "CERTIDÃO", "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar(`PARALEGAL|CERTIDÃO`)
    });
}

function enviar_chamado_receita_federal(event) {
    const campos_valores = {
        "Alteração E-mail no CNPJ": document.getElementById('alteracao_email_cnpj').value,
        "Alteração Telefone no CNPJ": document.getElementById('alteracao_telefone_cnpj').value,
        "Alteração Inclusão Nome Fantasia": document.getElementById('alteracao_nome_fantasia').value,
        "Reenquadramento - Enquadramento - Desenquadramento": document.getElementById('reenquadramento').value,
    };

    event.preventDefault()
    
    campos_valores["Atualização Quadro Societário"] = document.getElementById('flag_atualizacao_quadro_societario').checked;
    campos_valores["Alteração CNAE"] = document.getElementById('flag_alteracao_cnae').checked;
    campos_valores["Razão Social"] = document.getElementById('razao_social_id').value;
    campos_valores["OUTROS (descrever)"] = document.getElementById('outros_descrever').value;

    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "RECEITA FEDERAL", "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');

        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar(`PARALEGAL|RECEITA FEDERAL`)
    });
}

function enviar_chamado_outros(event) {
    const campos_valores = {
        "OUTROS (descrever)": document.getElementById('outros_descrever').value,
    };
    
    event.preventDefault()

    if (!verificar_preencimento_de_ao_menos_um_campo(campos_valores))
        return

    const anexo_outros_1 = document.getElementById('anexo_outros_1');
    if(anexo_outros_1.files[0]){
        let fileName = anexo_outros_1.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexo 1"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_outros_1." + fileExtension
    }

    const anexo_outros_2 = document.getElementById('anexo_outros_2');
    if(anexo_outros_2.files[0]){
        let fileName = anexo_outros_2.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexo 2"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_outros_2." + fileExtension
    }

    const anexo_outros_3 = document.getElementById('anexo_outros_3');
    if(anexo_outros_3.files[0]){
        let fileName = anexo_outros_3.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexo 3"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_outros_3." + fileExtension
    }

    const anexo_outros_4 = document.getElementById('anexo_outros_4');
    if(anexo_outros_4.files[0]){
        let fileName = anexo_outros_4.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexo 4"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_outros_4." + fileExtension
    }

    const anexo_outros_5 = document.getElementById('anexo_outros_5');
    if(anexo_outros_5.files[0]){
        let fileName = anexo_outros_5.files[0].name; // Obtém o nome do arquivo
        let fileExtension = fileName.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo
        campos_valores["Anexo 5"] = "D:\\Público\\Z_Controle_Chamados\\{id_chamado}\\obrigatorios\\anexo_outros_5." + fileExtension
    }

    const selectTipo = document.getElementById('tipo_chamado');
    let id_tipo_chamado = selectTipo.value;
    let id_solicitante = usuario_logado.idColaborador
    
    let campos_por_tipo = filtrar_campos_dados_iniciais(dados_iniciais_combinados, "OUTROS", "PARALEGAL")
    
    let dados_valor = "";
    campos_por_tipo.forEach(item => {
        if (item.campo in campos_valores && campos_valores[item.campo]) {
            dados_valor += `${item.idCampoChamado}\\${campos_valores[item.campo]};`;
        }
    });
    dados_valor = remover_ultimo_caracter(dados_valor, ';')

    retorno = cadastrar_chamado(id_solicitante, id_tipo_chamado, dados_valor)
    retorno.then(response => {
        const mensagem = response.mensagem;
        const partes = mensagem.split('.'); // Divide a string pelo ponto
        const segundaParte = partes[1] ? partes[1].trim() : ''; // Pega a segunda parte, caso exista
        const id_com_os_zeros = segundaParte.padStart(7, '0');

        if(campos_valores["Anexo 1"]){
            enviar_arquivo_servidor(document.getElementById('anexo_outros_1').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_1')
        }
        if(campos_valores["Anexo 2"]){
            enviar_arquivo_servidor(document.getElementById('anexo_outros_2').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_2')
        }
        if(campos_valores["Anexo 3"]){
            enviar_arquivo_servidor(document.getElementById('anexo_outros_3').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_3')
        }
        if(campos_valores["Anexo 4"]){
            enviar_arquivo_servidor(document.getElementById('anexo_outros_4').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_4')
        }
        if(campos_valores["Anexo 5"]){
            enviar_arquivo_servidor(document.getElementById('anexo_outros_5').files[0], id_com_os_zeros, categoria_arquivo.OBRIGATORIEDADE, 'anexo_5')
        }
        
        alertaSucesso(`Chamado Enviado! {${id_com_os_zeros}}`)

        // Se tudo OK, pode limpar e recarregar
        const container_corpo = document.getElementById('corpo_abertura_chamado');
        container_corpo.innerHTML = ''; // limpa conteúdo

        resetar_pagina_ao_finalizar(`PARALEGAL|OUTROS`)
    });
}