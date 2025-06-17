function popular_setor_atendimento() {
    const setores = [
        { value: 'PARALEGAL', text: 'PARALEGAL' },
        { value: 'FISCAL', text: 'FISCAL' },
        { value: 'CONTABIL', text: 'CONTÁBIL' },
        { value: 'PESSOAL', text: 'PESSOAL' },
        { value: 'FINANCEIRO', text: 'FINANCEIRO' },
        { value: 'EXTERNO', text: 'EXTERNO' },
        { value: 'INTEGRACAO', text: 'INTEGRAÇÃO' },
        { value: 'RH', text: 'RH' },
        { value: 'PAM', text: 'PAM' }
    ];
    
    const setor_atendimento = document.getElementById('setor_atendimento');
    if (!setor_atendimento) {
        console.warn('Select setor_atendimento não está na DOM!');
        return;
    }
    setor_atendimento.innerHTML = '<option value="" disabled selected>Selecione o setor</option>';
    setores.forEach(setor => {
        const option = document.createElement('option');
        option.value = setor.value;
        option.textContent = setor.text;
        setor_atendimento.appendChild(option);
    });
}

function popular_tipo_chamado() {
    const tipos = [
        { value: 'CONTRATO_SOCIAL_ABERTURA', text: 'CONTRATO SOCIAL ABERTURA' },
        { value: 'ADITIVO_ALTERACAO', text: 'ADITIVO/ALTERAÇÃO' },
        { value: 'DISTRATO_SOCIAL', text: 'DISTRATO SOCIAL' },
        { value: 'LICENCAS', text: 'LICENÇAS' },
        { value: 'SEFAZ', text: 'SEFAZ' },
        { value: 'SEFIN', text: 'SEFIN' },
        { value: 'CERTIDAO', text: 'CERTIDÃO' },
        { value: 'RECEITA_FEDERAL', text: 'RECEITA FEDERAL' },
        { value: 'OUTROS', text: 'OUTROS' }
    ];

    const tipo_chamado = document.getElementById('tipo_chamado');
    if (!tipo_chamado) {
        console.warn('Select tipo_chamado não está na DOM!');
        return;
    }
    tipo_chamado.innerHTML = '<option value="" disabled selected>Selecione o tipo</option>';
    tipos.forEach(setor => {
        const option = document.createElement('option');
        option.value = setor.value;
        option.textContent = setor.text;
        tipo_chamado.appendChild(option);
    });
}

const combinacoes_setor_tipo_chamado = {
    "PARALEGAL|CONTRATO_SOCIAL_ABERTURA": {
        arquivo: "abrir_chamado_paralegal_contrato_social_abertura.html",
        display: "block",
    },
    "PARALEGAL|ADITIVO_ALTERACAO": {
        arquivo: "abrir_chamado_paralegal_ativoalteracao.html",
        display: "block",
    },
    "PARALEGAL|DISTRATO_SOCIAL": {
        arquivo: "abrir_chamado_paralegal_distrato_social.html",
        display: "block",
    },
    "PARALEGAL|LICENCAS": {
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
    "PARALEGAL|CERTIDAO": {
        arquivo: "abrir_chamado_paralegal_certidao.html",
        display: "block",
    },
    "PARALEGAL|RECEITA_FEDERAL": {
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
    const selectSetor = document.getElementById('setor_atendimento');
    const selectTipo = document.getElementById('tipo_chamado');
    const valorSetor = selectSetor ? selectSetor.value : '';
    const valorTipo = selectTipo ? selectTipo.value : '';

    const chave = `${valorSetor}|${valorTipo}`;
    const config = combinacoes_setor_tipo_chamado[chave];

    if (!config){
        return null
    }
    
    carregar_corpo_abrir_chamado(config.arquivo, config.display, chave);
}

function carregar_corpo_abrir_chamado(arquivo, display, chave) {
    const container_corpo = document.getElementById('corpo_abertura_chamado');

    fetch(arquivo)
        .then(response => response.text())
        .then(html => {
            container_corpo.innerHTML = html;
            container_corpo.style.display = display;
                        
            let altura_tela = null
            switch (chave) {
                case "PARALEGAL|CONTRATO_SOCIAL_ABERTURA":
                    altura_tela = 67
                    popular_atividades_secundarias()
                    break;
                case "PARALEGAL|ADITIVO_ALTERACAO":
                    altura_tela = 72
                    popular_atividades_secundarias()
                    break;
                case "PARALEGAL|DISTRATO_SOCIAL":
                    altura_tela = 20.5
                    break;
                case "PARALEGAL|LICENCAS":
                    altura_tela = 31
                    break;
                case "PARALEGAL|SEFAZ":
                    altura_tela = 31
                    break;
                case "PARALEGAL|SEFIN":
                    altura_tela = 31
                    break;
                case "PARALEGAL|CERTIDAO":
                    altura_tela = 31
                    break;
                case "PARALEGAL|RECEITA_FEDERAL":
                    altura_tela = 38
                    break;
                case "PARALEGAL|OUTROS":
                    altura_tela = 15
                    break;
            }

            container_corpo.style.height = `${altura_tela}rem`
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
    
    const alturaBaseRem = 20.5;
    
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

function popular_atividades_secundarias() {
    const lista_atividades = {
        "4711-3/01": "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados",
        "5611-2/01": "Restaurantes e similares",
        "6201-5/01": "Desenvolvimento de programas de computador sob encomenda",
        "6209-1/00": "Suporte técnico, manutenção e outros serviços em tecnologia da informação",
        "7020-4/00": "Atividades de consultoria em gestão empresarial",
        "8121-4/00": "Limpeza em prédios e em domicílios",
        "8211-3/00": "Serviços combinados de escritório e apoio administrativo",
        "7319-0/02": "Promoção de vendas",
        "8550-3/02": "Treinamento em desenvolvimento profissional e gerencial",
        "4321-5/00": "Instalação e manutenção elétrica",
    };

    const atividade_secundaria = document.getElementById('atividade_secundaria');
    if (!atividade_secundaria) {
        console.warn('Select atividade_secundaria não está na DOM!');
        return;
    }
    
    atividade_secundaria.innerHTML = '<option value="" disabled selected>Selecione a CNAE</option>';
    
    Object.entries(lista_atividades).forEach(([codigo, descricao]) => {
        const option = document.createElement('option');
        option.value = codigo;
        // Exibe só 60 caracteres e coloca o resto no tooltip
        const textoExibido = `${codigo} - ${descricao.length > 60 ? descricao.slice(0, 60) + "..." : descricao}`;
        option.textContent = textoExibido;
        option.title = `${codigo} - ${descricao}`;
        atividade_secundaria.appendChild(option);
    });
}

function adicionar_atividade_selecionada(){
    const atividade_secundaria = document.getElementById('atividade_secundaria')
    const codigo = atividade_secundaria.value;
    const descricao = atividade_secundaria.options[atividade_secundaria.selectedIndex].title;

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

function enviar_chamado_contrato_social_abertura(event) {
    event.preventDefault();

    const razao_1 = document.getElementById('razao_social_1');
    const razao_2 = document.getElementById('razao_social_2');
    const nome_fantasia = document.getElementById('nome_fantasia');
    const nature_juridica = document.getElementById('natureza_juridica');
    const atividade_principal = document.getElementById('atividade_principal');
    const lista_atividades_secundarias = document.getElementById('inputs_atividades');
    const valor_capital_social = document.getElementById('capital_social');
    const forma_integralizacao = document.getElementById('forma_integralizacao');
    const porte_empresa = document.getElementById('porte_empresa');
    const representante_legal = document.getElementById('representante_legal');
    const email = document.getElementById('email_cnpj');
    const telefone = document.getElementById('telefone_cnpj');
    const numero_iptu = document.getElementById('numero_iptu');
    const anexo_iptu = document.getElementById('anexo_iptu');
    const lista_socios = document.getElementById('socios_adicionados');

    const socios_nomes = Array.from(lista_socios.querySelectorAll('input[name="nome_socio"]'));
    const socios_percentuais = Array.from(lista_socios.querySelectorAll('input[name="porcentagem_socio"]'));
    if (socios_nomes.length === 0) {
        alert("É obrigatório a adição de ao menos um sócio.");
        return false;
    }

    // Soma os percentuais dos sócios
    let soma_percentual = 0;
    socios_percentuais.forEach(input => {
        soma_percentual += Number(input.value);
    });

    if (soma_percentual !== 100) {
        alert("A soma das porcentagens dos sócios deve ser 100%.\nSoma atual: " + soma_percentual + "%");
        return false;
    }

    alert("Chamado enviado com sucesso!");
    
    // Se tudo OK, pode limpar e recarregar
    const container_corpo = document.getElementById('corpo_abertura_chamado');
    container_corpo.innerHTML = ''; // limpa conteúdo

    resetar_pagina_ao_finalizar("PARALEGAL|CONTRATO_SOCIAL_ABERTURA")
}