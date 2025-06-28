// ====== FUNÇÃO PARA RENDERIZAR OS CAMPOS DATA ====== //
// Só data de hoje, editável
// renderizar_campo_data('chamados_recebidos_data_fim');
// Valor específico em dd/mm/aaaa
// renderizar_campo_data('chamados_recebidos_data_fim', false, '08/06/2025');
// Valor específico em yyyy-mm-dd
// renderizar_campo_data('chamados_recebidos_data_fim', false, '2025-06-08');
// Readonly
// renderizar_campo_data('chamados_recebidos_data_fim', true);
function renderizar_campo_data(campo, nome_label, isReadonly = false, valor = null) {
    const label = document.querySelector(`label:has(input#${campo})`) || document.querySelector('label');
    if (label) {
        label.innerHTML = nome_label + '<br>' + montar_campo_data(campo, isReadonly, valor);
    }
}

function pegar_data_hora_agora(tipo_retorno){
    const agora = new Date();
    
    if(tipo_retorno == 'soData'){
        return agora.toISOString().slice(0, 10);
    }
    else if (tipo_retorno == 'isoUtc'){
        return agora.toISOString();       // '2025-06-27T14:32:11.734Z'
    }
    else if (tipo_retorno == 'isoLocal'){
        return agora.toISOString()        // '2025-06-27T14:32:11.734Z'
                    .slice(0, 19)         // '2025-06-27T14:32:11'
                    .replace('T', ' ');   // '2025-06-27 14:32:11'
    }
}

function montar_campo_data(campo, isReadonly = false, valor = null) {
    let v = valor?.match(/^\d{2}\/\d{2}\/\d{4}$/)
        ? valor.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')
        : (valor || new Date().toISOString().split('T')[0]);
    return `<input type="date" id="${campo}" value="${v}"${isReadonly ? ' readonly' : ''}>`;
}

function hoje_menos_tantos_dias(qtde_dias){
    const hoje = new Date();
    hoje.setDate(hoje.getDate() - qtde_dias);
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`; // dd/mm/aaaa

    return dataFormatada
}

function formatar_data_modelo_consulta_chamados(dataString) {
    if (!dataString) return "Data não informada";
    
    const data = new Date(dataString);
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    
    return `${dia} ${mes} ${ano} [${horas}h${minutos}]`;
}

function texto_parece_caminho(str) {
    if (typeof str !== 'string') return false;
    const s = str.trim();

    // a) C:\...    b) \\servidor\...
    const temPrefixoValido = /^[A-Za-z]:\\/.test(s) || /^\\\\[^\\]+\\/.test(s);
    const temOutraBarra    = s.indexOf('\\', 3) !== -1; // mais uma “\” depois do prefixo
    const semCaracteresRuins = !/[\"\n\r]/.test(s); // não permite aspas ou quebras de linha

    return temPrefixoValido && temOutraBarra && semCaracteresRuins;
}


/**
 * Transforma um array de objetos em [{id, texto}]
 *
 * @param {Array<Object>} lista          Array original
 * @param {string} campoId               Nome da propriedade que vira id
 * @param {string|Function} campoTexto   Nome da propriedade **ou** função que gera o texto
 * @returns {Array<{id:any, texto:any}>}
 */
function normalizarLista(lista, campoId, campoTexto) {
  return lista.map(item => ({
    id   : item[campoId],
    texto: typeof campoTexto === 'function'
              ? campoTexto(item)                  // usa a função fornecida
              : item[campoTexto]                  // usa o campo simples
  }));
}


/**
 * Exibe ou oculta a opção "Atribuir Chamados"
 * @param {boolean} ehLider – true para mostrar, false para esconder
 */
function controlarAtribuirChamado(ehLider) {
    const item = document.getElementById('item_atribuir_chamado');
    const hr   = document.getElementById('hr_atribuir_chamado');
    
    if (!item || !hr){return};           // segurança

    // duas opções: só esconder ou remover do DOM.
    if (ehLider) {
        item.style.display = '';         // mostra
        hr.style.display   = '';
    } else {
        item.style.display = 'none';     // oculta
        hr.style.display   = 'none';
    }
}