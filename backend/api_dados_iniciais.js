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

function consultar_colaborador_eh_lider(id_colaborador, id_setor) {
    const sql_comando =
        `
            SELECT 
                colaborador_lider 
            FROM 
                tbl_Colaboradores_Setores 
            WHERE 
                id_colaborador = @js_id_colaborador and
                id_setor = @js_id_setor;
        `;
        
    const retorno_sql = runSqlSelect(sql_comando, { 
        js_id_colaborador: id_colaborador,
        js_id_setor: id_setor
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

function consultar_chat_chamado(id_chamado) {
    const sql_comando =
        `
            SELECT 
                id_chat_chamado,
                tbl_Chamados.id_chamado,
                tbl_Tipos_Remetentes.id_tipo_remetente,
                nome_remetente,
                id_remetente,
                primeiro_nome as primeiro_nome_remetente,
                segundo_nome as segundo_nome_remetente,
                mensagem,
                data_envio
            FROM 
                tbl_Chat_Chamado
                JOIN tbl_Colaboradores 
                    ON id_remetente = id_colaborador
                JOIN tbl_Chamados 
                    ON tbl_Chat_Chamado.id_chamado = tbl_Chamados.id_chamado
                JOIN tbl_Tipos_Remetentes
                    ON tbl_Chat_Chamado.id_tipo_remetente = tbl_Tipos_Remetentes.id_tipo_remetente
            WHERE
	            tbl_Chamados.id_chamado = @js_id_chamado
            ORDER BY
	            data_envio
        `;
        
    const retorno_sql = runSqlSelect(sql_comando, {js_id_chamado: id_chamado})
    return retorno_sql
}

function consultar_qtde_chamados_realizados(id_responsavel) {
    const sql_comando =
        `
            SELECT
                COUNT(*) AS qtde_chamados,
                s.id_status,
                s.nome_status,
                c.id_responsavel as id_colaborador
            FROM tbl_Chamados AS c
            JOIN tbl_Status_Chamados AS s ON s.id_status = c.id_status
            WHERE c.id_responsavel = @js_id_responsavel 
            GROUP BY
                s.id_status,
                s.nome_status,
                c.id_responsavel

            UNION

            SELECT
                COUNT(*) AS qtde_chamados,
                s.id_status,
                s.nome_status,
                c.id_solicitante as id_colaborador
            FROM tbl_Chamados AS c
            JOIN tbl_Status_Chamados AS s ON s.id_status = c.id_status
            WHERE c.id_solicitante = @js_id_responsavel 
            GROUP BY
                s.id_status,
                s.nome_status,
                c.id_solicitante;
        `;
        
    const retorno_sql = runSqlSelect(sql_comando, {js_id_responsavel: id_responsavel})
    return retorno_sql
}

function consultar_dados_chamados_por_colaborador_e_setor() {
    const sql_comando =
        `
            SELECT
                s.nome_setor as setor,
                CONCAT(
                    UPPER(LEFT( c.primeiro_nome , 1 )),
                    LOWER(SUBSTRING( c.primeiro_nome , 2 , LEN(c.primeiro_nome) )),
                    ' ',
                    UPPER(LEFT( c.segundo_nome , 1 )),
                    LOWER(SUBSTRING( c.segundo_nome , 2 , LEN(c.segundo_nome) ))
                ) AS nome,
                SUM(CASE WHEN ch.id_solicitante = c.id_colaborador THEN 1 ELSE 0 END) AS solicitados, -- Nº de chamados abertos pelo colaborador
                SUM(CASE WHEN ch.id_responsavel = c.id_colaborador AND ch.id_status = 2 THEN 1 ELSE 0 END) AS andamento, -- Nº de chamados em que ele é responsável e status = 2
                SUM(CASE WHEN ch.id_responsavel = c.id_colaborador AND ch.id_status = 3 THEN 1 ELSE 0 END) AS atendidos -- Nº de chamados em que ele é responsável e status = 3
            FROM tbl_Colaboradores c
                JOIN tbl_Colaboradores_Setores cs 
                    ON cs.id_colaborador = c.id_colaborador
                JOIN tbl_Setores s  
                    ON s.id_setor = cs.id_setor
                LEFT JOIN tbl_Chamados ch 
                    ON (ch.id_solicitante = c.id_colaborador OR ch.id_responsavel = c.id_colaborador)
            GROUP BY
                s.id_setor,
                s.nome_setor,
                c.id_colaborador,
                c.primeiro_nome,
                c.segundo_nome
            ORDER BY
                s.id_setor,
                c.primeiro_nome;
        `;
        
    const retorno_sql = runSqlSelect(sql_comando)
    return retorno_sql
}