/**
 * Executa um SELECT genérico no endpoint /sql/query
 * @param {string} sql              - Instrução SQL (apenas SELECT)
 * @param {Object} [params={}]      - Parâmetros nomeados (@param) → valor
 * @returns {Promise<Array<Object>>}  Promise com o array de linhas
 */
function runSqlSelect(sql, params = {}) {
    const body = { sql, parameters: params };
    
    return fetch('https://api.devduarte.com/sql/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(res => {
    if (!res.ok) {
        // lança o texto de erro ou o status se não houver JSON
        return res.text().then(t => { throw new Error(t || res.statusText); });
    }
    return res.json(); // resultado = array de objetos
    });
}

/**
 * EXEMPLO DE USO
 * const sqlIgual =
        `SELECT *
            FROM tbl_Chamados
        WHERE id_chamado = @id;`;
        
    runSql(sqlIgual, { id: id_chamado })
        .then(data => console.log('Grupo específico:', data))
        .catch(err => console.error(err));
 */