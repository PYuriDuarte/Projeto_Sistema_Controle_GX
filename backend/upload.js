document.addEventListener('submit', e => {
    if (e.target.querySelector('.fileInput')) e.preventDefault();
}, true);   // captura

document.addEventListener('change', ev => {
    if (!ev.target.classList.contains('fileInput')) return;

    const input   = ev.target;
    const file    = input.files[0];
    if (!file) return;

    /* ---------- parâmetros vindos dos data-attributes ---------- */
    const chamado = input.dataset.chamado || '00000001';
    const nome    = input.dataset.nome    || 'arquivo';
    /* ----------------------------------------------------------- */

    const serverPath = `E:\\Projetos\\Projeto_Controle_Chamados\\backend\\chamados\\${chamado}\\comprovacoes`;
    const ext        = file.name.slice(file.name.lastIndexOf('.'));          // mantém a extensão original
    const fileName   = `${nome}${ext}`;                                      // nome final no servidor

    /* monta e envia */
    const fd = new FormData();
    fd.append('file',       file);
    fd.append('serverPath', serverPath);
    fd.append('fileName',   fileName);

    fetch('http://localhost:5000/api/upload', { method: 'POST', body: fd })
        .then(async r => {
        if (r.ok) {
            alert('Arquivo enviado com sucesso!');
        } else {
            const err = await r.json().catch(() => ({}));
            throw new Error(err.error || r.statusText);
        }
        })
        .catch(err => alert(`Erro: ${err.message}`))
        .finally(() => { input.value = ''; });        // limpa para permitir novo upload
});
