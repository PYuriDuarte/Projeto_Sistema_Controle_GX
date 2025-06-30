// Função para atualizar barra de progresso dos chamados realizados
function atualizarBarraChamados() {
    const realizadosElem = document.getElementById('qtd_realizados');
    const pendentesElem = document.getElementById('qtd_pendentes');
    const barraElem = document.getElementById('barra_realizados');

    if (!realizadosElem || !pendentesElem || !barraElem) {
        return;
    }

    const realizados = parseInt(realizadosElem.textContent, 10) || 0;
    const pendentes = parseInt(pendentesElem.textContent, 10) || 0;
    const total = realizados + pendentes;
    let percentual = 0;
    if (total > 0) {
        percentual = Math.round((realizados / total) * 100);
    }
    barraElem.style.width = percentual + '%';
    barraElem.title = percentual + '% dos chamados resolvidos';
}

// ==============================

function preencher_qtde_chamados_realizados() {
    return consultar_qtde_chamados_realizados(usuario_logado.idColaborador)
        .then(qtde => {
            // qtde[0] RESPONSAVEL
            // qtde[1] SOLICITANTE
            return new Promise(resolve => {
                setTimeout(() => resolve(qtde), 0);
            });
        })
        .then(linha => {
            if(linha[0].nome_status === "ATENDIDOS") {
                const el_qtd_realizados = document.getElementById('qtd_realizados');
                if (el_qtd_realizados) el_qtd_realizados.textContent = String(linha[0].qtde_chamados);
            }

            if(linha[0].nome_status === "EM ANDAMENTO") {
                const el_qtd_pendentes = document.getElementById('qtd_pendentes');
                if (el_qtd_pendentes) el_qtd_pendentes.textContent = String(linha[0].qtde_chamados);
            }       
            
            const el_qtd_abertos = document.getElementById('qtd_abertos'); // NÃO ATRIBUÍDOS
            if (el_qtd_abertos) el_qtd_abertos.textContent = String(linha[1].qtde_chamados);
        })
        .catch(console.error); // trate erros para não silenciar a falha
}

// ==============================

// Gráfico de Área (Visão Geral dos Ganhos)
function desenharGraficos() {
    // Gráfico de Área (Visão Geral dos Ganhos) - Linha crescendo mês a mês
    const areaLabels = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    const areaDataFinal = [10, 30, 10, 100, 40, 50, 60, 60, 60, 90, 70, 80];;

    const ctxArea = document.getElementById('graficoArea').getContext('2d');

    // Começa com todos valores zerados
    let areaDataAtual = new Array(areaLabels.length).fill(null);
    areaDataAtual[0] = areaDataFinal[0];

    const graficoArea = new Chart(ctxArea, {
        type: 'line',
        data: {
            labels: areaLabels,
            datasets: [{
                label: 'Ganho',
                data: areaDataAtual.slice(), // faz cópia do array para evitar referência
                borderColor: '#4e73df',
                backgroundColor: 'rgba(78, 115, 223, 0.08)',
                pointBackgroundColor: '#4e73df',
                pointBorderColor: '#4e73df',
                pointRadius: 4,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            animation: false, // Desliga a animação automática
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: { color: "#f1f1f1" }
                }
            }
        }
    });

    // Animação customizada mês a mês
    let indice = 1;
    function animarLinha() {
        if (indice < areaLabels.length) {
            areaDataAtual[indice] = areaDataFinal[indice];
            graficoArea.data.datasets[0].data = areaDataAtual.slice();
            graficoArea.update();
            indice++;
            setTimeout(animarLinha, 30); // velocidade da animação (ms)
        }
    }
    animarLinha();

    // Gráfico de Pizza (Fontes de Receita) - Preenchendo de 0 ao valor
    const pizzaDataFinal = [60, 30, 10];
    const pizzaDataAtual = [0, 0, 0];

    const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
    const graficoPizza = new Chart(ctxPizza, {
        type: 'doughnut',
        data: {
            labels: ['Direto', 'Social', 'Referência'],
            datasets: [{
                data: pizzaDataAtual.slice(),
                backgroundColor: [
                    '#4e73df',
                    '#1cc88a',
                    '#36b9cc'
                ],
                borderWidth: 0,
            }]
        },
        options: {
            animation: false, // Desliga animação automática para controlar manualmente
            cutout: '70%',
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Animação do gráfico de pizza
    let porcentoAtual = [0, 0, 0];
    let step = 1; // quanto aumenta por frame
    function animarPizza() {
        let terminou = true;
        for (let i = 0; i < pizzaDataFinal.length; i++) {
            if (porcentoAtual[i] < pizzaDataFinal[i]) {
                porcentoAtual[i] += step;
                if (porcentoAtual[i] > pizzaDataFinal[i]) porcentoAtual[i] = pizzaDataFinal[i];
                terminou = false;
            }
        }
        graficoPizza.data.datasets[0].data = porcentoAtual.slice();
        graficoPizza.update();

        if (!terminou) {
            setTimeout(animarPizza, 8);
        }
    }
    animarPizza();
}

// ==============================================================================================================================================
//  CHAMADOS POR COLABORADOR

function initColabChart(dadosColaboradores) {
    // 1) Elementos do fragmento
    const rootElement = document.querySelector('#colabChart');
    const selectSetor = rootElement.querySelector('#colabChartSelect');
    const tbody       = rootElement.querySelector('.colab-chart-tbody');
    const ctx         = rootElement.querySelector('#colabChartCanvas').getContext('2d');

    // 2) Preenche <select> com setores
    [...new Set(dadosColaboradores.map(c => c.setor))].forEach(setor => {
        const opt = document.createElement('option');
        opt.value = setor;
        opt.textContent = setor;
        selectSetor.appendChild(opt);
    });

    // 3) Cria gráfico Chart.js
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                { label: 'Em Andamento', backgroundColor: getVar('--cor-alerta'),  data: [] },
                { label: 'Atendidos',    backgroundColor: getVar('--cor-correto'), data: [] },
                { label: 'Solicitados',  backgroundColor: getVar('--cor-erro'), data: [] },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
        }
    });

    // 4) Renderizador
    function render(setorAtual) {
        const filtrados = dadosColaboradores.filter(c => c.setor === setorAtual);

        // tabela
        tbody.innerHTML = '';
        filtrados.forEach(c => {
            const tr = document.createElement('tr');
            tr.className = 'colab-chart-tr';
            tr.innerHTML = `
                <td>${c.nome}</td>
                <td>${c.atendidos}</td>
                <td>${c.andamento}</td>
                <td>${c.solicitados}</td>`;
            tbody.appendChild(tr);
        });

        // gráfico
        chart.data.labels           = filtrados.map(c => c.nome);
        chart.data.datasets[0].data = filtrados.map(c => c.atendidos);
        chart.data.datasets[1].data = filtrados.map(c => c.andamento);
        chart.data.datasets[2].data = filtrados.map(c => c.solicitados);
        chart.update();
    }

    // 5) Utilitário de cores
    function getVar(cssVar) {
        return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
    }

    // 6) Eventos
    selectSetor.addEventListener('change', e => render(e.target.value));

    // 7) Primeira renderização
    render(selectSetor.options[0].value);
}