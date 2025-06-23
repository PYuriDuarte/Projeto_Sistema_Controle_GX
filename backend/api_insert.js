/**
 * Executa um INSERT genérico no endpoint /sql/execute-insert
 * e devolve o ID gerado (assumindo que o back-end faça
 * “INSERT …; SELECT SCOPE_IDENTITY() AS NewId;”).
 *
 * @param {string} sql        – Instrução SQL (apenas INSERT)
 * @param {Object} [params={}]– Parâmetros nomeados (@param → valor)
 * @returns {Promise<number>}   Promise que resolve no ID (Number)
 */
function runSqlInsert(sql, params = {}) {
  const body = { sql, parameters: params };

  return fetch('https://api.devduarte.com/sql/execute-insert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(t => { throw new Error(t || res.statusText); });
      }
      return res.json();                 // { id: 123 }
    })
    .then(obj => obj.id);
}

/* ---------- EXEMPLO DE USO ----------------------------------------- 
const sql =
  `INSERT INTO tbl_Clientes (nome, email)
     VALUES (@nome, @email);`;

runSqlInsert(sql, { nome: 'Ana', email: 'ana@gx.com' })
  .then(id => console.log('Novo cliente ID:', id))
  .catch(err => console.error('Falha no insert:', err.message)); 
*/
