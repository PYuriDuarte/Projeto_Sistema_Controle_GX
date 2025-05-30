// Função para atualizar barra de progresso dos chamados realizados
function atualizarBarraChamados() {
    const realizados = parseInt(document.getElementById('qtd_realizados').textContent, 10) || 0;
    const pendentes = parseInt(document.getElementById('qtd_pendentes').textContent, 10) || 0;
    const total = realizados + pendentes;
    let percentual = 0;
    if (total > 0) {
        percentual = Math.round((realizados / total) * 100);
    }
    document.getElementById('barra_realizados').style.width = percentual + '%';
    document.getElementById('barra_realizados').title = percentual + '% dos chamados resolvidos';
}

document.addEventListener('DOMContentLoaded', atualizarBarraChamados);