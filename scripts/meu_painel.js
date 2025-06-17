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