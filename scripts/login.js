function mostrar_senha() {
    var input = document.getElementById("campo_senha");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}