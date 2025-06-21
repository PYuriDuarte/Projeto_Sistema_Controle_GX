// ===================== FUNÇÃO DE TESTE =====================

function teste(){
    console.log("teste")
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
                                        nome_item: `${usuario_logado.primeiroNome.toUpperCase()} ${usuario_logado.segundoNome.toUpperCase()}`});
                        popular_select({id_campo: 'chamados_recebidos_setor', tipo: 'setor'});
                        popular_select({id_campo: 'chamados_recebidos_tipo_chamado', tipo: 'tipos_chamados'});
                        popular_select({id_campo: 'chamados_recebidos_status', tipo: 'status_chamados'});
                        break;
                    case "Chamados Enviados":
                        renderizar_campo_data('chamados_enviados_data_fim', "Data Fim", false, hoje_menos_tantos_dias(0));
                        renderizar_campo_data('chamados_enviados_data_inicio', "Data Início", false, hoje_menos_tantos_dias(30));
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

function popular_select({ id_campo, tipo, nome_item, nome_setor, campos_dinamicos }) {
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
        case 'campos_valores':
            itemsFiltrados = filtrar_campos_dados_iniciais(dados_iniciais_combinados, ...campos_dinamicos);
            // console.log(itemsFiltrados)
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
            case 'campos_valores':
                item.valores.forEach(v => {
                    const valueOption = document.createElement("option");
                    valueOption.value = v;
                    valueOption.textContent = v || "Sem nome";
                    select.appendChild(valueOption);
                });
                return;
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
                // console.log(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} selecionado: ${nome_item}`);
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
            // console.log("colaboradores");
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
let dados_iniciais_combinados = [];
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            setores = await consultar_setores();
            // console.log("setores");
            // console.log(setores);
            status_chamados = await consultar_status_chamados();
            // console.log("status_chamados");
            // console.log(status_chamados);
            tipos_chamados = await consultar_tipos_chamados();
            // console.log("tipos_chamados");
            // console.log(tipos_chamados);
            campos_chamados = await consultar_campos_chamados();
            // console.log("campos_chamados");
            // console.log(campos_chamados);
            campos_chamados_valores = await consultar_campos_chamados_valores();
            // console.log("campos_chamados_valores");
            // console.log(campos_chamados_valores);
            campos_chamados_por_tipo = await consultar_campos_chamados_por_tipo();
            // console.log("campos_chamados_por_tipo");
            // console.log(campos_chamados_por_tipo);

            dados_iniciais_combinados = combinar_listas_dados_iniciais(campos_chamados, campos_chamados_valores, tipos_chamados, setores, campos_chamados_por_tipo);
            // console.log("dados_iniciais_combinados");
            // console.log(dados_iniciais_combinados);
        } catch (erro) {
            console.error("Erro ao consultar dados iniciais:", erro);
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

const categoria_arquivo = Object.freeze({
  COMPROVACAO: "comprovacoes",
  OBRIGATORIEDADE: "obrigatorios"
});

async function enviar_arquivo_servidor(file, id_chamado, categoria, nome_arquivo) {
    // enviar_arquivo_servidor(file, "0000001", categoria_arquivo.OBRIGATORIEDADE, 'documento_cliente')    
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

// async function baixar_arquivo_servidor(id_chamado, categoria, nome_arquivo) 
async function baixar_arquivo_servidor(event) {
    event.preventDefault();

    const params = new URLSearchParams();
    params.append('id_chamado', "000048");
    params.append('categoria', "obrigatorios");
    params.append('nome_arquivo', "anexo_iptu.pdf");

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
    a.download = "anexo_iptu.pdf"; // Nome do arquivo a ser baixado
    document.body.appendChild(a);
    a.click(); // Simula o clique para iniciar o download
    document.body.removeChild(a);

    return true;
}