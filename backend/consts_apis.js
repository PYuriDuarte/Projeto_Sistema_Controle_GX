const API_URL_COLABORADORES = "https://api.devduarte.com/colaboradores/consultar";
const API_URL_SETORES = "https://api.devduarte.com/setores";
const API_URL_STATUS_CHAMADOS = "https://api.devduarte.com/status-chamados";
const API_URL_TIPOS_CHAMADOS = "https://api.devduarte.com/tipos-chamados";
const API_URL_CAMPOS_CHAMADOS = "https://api.devduarte.com/campos-chamados";
const API_URL_CAMPOS_CHAMADOS_VALORES = "https://api.devduarte.com/campos-chamados-valores";
const API_URL_CAMPOS_CHAMADOS_POR_TIPO = "https://api.devduarte.com/campos-chamados-por-tipo";

const $ = (id) => document.getElementById(id);

async function post_api(payload, url) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 10_000);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: ctrl.signal
        });

        if (response.status === 404) return []; // Se não encontrar, retorna lista vazia
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(to); // Limpa o timeout
    }
}

async function get_api(url) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 10_000);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal: ctrl.signal
        });

        if (response.status === 404) return []; // Se não encontrar, retorna lista vazia
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(to); // Limpa o timeout
    }
}