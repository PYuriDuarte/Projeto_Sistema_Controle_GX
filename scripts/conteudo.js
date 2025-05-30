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

                if (titulo === "Meu Painel"){
                    atualizarBarraChamados();
                }
            })
            .catch(err => {
                container_corpo.style.display = display;
                titulo_pagina.textContent = "ERRO: Entre em contato com o administrador do sistema.";
            });
    });
});
