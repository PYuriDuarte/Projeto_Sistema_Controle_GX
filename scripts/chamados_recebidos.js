// ====== DADOS DE EXEMPLO ====== //
const chamados_recebidos = [
    {
        solicitante: 'Yuri Duarte',
        tipo: 'SEFAZ',
        data: '29 Maio 2025 [17h19]',
        responsavel: 'Viana Duarte',
        status: 'Em Andamento',
        progresso: 70,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false,
        id_chamado: 13
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false,
        id_chamado: 15
    },
    {
        solicitante: 'João Teste',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Finalizado',
        progresso: 100,
        fotoAtribuido: true,
        fotoResponsavelAtribuido: true,
        id_chamado: 17
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
    {
        solicitante: 'João Baidu',
        tipo: 'RH',
        data: '01 Jun 2025 [09h15]',
        responsavel: 'Maria Silva',
        status: 'Pendente',
        progresso: 40,
        fotoAtribuido: false,
        fotoResponsavelAtribuido: false
    },
];

// ====== FUNÇÃO PARA CRIAR O HTML DE UM CHAMADO ====== //
function criar_item_chamado_recebido(chamado) {
    return `
    <li class="chamados_recebidos_item" data-id-chamado="${chamado.id_chamado}">
        <div class="chamados_recebidos_informacoes">
            <div class="chamados_recebidos_foto">
                <div class="chamados_recebidos_icone ${chamado.fotoAtribuido ? 'chamado_atribuido' : 'chamado_nao_atribuido'}">
                    <i class="material-icons">person</i>
                </div>
            </div>
            <div class="chamados_recebidos_nome">
                <span>${chamado.solicitante}</span>
            </div>
            <div class="chamados_recebidos_tipo">
                <span>${chamado.tipo}</span>
            </div>
            <div class="chamados_recebidos_data">
                <span>${chamado.data}</span>
            </div>
            <div class="chamados_recebidos_foto_responsavel">
                <div class="chamados_recebidos_icone ${chamado.fotoResponsavelAtribuido ? 'chamado_atribuido' : 'chamado_nao_atribuido'}">
                    <i class="material-icons">person</i>
                </div>
            </div>
            <div class="chamados_recebidos_nome_responsavel">
                <span>${chamado.responsavel}</span>
            </div>
            <div class="chamados_recebidos_status">
                <span>${chamado.status}</span>
            </div>
            <div class="chamados_recebidos_info">
                <button id="botao_chamados_recebidos_info" onclick="modal_info_chamado_recebido(this)">
                    <i class="material-icons">visibility</i>
                </button>
            </div>
        </div>
        <div class="chamados_recebidos_barra_progresso">
            <span class="chamados_recebidos_progresso" style="width: ${chamado.progresso}%"></span>
        </div>
    </li>
    `;
}

// ====== FUNÇÃO PARA RENDERIZAR O CAMPO SOLICITANTE NO FILTRO ====== //
// Exemplo de uso: renderizarCampoSolicitante(true, 'João Pedro', solicitantesOptions);
function preencher_chamados_recebidos_consultados(event) {
    event.preventDefault();

    const tipo_chamado = document.getElementById('chamados_recebidos_tipo_chamado');
    const responsavel = document.getElementById('chamados_recebidos_responsavel');
    const solicitante = document.getElementById('chamados_recebidos_solicitante');
    const data_inicio = document.getElementById('chamados_recebidos_data_inicio');
    const data_fim = document.getElementById('chamados_recebidos_data_fim');
    const setor = document.getElementById('chamados_recebidos_setor');
    const satus = document.getElementById('chamados_recebidos_status');
    
    renderizar_chamados_recebidos(chamados_recebidos)
}

// ====== FUNÇÃO PARA RENDERIZAR TODOS OS CHAMADOS ====== //
function renderizar_chamados_recebidos(listaChamados) {
    const ul = document.querySelector('.chamados_recebidos_lista');
    if (ul) {
        ul.innerHTML = listaChamados.map(criar_item_chamado_recebido).join('');
    }
}

function modal_info_chamado_recebido(botao) {
    const li = botao.closest('.chamados_recebidos_item');
    if (li) {
        const idChamado = li.dataset.idChamado;
        
        // Só carrega o modal se ainda não tiver carregado
        if (!document.getElementById('modal_chamado_recebido')) {
            fetch('chamados_recebidos_modal_info.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('modal_chamado_recebido_container').innerHTML = html;
                    document.getElementById('modal_chamado_recebido').style.display = 'flex';
                    
                    iniciarChatChamado()
                });
        } else {
            // Se já está carregado, só atualiza o ID e exibe de novo
            document.getElementById('modal_chamado_recebido').style.display = 'flex';
        }
    }
}

function fechar_modal_chamado_recebido() {
    const modal = document.getElementById('modal_chamado_recebido');
    if (modal) modal.style.display = 'none';
}