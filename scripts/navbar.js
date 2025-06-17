document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar_botao').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.sidebar_botao').forEach(el => el.classList.remove('botao_sidebar_selecionado')); // Remove dos botões

            custom_dropdown = document.querySelectorAll('.custom_dropdown');
            let dropdown_aberto = Array.from(custom_dropdown)
                .some(el => el.classList.contains('open'));
            if (!dropdown_aberto || !this.classList.contains("dropdown_toggle")){
                custom_dropdown.forEach(el => el.classList.remove('open'));
            }
            
            document.querySelectorAll('.sidebar_botao').forEach(el => {
                if (el.parentElement) el.parentElement.classList.remove('botao_sidebar_selecionado');
            }); // Remove dos pais

            link.classList.add('botao_sidebar_selecionado'); // Adiciona no botão clicado
            
            if (link.parentElement) {
                link.parentElement.classList.add('botao_sidebar_selecionado');
            } // Adiciona no pai
            atualizarBarraChamados();
        });
    });

    // AQUI COMEÇA O CÓDIGO DO DROPDOWN CUSTOMIZADO
    document.querySelectorAll('.custom_dropdown .dropdown_toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let dropdown = this.closest('.custom_dropdown');
            dropdown.classList.toggle('open');
        });
    });

    document.querySelectorAll('.sidebar_subbotao').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.sidebar_subbotao').forEach(el => el.classList.remove('subbotao_sidebar_selecionado'));
            document.querySelectorAll('.dropdown_toggle').forEach(btn => btn.classList.remove('botao_sidebar_selecionado'));

            link.classList.add('subbotao_sidebar_selecionado');

            // Pega o botão principal do dropdown
            let dropdown = link.closest('.custom_dropdown');
            if (dropdown) {
                let toggle = dropdown.querySelector('.dropdown_toggle');
                if (toggle) toggle.classList.add('botao_sidebar_selecionado');
            }
        });
    });

    // Fecha o dropdown se clicar fora dele
    // document.addEventListener('click', function() {
    //     document.querySelectorAll('.custom_dropdown.open').forEach(d => d.classList.remove('open'));
    // });

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
                    controleSidebar.style.left = '4.2rem';
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
                controleSidebar.style.left = '4.2rem';
                container_conteudo.style.marginLeft = '6.5rem';
            }
            else {
                iconSidebar.style.transform = 'rotate(90deg)';
                controleSidebar.style.left = '12.55rem';
                container_conteudo.style.marginLeft = '13.5rem';
            }
    }
});