// ===================== FUNÇÃO DE TESTE =====================

function teste(){
    console.log("teste")
}

// ===================== VOLTAR PARA TELA DE LOGIN =====================

function voltar_para_login() {
    var confirmar = confirm("Tem certeza que deseja voltar para o login?");
    if (confirmar) {
        window.location.href = "login.html";
    }
}

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
                        atualizarBarraChamados();
                        desenharGraficos();
                        break;
                    case "Abrir Chamado":
                        popular_setor_atendimento();
                        popular_tipo_chamado();
                        monitorar_opcoes_entrada_abrir_chamado();
                        break;
                    case "Atribuir Chamados":
                        monitorar_clique_itens_adribuicao_chamado();
                        break;
                    case "Chamados Recebidos":
                        renderizar_campo_data('chamados_recebidos_data_fim', false, hoje_menos_tantos_dias(0));
                        renderizar_campo_data('chamados_recebidos_data_inicio', false, hoje_menos_tantos_dias(30));
                        popular_select({id_campo: 'chamados_recebidos_solicitante', tipo: 'colaborador'});
                        popular_select({id_campo: 'chamados_recebidos_responsavel', 
                                        tipo: 'colaborador', 
                                        nome_item: `${usuario_logado.primeiroNome.toUpperCase()} ${usuario_logado.segundoNome.toUpperCase()}`});
                        popular_select({id_campo: 'chamados_recebidos_setor', tipo: 'setor'});
                        popular_select({id_campo: 'chamados_recebidos_tipo_chamado', tipo: 'tipos_chamados'});
                        popular_select({id_campo: 'chamados_recebidos_status', tipo: 'status_chamados'});
                        break;
                    case "Chamados Enviados":
                        renderizar_campo_data('chamados_enviados_data_fim', false, hoje_menos_tantos_dias(0));
                        renderizar_campo_data('chamados_enviados_data_inicio', false, hoje_menos_tantos_dias(30));
                        popular_select({id_campo: 'chamados_enviados_solicitante', 
                                        tipo: 'colaborador', 
                                        nome_item: `${usuario_logado.primeiroNome.toUpperCase()} ${usuario_logado.segundoNome.toUpperCase()}`});
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

function popular_select({ id_campo, tipo, nome_item, nome_setor }) {
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
            itemsFiltrados = setores;
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
            default:
                console.warn(`Tipo '${tipo}' não reconhecido.`);
                return;
        }

        option.textContent = nomeItemCompleto || `Sem ${tipo}`;

        select.appendChild(option);
    });

    // Se nome_item for fornecido, tenta selecionar a opção correspondente
    if (nome_item) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.trim().toUpperCase() === nome_item.trim().toUpperCase()) {
                select.selectedIndex = i;
                console.log(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} selecionado: ${nome_item}`);
                return;
            }
        }

        console.warn(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} '${nome_item}' não encontrado no select '${id_campo}'.`);
    }
}

let colaboradores = [];
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            colaboradores = await consultar_colaboradores(TipoPayloadColaboradores.TODOS_ATIVOS);
            console.log("colaboradores");
            // console.log(colaboradores);
        } catch (erro) {
            console.error("Erro ao consultar colaboradores:", erro);
        }
    })();
});

let setores = [];
let status_chamados = [];
let tipos_chamados = [];
let campos_chamados = [];
let campos_chamados_valores = [];
let campos_chamados_por_tipo = [];
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            setores = await consultar_setores();
            console.log("setores");
            console.log(setores);
            status_chamados = await consultar_status_chamados();
            console.log("status_chamados");
            console.log(status_chamados);
            tipos_chamados = await consultar_tipos_chamados();
            console.log("tipos_chamados");
            console.log(tipos_chamados);
            campos_chamados = await consultar_campos_chamados();
            console.log("campos_chamados");
            console.log(campos_chamados);
            campos_chamados_valores = await consultar_campos_chamados_valores();
            console.log("campos_chamados_valores");
            console.log(campos_chamados_valores);
            campos_chamados_por_tipo = await consultar_campos_chamados_por_tipo();
            console.log("campos_chamados_por_tipo");
            console.log(campos_chamados_por_tipo);
        } catch (erro) {
            console.error("Erro ao consultar dados iniciais:", erro);
        }
    })();
});