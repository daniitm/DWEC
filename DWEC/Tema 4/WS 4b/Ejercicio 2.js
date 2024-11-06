const pantalla = document.getElementById("pantalla");
let operacion = "";

function agregarNumero(numero) {
    operacion += numero;
    pantalla.value = operacion;
}

function agregarPunto() {
    const partes = operacion.split(/[\+\-\*\/]/);
    const ultimoNumero = partes[partes.length - 1];
  
    if (!ultimoNumero.includes(".")) {
      operacion += ".";
      pantalla.value = operacion;
    }
}

function agregarOperador(operador) {
    if (operacion && !isNaN(operacion[operacion.length - 1])) {
        operacion += operador;
        pantalla.value = operacion;
    }
}

function calcular() {
    try {
        operacion = eval(operacion).toString();
        pantalla.value = operacion;
    } catch (e) {
        pantalla.value = "Error";
    }
}

function limpiarPantalla() {
    operacion = "";
    pantalla.value = "";
}