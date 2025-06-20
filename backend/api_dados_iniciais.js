async function consultar_setores() {
    return await get_api(API_URL_SETORES);
}

async function consultar_status_chamados() {
    return await get_api(API_URL_STATUS_CHAMADOS);
}

async function consultar_tipos_chamados() {
    return await get_api(API_URL_TIPOS_CHAMADOS);
}

async function consultar_campos_chamados() {
    return await get_api(API_URL_CAMPOS_CHAMADOS);
}

async function consultar_campos_chamados_valores() {
    return await get_api(API_URL_CAMPOS_CHAMADOS_VALORES);
}

async function consultar_campos_chamados_por_tipo() {
    return await get_api(API_URL_CAMPOS_CHAMADOS_POR_TIPO);
}

async function cadastrar_chamado(IdSolicitante, IdTipoChamado, ListaCamposComValor) {
    const dados = {
        IdSolicitante: IdSolicitante,
        IdTipoChamado: IdTipoChamado,
        ListaCamposComValor: ListaCamposComValor
    };
    return await post_api(dados, API_URL_CHAMADO_CADASTRAR);
}

async function consultar_chamados() {
    const payload = {
                IdChamado: $("campo_id_chamado").value.trim(),
                IdTipoChamado: $("campo_tipo_chamado").value,
                IdResponsavel: null,
                IdSolicitante: null,
                DataInicio: null,
                DataFim: null,
                IdSetor: $("campo_setor").value,
                IdStatus: null,
            };
    return await post_api(payload, API_URL_CHAMADOS);
}