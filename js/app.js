const display = document.getElementById("displayInput");

function adicionarAoDisplay(valor) {
    display.value += valor;
}

function limparDisplay() {
    display.value = "";
}

function apagarUltimo() {
    display.value = display.value.slice(0, -1);
}

function calcular() {
    if (display.value.trim() === "") {
        return;
    }

    try {
        display.value = eval(display.value);
    } catch (erro) {
        display.value = "Erro";
        setTimeout(() => display.value = "", 1500);
    }
}
