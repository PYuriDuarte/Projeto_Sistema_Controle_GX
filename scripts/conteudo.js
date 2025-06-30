const categoria_arquivo = Object.freeze({
    COMPROVACAO: "comprovacoes",
    OBRIGATORIEDADE: "obrigatorios"
});

let setores = [];
let status_chamados = [];
let tipos_chamados = [];
let campos_chamados = [];
let campos_chamados_valores = [];
let campos_chamados_por_tipo = [];
let dados_iniciais_combinados = [];
let atividades_clientes = [];
async function carregarDados() {
    try {
        const botao_abrir_chamado = document.getElementById('botao_abrir_chamado');
        botao_abrir_chamado.style.pointerEvents = 'none';
        
        // const botao_painel_controle = document.getElementById('botao_painel_controle');
        // botao_painel_controle.style.pointerEvents = 'none';

        // const botao_atribuir_chamado = document.getElementById('botao_atribuir_chamado');
        // botao_atribuir_chamado.style.pointerEvents = 'none';

        // const botao_acompanhar_chamados = document.getElementById('botao_acompanhar_chamados');
        // botao_acompanhar_chamados.style.pointerEvents = 'none';
        
        setores = await consultar_setores();
        tipos_chamados = await consultar_tipos_chamados();
        status_chamados = await consultar_status_chamados();

        botao_abrir_chamado.style.pointerEvents = 'auto';

        campos_chamados = await consultar_campos_chamados();
        campos_chamados_valores = await consultar_campos_chamados_valores();
        campos_chamados_por_tipo = await consultar_campos_chamados_por_tipo();
        atividades_clientes = await consultar_atividades();
        dados_iniciais_combinados = combinar_listas_dados_iniciais(
            campos_chamados, 
            campos_chamados_valores, 
            tipos_chamados, 
            setores, 
            campos_chamados_por_tipo
        );

        // botao_painel_controle.style.pointerEvents = 'auto'; // Habilita o clique
        // botao_atribuir_chamado.style.pointerEvents = 'auto';
        // botao_acompanhar_chamados.style.pointerEvents = 'auto';
    } catch (erro) {
        console.error("Erro ao consultar dados iniciais:", erro);
    }
}

function aguardarDOMCarregado() {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", resolve);
        } else {
            resolve(); // Caso o DOM já tenha sido carregado antes de adicionar o listener
        }
    });
}

aguardarDOMCarregado().then(() => {
    carregarDados();
});

// ===================== FUNÇÃO DE TESTE =====================

function teste(valor){
    if(valor){
        console.log(valor)
    }
    else{
        console.log("teste")
    }
}

// ===================== FUNÇÃO DE REMOVER O ULTIMO CARACTER SE FOR O PASSADO =====================

function remover_ultimo_caracter(dados_valor, caracter) {
    if (dados_valor.endsWith(caracter)) {
        dados_valor = dados_valor.slice(0, -1);
    }
    return dados_valor
}

// ===================== VOLTAR PARA TELA DE LOGIN =====================

function voltar_para_login() {
    var confirmar = confirm("Tem certeza que deseja voltar para o login?");
    if (confirmar) {
        window.location.href = "login.html";
    }
}

// ===================== VOLTAR PARA TELA DE LOGIN =====================

let colaborador_eh_lider = false
document.addEventListener('DOMContentLoaded', () => {
    colaborador_eh_lider_consulta = consultar_colaborador_eh_lider(usuario_logado.idColaborador, usuario_logado.idSetor)
    colaborador_eh_lider_consulta.then(eh => {
        colaborador_eh_lider = eh[0].colaborador_lider
        controlarAtribuirChamado(colaborador_eh_lider);
    });
});

// ===================== VOLTAR PARA TELA DE LOGIN =====================

document.addEventListener('DOMContentLoaded', () => {
    const botao = document.getElementById('botao_painel_controle');

    if (botao) {
        botao.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
});

// ===================== DEIXA A PRIMEIRA LETRA MAIUSCULA =====================

function maximizar_primeiraletra(palavra) {
    if (typeof palavra !== "string" || palavra.length === 0) return "";
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}

// ===================== NOTIFICAÇÕES =====================

function pegar_icone_e_cor_pelo_tipo(tipo) {
    switch (tipo) {
        case "relatorio":
            return { icone: "description", corClass: "bg_relatorio" };
        case "sos":
            return { icone: "sos", corClass: "bg_sos" };
        default:
            return { icone: "notifications", corClass: "bg_alerta" };
    }
}

function vibrar_sino() {
    const badge = document.getElementById("qtdeNotificacoes");
    const iconeSino = document.getElementById("icone_sino");
    const qtde = parseInt(badge.textContent, 10);

    if (qtde > 0) {
        iconeSino.classList.add("sino_vibrando");
        setTimeout(() => {
            iconeSino.classList.remove("sino_vibrando");
        }, 2000); // 2 segundos
    }
}

function criar_notificacao(tipo, data, mensagem, negrito = false) {
    const { icone, corClass } = pegar_icone_e_cor_pelo_tipo(tipo);

    const notificacao = document.createElement("a");
    notificacao.className = "dropdown_notificacao_item";
    notificacao.href = "#";
    notificacao.innerHTML = `
        <div class="alerta_de_notificacao_icone ${corClass}">
            <span class="material-icons">${icone}</span>
        </div>
        <div>
            <div class="alerta_de_notificacao_data">${data}</div>
            <div class="alerta_de_notificacao_msg${negrito ? " bold" : ""}">
                ${mensagem}
            </div>
        </div>
    `;
    return notificacao;
}

function adicionar_notificacao(tipo, data, mensagem, negrito = false) {
    const notificacao = criar_notificacao(tipo, data, mensagem, negrito);

    const lista = document.getElementById("dropdownNotificacoes");
    const rodape = lista.querySelector(".central_de_notificacoes_rodape");
    lista.insertBefore(notificacao, rodape);

    const badge = document.getElementById("qtdeNotificacoes");
    const atual = parseInt(badge.textContent, 10) || 0;
    badge.textContent = `${atual + 1}+`;
}

document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("botao_notificacao");
    const dropdown = document.getElementById("dropdownNotificacoes");
    const badge = document.getElementById("qtdeNotificacoes");
    const botaoLimpar = dropdown.querySelector(".central_de_notificacoes_rodape a");

    dropdown.style.display = "none";

    botao.addEventListener("click", function (e) {
        e.preventDefault();
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    });

    // Fecha se clicar fora do dropdown
    document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target) && !botao.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });

    // Limpa todas as notificações ao clicar em "Limpar Notificações"
    botaoLimpar.addEventListener("click", function (e) {
        e.preventDefault();
        const notificacoes = dropdown.querySelectorAll(".dropdown_notificacao_item");
        notificacoes.forEach(el => el.remove());
        badge.textContent = "0+";
    });

    // Adiciona notificações de exemplo
    adicionar_notificacao("relatorio", "30 Dezembro 2025", "Novo relatório disponível!");
    adicionar_notificacao("sos", "30 Novembro 2025", "Chamado urgente aberto!");
    adicionar_notificacao("alerta", "29 Outubro 2025", "Seu acesso expirou.");

    vibrar_sino();
});

// ===================== MENSAGENS =====================

function pegar_icone_e_cor_mensagem(tipo) {
    switch (tipo) {
        case "recebida":
            return { icone: "mail", corClass: "recebida" };
        case "enviada":
            return { icone: "send", corClass: "enviada" };
        default:
            return { icone: "mail_outline", corClass: "alerta" };
    }
}

function vibrar_carta() {
    const badge = document.getElementById("qtdeMensagem");
    const iconeCarta = document.getElementById("icone_carta");
    const qtde = parseInt(badge.textContent, 10);

    if (qtde > 0) {
        iconeCarta.classList.add("carta_vibrando");
        setTimeout(() => {
            iconeCarta.classList.remove("carta_vibrando");
        }, 2000); // 2 segundos
    }
}

function criar_mensagem(tipo, data, mensagem, cor_status, negrito = false) {
    const { icone, corClass } = pegar_icone_e_cor_mensagem(tipo);

    const msg = document.createElement("a");
    msg.className = "dropdown_mensagem_item";
    msg.href = "#";
    msg.innerHTML = `
        <div class="icone_mensagem ${corClass}">
            <span class="material-icons">${icone}</span>
        </div>
        <div>
            <div class="data_mensagem">${data}</div>
            <div class="msg_mensagem${negrito ? " bold" : ""}">
                ${mensagem}
            </div>
        </div>
    `;

    const iconeDiv = msg.querySelector('.icone_mensagem');
    if (iconeDiv && cor_status) {
        iconeDiv.style.borderColor = `${cor_status}`;
    }
    return msg;
}

function adicionar_mensagem(tipo, data, mensagem, cor_status, negrito = false) {
    const msg = criar_mensagem(tipo, data, mensagem, cor_status, negrito);

    const lista = document.getElementById("dropdownMensagem");
    const rodape = lista.querySelector(".central_de_mensagem_rodape");
    lista.insertBefore(msg, rodape);

    const badge = document.getElementById("qtdeMensagem");
    const atual = parseInt(badge.textContent, 10) || 0;
    badge.textContent = `${atual + 1}+`;
}

document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("botao_mensagem");
    const dropdown = document.getElementById("dropdownMensagem");
    const badge = document.getElementById("qtdeMensagem");
    const botaoVerMais = dropdown.querySelector(".central_de_mensagem_rodape a");

    dropdown.style.display = "none";

    botao.addEventListener("click", function (e) {
        e.preventDefault();
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    });

    // Fecha se clicar fora do dropdown
    document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target) && !botao.contains(e.target)) {
            dropdown.style.display = "none";
        }
    });

    // Mensagens de exemplo
    adicionar_mensagem("recebida", "29 Maio 2025", "Você recebeu uma nova mensagem!", "green");
    adicionar_mensagem("recebida", "29 Maio 2025", "Você recebeu uma nova mensagem!", "orange");
    adicionar_mensagem("recebida", "29 Maio 2025", "Você recebeu uma nova mensagem!", "gray");
    adicionar_mensagem("recebida", "29 Maio 2025", "Você recebeu uma nova mensagem!", "green");

    vibrar_carta();
});

// ===================== MENU LOGON =====================

document.addEventListener("DOMContentLoaded", function () {
    const botaoLogon = document.getElementById('abrir_menu_logon');
    const menuLogon = document.getElementById('menu_logon_dropdown');

    botaoLogon.addEventListener('click', function (e) {
        e.preventDefault();
        menuLogon.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (!menuLogon.contains(e.target) && !botaoLogon.contains(e.target)) {
            menuLogon.classList.remove('open');
        }
    });
});

// ===================== CARREGAR NOVO CORPO =====================

// <button class="btn_carregar_novo_corpo" data-arquivo="meu_painel.html" data-display="flex" data-titulo="Meu Painel">Botão 1</button>
document.querySelectorAll('.btn_carregar_novo_corpo').forEach(function (botao) {
    botao.addEventListener('click', function () {
        var arquivo = this.getAttribute('data-arquivo');
        var display = this.getAttribute('data-display');
        var titulo = this.getAttribute('data-titulo');
        
        var container_corpo = document.getElementById('container_corpo');
        var titulo_pagina = document.getElementById('titulo_pagina');
        
        fetch(arquivo)
            .then(response => response.text())
            .then(html => {
                container_corpo.innerHTML = html;
                container_corpo.style.display = display;
                titulo_pagina.textContent = titulo;
                
                switch (titulo) {
                    case "Meu Painel":
                        preencher_qtde_chamados_realizados();
                        atualizarBarraChamados();
                        // desenharGraficos();
                        let dadosColaboradores = consultar_dados_chamados_por_colaborador_e_setor()
                        dadosColaboradores.then(retorno => initColabChart(retorno))
                        break;
                    case "Abrir Chamado":
                        popular_select({id_campo: 'setor_atendimento', tipo: 'setor'});
                        popular_select({id_campo: 'tipo_chamado', tipo: 'tipos_chamados'});
                        monitorar_opcoes_entrada_abrir_chamado();
                        break;
                    case "Atribuir Chamados":
                        monitorar_clique_itens_adribuicao_chamado();
                        atualizar_consulta_chamados_sem_responsaveis();
                        break;
                    case "Chamados Recebidos":
                        renderizar_campo_data('chamados_recebidos_data_fim', "Data Fim", false, hoje_menos_tantos_dias(0));
                        renderizar_campo_data('chamados_recebidos_data_inicio', "Data Início", false, hoje_menos_tantos_dias(30));
                        popular_select({id_campo: 'chamados_recebidos_solicitante', tipo: 'colaborador'});
                        popular_select({id_campo: 'chamados_recebidos_responsavel', 
                                        tipo: 'colaborador', 
                                        nome_item: `${usuario_logado.primeiroNome.toUpperCase()} ${usuario_logado.segundoNome.toUpperCase()}`,
                                        nome_setor: usuario_logado.nomeSetor});
                        popular_select({id_campo: 'chamados_recebidos_setor', tipo: 'setor', nome_setor: usuario_logado.nomeSetor});
                        popular_select({id_campo: 'chamados_recebidos_tipo_chamado', tipo: 'tipos_chamados'});
                        popular_select({id_campo: 'chamados_recebidos_status', tipo: 'status_chamados'});
                        break;
                    case "Chamados Enviados":
                        renderizar_campo_data('chamados_enviados_data_fim', "Data Fim", false, hoje_menos_tantos_dias(0));
                        renderizar_campo_data('chamados_enviados_data_inicio', "Data Início", false, hoje_menos_tantos_dias(30));
                        popular_select({id_campo: 'chamados_enviados_solicitante', 
                                        tipo: 'colaborador', 
                                        nome_item: `${usuario_logado.primeiroNome.toUpperCase()} ${usuario_logado.segundoNome.toUpperCase()}`,
                                        nome_setor: usuario_logado.nomeSetor});
                        popular_select({id_campo: 'chamados_enviados_responsavel', tipo: 'colaborador'});
                        popular_select({id_campo: 'chamados_enviados_setor', tipo: 'setor'});
                        popular_select({id_campo: 'chamados_enviados_tipo_chamado', tipo: 'tipos_chamados'});
                        popular_select({id_campo: 'chamados_enviados_status', tipo: 'status_chamados'});
                        break;
                }
            })
            .catch(err => {
                container_corpo.style.display = display;
                titulo_pagina.textContent = "ERRO: Entre em contato com o administrador do sistema.";
            });
    });
});

const raw = sessionStorage.getItem('usuario');
const usuario_logado = JSON.parse(raw);
if (raw) {
    document.querySelectorAll('.nome_usuario_logado')
            .forEach(el => el.textContent = `${usuario_logado.primeiroNome.toUpperCase()} ${usuario_logado.segundoNome.toUpperCase()}`);
}

async function popular_select({ id_campo, tipo, nome_item, nome_setor, campos_dinamicos }, block_select=true) {
    const select = document.getElementById(id_campo);

    if (!select) {
        console.warn(`Elemento <select id='${id_campo}'> não encontrado no DOM.`);
        return;
    }

    // Limpa as opções existentes, mantendo apenas a primeira (placeholder)
    select.length = 1;

    let itemsFiltrados = [];

    switch (tipo) {
        case 'setor':
            itemsFiltrados = nome_setor
                ? setores.filter(c => (c.nomeSetor || "").toUpperCase() === nome_setor.toUpperCase())
                : setores;
            break;
        case 'status_chamados':
            itemsFiltrados = status_chamados;
            break;
        case 'tipos_chamados':
            itemsFiltrados = tipos_chamados;
            break;
        case 'colaborador':
            itemsFiltrados = nome_setor
                ? colaboradores.filter(c => (c.nomeSetor || "").toUpperCase() === nome_setor.toUpperCase())
                : colaboradores;
            break;
        case 'campos_valores':
            itemsFiltrados = filtrar_campos_dados_iniciais(dados_iniciais_combinados, ...campos_dinamicos);
            break;
        case 'clientes':
            itemsFiltrados = await consultar_clientes(1);
            break;
        case 'atividades':
            itemsFiltrados = atividades_clientes;
            break
        case 'socios':
            itemsFiltrados = await consultar_socios(...campos_dinamicos);
            break
        default:
            console.warn(`Tipo '${tipo}' não reconhecido.`);
            return;
    }

    // Caso não haja itens, exibe uma opção "Nenhum encontrado"
    if (!itemsFiltrados.length) {
        console.warn(`Nenhum ${tipo} disponível para exibir.`);
        const opt = document.createElement("option");
        opt.textContent = `Nenhum ${tipo} encontrado`;
        opt.disabled = true;
        select.appendChild(opt);
        return;
    }

    // Popula o select com os itens filtrados
    itemsFiltrados.forEach(item => {
        const option = document.createElement("option");

        let nomeItemCompleto = "";
        switch (tipo) {
            case 'setor':
                nomeItemCompleto = item.nomeSetor || "Sem nome";
                option.value = item.idSetor;
                break;
            case 'status_chamados':
                nomeItemCompleto = item.nomeStatus || "Sem nome";
                option.value = item.idStatus;
                break;
            case 'tipos_chamados':
                nomeItemCompleto = item.nomeTipo || "Sem nome";
                option.value = item.idTipoChamado;
                break;
            case 'colaborador':
                nomeItemCompleto = `${maximizar_primeiraletra(item.primeiroNome) ?? ""} ${maximizar_primeiraletra(item.segundoNome) ?? ""}`.trim();
                option.value = item.idColaborador;
                break;
            case 'campos_valores':
                item.valores.forEach(v => {
                    const valueOption = document.createElement("option");
                    valueOption.value = v;
                    valueOption.textContent = v || "Sem nome";
                    select.appendChild(valueOption);
                });
                return;
            case 'clientes':
                nomeItemCompleto = `${item.cnpj_cpf} | ${item.razao_social}`.trim();
                option.value = item.id_cliente;
                break;
            case 'atividades':
                nomeItemCompleto = `${item.secao_atividade_cliente} | ${item.subclasse_atividade_cliente} | ${item.descricao_atividade_cliente}`.trim();
                option.value = item.id_atividade_cliente;
                break;
            case 'socios':
                nomeItemCompleto = `${(item.nome_socio)}`.trim();
                option.value = item.id_socio;
                break;
            default:
                console.warn(`Tipo '${tipo}' não reconhecido.`);
                return;
        }

        option.textContent = nomeItemCompleto || `Sem ${tipo}`;

        select.appendChild(option);

        if (itemsFiltrados.length === 1 && block_select) {
            option.selected = true;
            select.disabled = true; // Desabilita o select
        }
    });

    // Se nome_item for fornecido, tenta selecionar a opção correspondente
    if (nome_item) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.trim().toUpperCase() === nome_item.trim().toUpperCase()) {
                select.selectedIndex = i;
                return;
            }
        }

        console.warn(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} '${nome_item}' não encontrado no select '${id_campo}'.`);
    }
}

let colaboradores = [];
let colaboradores_por_setor = [];
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            colaboradores = await consultar_colaboradores(TipoPayloadColaboradores.TODOS_ATIVOS);
            colaboradores_por_setor = await consultar_colaboradores_por_setor()
        } catch (erro) {
            console.error("Erro ao consultar colaboradores:", erro);
        }
    })();
});

function combinar_listas_dados_iniciais(campos_chamados, campos_chamados_valores, tipos_chamados, setores, campos_chamados_por_tipo) {
    // 1. Relacionar campos_chamados com campos_chamados_valores (usando idCampoChamado)
    const camposComValores = campos_chamados.map(campo => {
        const valores = campos_chamados_valores.filter(valor => valor.idCampoChamado === campo.idCampoChamado);
        return {
            ...campo,
            valores: valores // Adiciona os valores do campo
        };
    });

    // 2. Relacionar tipos_chamados com setores (usando idSetor)
    const tiposComSetores = tipos_chamados.map(tipo => {
        const setor = setores.find(s => s.idSetor === tipo.idSetor);
        return {
            ...tipo,
            setor: setor ? setor : null // Adiciona o setor ao tipo de chamado
        };
    });

    // 3. Relacionar campos_chamados_por_tipo com campos_chamados e tipos_chamados
    const camposPorTipo = campos_chamados_por_tipo.map(campoPorTipo => {
        const campo = camposComValores.find(c => c.idCampoChamado === campoPorTipo.idCampoChamado);
        const tipo = tiposComSetores.find(t => t.idTipoChamado === campoPorTipo.idTipoChamado);
        
        return {
            ...campoPorTipo,
            campo: campo,  // Campo de chamado com valores
            tipo: tipo     // Tipo de chamado com setor
        };
    });

    return camposPorTipo;
}

function filtrar_campos_dados_iniciais(dadosCombinados, nomeTipo, nomeSetor, nomeCampo = null) {
    // Filtra os dadosCombinados com base no nomeTipo e nomeSetor
    const resultado = dadosCombinados.filter(item => {
        // Verifica se o tipo corresponde ao nomeTipo fornecido
        const tipoCondicao = nomeTipo ? item.tipo.nomeTipo.toLowerCase().includes(nomeTipo.toLowerCase()) : true;

        // Verifica se o setor corresponde ao nomeSetor fornecido
        const setorCondicao = nomeSetor ? item.tipo.setor.nomeSetor.toLowerCase().includes(nomeSetor.toLowerCase()) : true;

        // Se nomeCampo for fornecido, também verifica a condição para o nomeCampo
        const campoCondicao = nomeCampo ? item.campo.nomeCampo.toLowerCase().includes(nomeCampo.toLowerCase()) : true;

        // Retorna true apenas se todas as condições forem satisfeitas
        return tipoCondicao && setorCondicao && campoCondicao;
    });

    // Para cada item do resultado, extrai os valores dos campos
    const camposComValores = resultado.map(item => {
        return {
            nomeTipo: item.tipo.nomeTipo,
            nomeSetor: item.tipo.setor.nomeSetor,
            campo: item.campo.nomeCampo,
            idCampoChamado: item.campo.idCampoChamado,
            valores: item.campo.valores.map(valor => valor.valor) // Extraímos os valores associados ao campo
        };
    });

    return camposComValores;
}

async function enviar_arquivo_servidor(file, id_chamado, categoria, nome_arquivo) {
    // enviar_arquivo_servidor(file, "0000001", categoria_arquivo.OBRIGATORIEDADE, 'documento_cliente')
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB em bytes
    if (file.size > MAX_SIZE) {
        alertaInfo('O arquivo excede o limite de 50MB. Por favor, envie um arquivo menor.');
        return false; // Retorna false e não faz o envio
    }

    const data = new FormData();
    data.append('file', file);
    data.append('id_chamado', id_chamado);
    data.append('categoria', categoria);
    data.append('nome_arquivo', nome_arquivo);
    
    const response = await fetch('http://26.13.203.58:5000/upload', {
        method: 'POST',
        body: data
    });
    const result = await response.json();

    return result.status === 'success' ? true : false;
}

async function baixar_arquivo_servidor(id_chamado, categoria, nome_arquivo) {
    const params = new URLSearchParams();
    params.append('id_chamado', id_chamado);
    params.append('categoria', categoria);
    params.append('nome_arquivo', nome_arquivo);

    const response = await fetch(`http://26.13.203.58:5000/download?${params.toString()}`, {
        method: 'GET',
    });

    if (!response.ok) {
        // Trate o erro se a resposta não for bem-sucedida
        console.error("Erro ao baixar o arquivo:", response.statusText);
        return false;
    }

    // Usando .blob() para lidar com a resposta como um arquivo
    const blob = await response.blob();

    // Criar um URL de objeto para o arquivo binário
    const url = window.URL.createObjectURL(blob);

    // Criar um link para baixar o arquivo
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nome_arquivo}`; // Nome do arquivo a ser baixado
    document.body.appendChild(a);
    a.click(); // Simula o clique para iniciar o download
    document.body.removeChild(a);

    return true;
}

function criarCampoDePesquisa(classCampoTexto, idCampoId, classLista,
                            idContainer, placeholderAtivo, lista_dados, 
                            tamanho_bloco = '150%', incrementoRem  = 23.5) 
{
    /* ---------- referências DOM ---------- */
    const input    = document.querySelector(classCampoTexto);
    const outputEl = document.getElementById(idCampoId);
    const lista    = document.querySelector(classLista);
    const cont     = document.getElementById(idContainer);

    /* ---------- popula a <ul> ---------- */
    lista.innerHTML = '';
    lista.style.maxWidth = tamanho_bloco;

    lista_dados.forEach(({ id, texto }) => {
        const li = document.createElement('li');
        li.textContent   = texto;
        li.dataset.value = id;
        lista.appendChild(li);
    });

    /* ---------- alturas ---------- */
    const rem            = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const baseHeightRem  = parseFloat(getComputedStyle(cont).height) / rem;

    let listaAberta = false;

    const abrir = () => {
        if (listaAberta) return;
        lista.style.display = 'block';
        lista.classList.add('aberto');
        cont.style.height = `${baseHeightRem + incrementoRem}rem`;
        listaAberta = true;
    };

    const fechar = () => {
        if (!listaAberta) return;
        cont.style.height = `${baseHeightRem}rem`;
        lista.classList.remove('aberto');
        lista.style.display = 'none';
        listaAberta = false;
    };

    /* ---------- array de <li> ---------- */
    const valoresArray = [...lista.querySelectorAll('li')];

    /* ---------- filtra enquanto digita ---------- */
    input.addEventListener('input', () => {
        abrir();
        const v = input.value.toLowerCase();
        valoresArray.forEach(li => {
            // true se o item CONTÉM o texto digitado, em qualquer posição
            const contem = li.textContent.toLowerCase().includes(v);
            // adiciona a classe 'fechado' quando NÃO contém
            li.classList.toggle('fechado', !contem);
        });
    });

    /* ---------- focus mostra tudo ---------- */
    input.addEventListener('focus', () => {
        input.placeholder = placeholderAtivo;
        valoresArray.forEach(li => li.classList.remove('fechado'));
        abrir();
    });

    /* ---------- perder o foco fecha ---------- */
    input.addEventListener('blur', () => {
            /* espera um micro-tick para permitir que o click/mousedown no <li> aconteça */
            setTimeout(() => {
                /* se o elemento atualmente focado NÃO está dentro da lista, então pode fechar */
                if (!lista.contains(document.activeElement)) fechar();
            }, 300);
        });

    /* ---------- clique em item fecha ---------- */
    valoresArray.forEach(li => {
        li.addEventListener('click', () => {
        outputEl.value = li.dataset.value; // <output hidden>
        input.value    = li.textContent;
        fechar();
        });
    });
    
    /* ---------- clique fora (mousedown) fecha ---------- */
    document.addEventListener('mousedown', e => {
        if (e.target === input || lista.contains(e.target)) return;
        fechar();
    });
}

// ===============================================

async function preencher_lista_clientes() {
    let lista_clientes = await consultar_clientes(1)
    let lista_clientes_normalizada = normalizarLista(
        lista_clientes, 
        'id_cliente', 
        item => `${item.cnpj_cpf} | ${item.razao_social}`)
    return lista_clientes_normalizada
}

// ===============================================

const _mensagensExibidas = new Set();

function iniciarChatChamado(
  idChatMensagens, idInputMensagem, idBtnEnviar,
  idListaMensagens, idChamado, nomeTipoRemetente
) {
    /* ---------------- elementos de UI ---------------- */
    const chatMensagens = document.getElementById(idChatMensagens);
    const inputMensagem = document.getElementById(idInputMensagem);
    const btnEnviar     = document.getElementById(idBtnEnviar);

    if (!chatMensagens || !inputMensagem || !btnEnviar) {
        console.warn("Elementos do chat não encontrados.");
        return;
    }

    /* ---------------- helpers ---------------- */
    function adicionarMensagem(id_mensagem, texto, tipo = 'solicitante') {
        if (_mensagensExibidas.has(id_mensagem)) return;  // já foi renderizada

        const div = document.createElement('div');
        div.classList.add(idListaMensagens, tipo);
        div.dataset.msgId = id_mensagem;
        div.textContent   = texto;
        chatMensagens.appendChild(div);
        chatMensagens.scrollTop = chatMensagens.scrollHeight;

        _mensagensExibidas.add(id_mensagem);
    }

    function enviarMensagem() {
        const texto = inputMensagem.value.trim();
        if (!texto) return;

        const sql =
            `
                INSERT INTO tbl_Chat_Chamado (
                    id_chamado,
                    id_tipo_remetente,
                    id_remetente,
                    mensagem,
                    data_envio
                )
                VALUES (
                    @js_id_chamado,
                    (SELECT id_tipo_remetente FROM tbl_Tipos_Remetentes WHERE nome_remetente = @js_nome_tipo_remetente),
                    @js_id_remetente,
                    @js_mensagem,
                    @js_data_envio
                )
            `;
        
        retorno_insert = runSqlInsert(sql, {js_id_chamado: idChamado, 
                                            js_nome_tipo_remetente: nomeTipoRemetente, 
                                            js_id_remetente: usuario_logado.idColaborador,
                                            js_mensagem: texto,
                                            js_data_envio: pegar_data_hora_agora('isoUtc')})
        retorno_insert.then(id_insert => {
            console.log("O ID inserido na tabela foi o ID: " + id_insert)
            iniciarChatChamado(
                idChatMensagens, idInputMensagem, idBtnEnviar,
                idListaMensagens, idChamado, nomeTipoRemetente
            );
        })
        
        inputMensagem.value = '';
    }

    function preencherMensagem() {
        const texto = inputMensagem.value.trim();
        if (!texto) return;

        // gera id temporário só para não duplicar localmente
        const idTemp = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        adicionarMensagem(idTemp, texto, nomeTipoRemetente);
        
        inputMensagem.value = '';
    }

    /* ---------------- listeners ---------------- */
    if (!btnEnviar.dataset.listenerAttached) {
        btnEnviar.addEventListener('click', enviarMensagem);
        inputMensagem.addEventListener('keydown', e => {
            if (e.key === 'Enter') 
                enviarMensagem();
        });
        btnEnviar.dataset.listenerAttached = '1';
    }

    /* ---------------- carrega histórico do servidor ---------------- */
    consultar_chat_chamado(idChamado).then(chatArr => {
            chatArr.forEach(msg =>
                adicionarMensagem(msg.id_chat_chamado, msg.mensagem, msg.nome_remetente)
            );
        })
        .catch(console.error);
}

const _chatLoops = new Map();

// iniciarLoopChat(idChamado);
function iniciarLoopChatChamado(
    idChatMensagens, idInputMensagem, idBtnEnviar,
    idListaMensagens, idChamado, nomeTipoRemetente, ms=3000
) {
    if (_chatLoops.has(idChamado)) {
        return;
    }
    const intervalId = setInterval(() => {
        iniciarChatChamado(
            idChatMensagens,
            idInputMensagem,
            idBtnEnviar,
            idListaMensagens,
            idChamado,
            nomeTipoRemetente
        );
    }, ms);

    _chatLoops.set(idChamado, intervalId);
}

function encerrarLoopChatChamado(idChamado) {
    const intervalId = _chatLoops.get(idChamado);
    if (intervalId) {
        clearInterval(intervalId);
        _chatLoops.delete(idChamado);
    }
}