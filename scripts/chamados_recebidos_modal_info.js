document.addEventListener('mouseenter', function(event) {
    const td = event.target;
    if (td.classList && td.classList.contains('valor_conteudo')) {
        if (td.offsetWidth < td.scrollWidth) {
            td.setAttribute('title', td.textContent);
        } else {
            td.removeAttribute('title');
        }
    }
}, true); // <--- O 'true' garante o hover correto em tabela

function iniciarChatChamado() {
    const chatMensagens = document.getElementById('modal_info_chamado_recebido_chat_mensagens');
    const inputMensagem = document.getElementById('modal_info_chamado_recebido_mensagem_input');
    const btnEnviar = document.getElementById('modal_info_chamado_recebido_btn_enviar');

    // Garante que os elementos existem
    if (!chatMensagens || !inputMensagem || !btnEnviar) {
        console.warn("Elementos do chat não encontrados.");
        return;
    }

    // Função que adiciona uma mensagem ao chat
    function adicionarMensagem(texto, tipo = 'solicitante') {
        const msg = document.createElement('div');
        msg.classList.add('modal_info_chamado_recebido_msg', tipo);
        msg.textContent = texto;
        chatMensagens.appendChild(msg);
        chatMensagens.scrollTop = chatMensagens.scrollHeight;
    }

    // Função chamada ao enviar mensagem
    function enviarMensagem() {
        const texto = inputMensagem.value.trim();
        if (!texto) return;
        adicionarMensagem(texto, 'solicitante'); // Adiciona a mensagem do usuário
        inputMensagem.value = ''; // Limpa o campo

        // Resposta automática de simulação
        setTimeout(function() {
            adicionarMensagem('Ok! Mensagem recebida.', 'responsavel');
        }, 1200);
    }

    // Evento de click no botão Enviar
    btnEnviar.addEventListener('click', function() {
        enviarMensagem();
    });

    // Evento de pressionar Enter no campo de texto
    inputMensagem.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });

    // Mensagem inicial simulada do responsável
    adicionarMensagem('Olá, em que posso ajudar?', 'responsavel');
}

function baixarArquivoDoServidor(caminho, nome_entrega) {
    const link = document.createElement('a');
    link.href = caminho;            // Caminho relativo ao seu site
    link.download = nome_entrega;   // Nome do arquivo para salvar
    link.click();
}

