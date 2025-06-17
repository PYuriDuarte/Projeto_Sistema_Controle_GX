
// SHA-256 em hexadecimal usando Web Crypto
async function sha256Hex(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// Consulta por login
async function consultar_colaboradores(tipo) {
    const payload = gerar_payload_colaboradores(tipo);
    return await post_api(payload, API_URL_COLABORADORES);
}

// Enum de tipos possíveis
const TipoPayloadColaboradores = {
    LOGIN: "LOGIN",
    POR_SETOR: "POR_SETOR",
    TODOS: "TODOS",
    TODOS_ATIVOS: "TODOS_ATIVOS"
};

function gerar_payload_colaboradores(tipo) {
    switch (tipo.toUpperCase()) {
        case TipoPayloadColaboradores.LOGIN:
            return {
                Login: $("campo_usuario").value.trim(),
                Senha: $("campo_senha").value,
                AnoSaida: 0,
            };
        case TipoPayloadColaboradores.POR_SETOR:
            return {
                Setor: $("campo_setor").value,
                AnoSaida: 0,
            };
        case TipoPayloadColaboradores.TODOS:
            return {};
        case TipoPayloadColaboradores.TODOS_ATIVOS:
            return {AnoSaida: 0,};
        default:
            throw new Error("Tipo de payload não reconhecido: " + tipo);
    }
}

/* ------------------------------------------------------------------
   Handler do botão “Entrar”
   ------------------------------------------------------------------ */
async function autenticar_usuario(ev) {
    ev.preventDefault();

    const login = $("campo_usuario").value.trim();
    const senha = $("campo_senha").value;

    if (!login || !senha) return alert("Preencha usuário e senha.");

    const lista = await consultar_colaboradores(TipoPayloadColaboradores.LOGIN);
    
    if (!lista.length) return alert("Usuário não encontrado.");
    
    sessionStorage.setItem("usuario", JSON.stringify(lista[0]));
    window.location.href = "index.html";
}

/* ------------------------------------------------------------------
   Exporte para o HTML
   (se o script for type="module", remova o export e use window.autenticar_usuario = …)
   ------------------------------------------------------------------ */
window.autenticar_usuario = autenticar_usuario;