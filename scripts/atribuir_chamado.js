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