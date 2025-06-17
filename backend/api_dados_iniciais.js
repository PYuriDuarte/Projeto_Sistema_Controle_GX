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