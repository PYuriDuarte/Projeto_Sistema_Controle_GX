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