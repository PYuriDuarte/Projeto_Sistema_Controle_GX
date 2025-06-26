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
    teste(dados)
    return await post_api(dados, API_URL_CHAMADO_CADASTRAR);
}

async function consultar_chamados(payload) {
    return await post_api(payload, API_URL_CHAMADOS_CONSULTA);
}

async function atualizar_chamados(payload) {
    return await post_api(payload, API_URL_CHAMADOS_ATUALIZAR);
}

function consultar_clientes(cliente_ativo){
    const sql_comando =
        `
            SELECT 
                * 
            FROM 
                tbl_Clientes 
            WHERE ativo = @js_ativo;
        `;
        
    const retorno_sql = runSqlSelect(sql_comando, { 
        js_ativo: cliente_ativo
    })
    return retorno_sql
}

function consultar_atividades(){
    const sql_comando =
        `
            SELECT 
                * 
            FROM 
                tbl_Atividades_Clientes
        `;
        
    const retorno_sql = runSqlSelect(sql_comando)
    return retorno_sql
}

function consultar_socios(id_cliente){
    const sql_comando =
        `
            SELECT 
                * 
            FROM 
                tbl_Clientes_Socios
                JOIN tbl_Socios ON tbl_Clientes_Socios.id_socio = tbl_Socios.id_socio
            WHERE
                id_cliente = @js_id_cliente
        `;
        
    const retorno_sql = runSqlSelect(sql_comando, {js_id_cliente: id_cliente})
    return retorno_sql
}

function consultar_colaboradores_por_setor() {
    const sql_comando =
        `
            SELECT 
                tbl_Colaboradores.*,
                tbl_Setores.*,
                tbl_Colaboradores_Setores.colaborador_lider
            FROM 
                tbl_Colaboradores_Setores
                    JOIN tbl_Colaboradores ON tbl_Colaboradores.id_colaborador = tbl_Colaboradores_Setores.id_colaborador
                    JOIN tbl_Setores ON tbl_Setores.id_setor = tbl_Colaboradores_Setores.id_setor
            WHERE
	            data_saida IS NULL
        `;
        
    const retorno_sql = runSqlSelect(sql_comando)
    return retorno_sql
}