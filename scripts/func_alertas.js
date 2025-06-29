/* ======================================================================
   Helpers SweetAlert2 (v11) — coloque este arquivo depois de carregar
   sweetalert2.all.min.js no <body>. Cada função abaixo tem um exemplo
   de uso comentado logo antes dela para ficar fácil de copiar.
   ==================================================================== */

/* ------------------------------------------------------------------ */
/* ✅ ALERTA DE SUCESSO                                               */
/* ------------------------------------------------------------------ */
// Exemplo:
// alertaSucesso('Responsável atribuído ao chamado.');
function alertaSucesso(msg = 'Operação concluída!') {
    Swal.fire({
        title: 'Pronto!',
        text:  msg,
        icon:  'success',

        background: '#fff',
        color:      '#333',
        confirmButtonColor: '#055fa4',
        confirmButtonText:  'OK'
    });
}

/* ------------------------------------------------------------------ */
/* ❌ ALERTA DE ERRO                                                  */
/* ------------------------------------------------------------------ */
// Exemplo:
// alertaErro('Falha ao salvar registro. Tente novamente.');
function alertaErro(msg = 'Algo deu errado!') {
    Swal.fire({
        title: 'Erro',
        text:  msg,
        icon:  'error',

        background: '#fff',
        color:      '#b71c1c',
        confirmButtonColor: '#b71c1c',
        confirmButtonText:  'OK'
    });
}

/* ------------------------------------------------------------------ */
/* ℹ️  ALERTA DE INFORMAÇÃO                                           */
/* ------------------------------------------------------------------ */
// Exemplo:
// alertaInfo('O sistema será reiniciado às 23h.');
function alertaInfo(msg = 'Aqui está a informação solicitada.') {
    Swal.fire({
        title: 'Informação',
        text:  msg,
        icon:  'info',

        background: '#fff',
        color:      '#333',
        confirmButtonColor: '#1976d2',
        confirmButtonText:  'Entendi'
    });
}

/* ------------------------------------------------------------------ */
/* ⚠️  ALERTA DE AVISO (warning)                                      */
/* ------------------------------------------------------------------ */
// Exemplo:
// alertaAviso('Você ainda não salvou as alterações.');
function alertaAviso(msg = 'Atenção!') {
    Swal.fire({
        title: 'Aviso',
        text:  msg,
        icon:  'warning',

        background: '#fffbea',
        color:      '#885600',
        confirmButtonColor: '#f9a825',
        confirmButtonText:  'OK'
    });
}

/* ------------------------------------------------------------------ */
/* ✅❌ CONFIRMAÇÕES                                                  */
/* ------------------------------------------------------------------ */
// Exemplo:
// confirmaFechamento(() => finalizar_chamado());
function confirmaFechamento(callbackOk) {
    Swal.fire({
        title:            'Finalizar chamado?',
        text:             'Depois de fechado não será possível editá-lo.',
        icon:             'warning',
        showCancelButton: true,
        confirmButtonText:'Sim, fechar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor:'#c62828',
        reverseButtons:   true
    }).then(result => {
        if (result.isConfirmed && typeof callbackOk === 'function') {
        callbackOk();
        }
    });
}

// Exemplo:
// confirmaExclusao('Excluir registro?', () => excluirRegistro(id));
function confirmaExclusao(titulo, callbackOk) {
    Swal.fire({
        title: titulo || 'Tem certeza?',
        text:  'Esta ação não pode ser desfeita.',
        icon:  'question',
        showCancelButton: true,
        confirmButtonText:'Sim, excluir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor:'#d32f2f',
        reverseButtons:   true
    }).then(result => {
        if (result.isConfirmed && typeof callbackOk === 'function') {
        callbackOk();
        }
    });
}

/* ------------------------------------------------------------------ */
/* 🔄 LOADER enquanto espera                                          */
/* ------------------------------------------------------------------ */
// Exemplo:
// const fechar = mostrarLoader('Salvando...');
// ... faça o processamento assíncrono ...
// fechar(); // quando terminar
function mostrarLoader(texto = 'Processando...') {
    Swal.fire({
        title: texto,
        allowOutsideClick: false,
        didOpen: () => {
        Swal.showLoading();
        }
    });
    // devolve função para fechar
    return () => Swal.close();
}

/* ------------------------------------------------------------------ */
/* 🍞 TOASTS                                                          */
/* ------------------------------------------------------------------ */
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

// Exemplo:
// toastSucesso('Registro salvo com sucesso!');
function toastSucesso(msg = 'OK!') {
    Toast.fire({ icon: 'success', title: msg });
}

// Exemplo:
// toastErro('Erro de conexão. Tente novamente.');
function toastErro(msg = 'Erro!') {
    Toast.fire({ icon: 'error', title: msg });
}

// Exemplo:
// toastInfo('Novo chamado recebido.');
function toastInfo(msg = 'Info!') {
    Toast.fire({ icon: 'info', title: msg });
}

// Exemplo:
// toastAviso('Você está offline.');
function toastAviso(msg = 'Aviso!') {
    Toast.fire({ icon: 'warning', title: msg });
}