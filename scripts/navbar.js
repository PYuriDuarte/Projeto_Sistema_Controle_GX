document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar_botao').forEach(link => {
        link.addEventListener('click', function() {
            // Remove a classe de todos
            document.querySelectorAll('.sidebar_botao').forEach(el => el.classList.remove('botao_sidebar_selecionado'));
            // Adiciona no clicado
            link.classList.add('botao_sidebar_selecionado');
            // Se quiser marcar o pai também:
            atualizarBarraChamados()
            if (link.parentElement) {
                // Remove dos pais antigos
                document.querySelectorAll('.sidebar_botao').forEach(el => {
                    if (el.parentElement) el.parentElement.classList.remove('botao_sidebar_selecionado');
                });
                link.parentElement.classList.add('botao_sidebar_selecionado');
            }
        });
    });

    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const iconSidebar = document.getElementById('iconSidebar');
    const controleSidebar = document.getElementById('controleSidebar');
    const container_conteudo = document.getElementById('container_conteudo');

    if (toggleSidebar && sidebar && iconSidebar && controleSidebar) {
            toggleSidebar.addEventListener('click', () => {
                sidebar.classList.toggle('minimizado');

                if (sidebar.classList.contains('minimizado')) {
                    iconSidebar.style.transform = 'rotate(270deg)';
                    controleSidebar.style.left = '6rem';
                    container_conteudo.style.marginLeft = '6.5rem';
                }
                else {
                    iconSidebar.style.transform = 'rotate(90deg)';
                    controleSidebar.style.left = '12.55rem';
                    container_conteudo.style.marginLeft = '13.5rem';
                }
            });

            if (sidebar.classList.contains('minimizado')) {
                iconSidebar.style.transform = 'rotate(270deg)';
                controleSidebar.style.left = '6rem';
                container_conteudo.style.marginLeft = '6.5rem';
            }
            else {
                iconSidebar.style.transform = 'rotate(90deg)';
                controleSidebar.style.left = '12.55rem';
                container_conteudo.style.marginLeft = '13.5rem';
            }
    }
});
