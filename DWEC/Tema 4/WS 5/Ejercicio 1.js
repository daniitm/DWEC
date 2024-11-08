function validarMayuscula(cadena) {
    return /[A-Z]/.test(cadena);
}

function validarCaracteresEspeciales(cadena) {
    return /[!@#$%^&]/.test(cadena);
}

function validarCorreo(cadena) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cadena);
}

function validarTarjetaCredito(cadena) {
    return /^(?:\d{4}[- ]?){3}\d{4}$/.test(cadena);
}

function validarLongitud(cadena) {
    return cadena.length >= 8;
}

function validarNumero(cadena) {
    return /\d/.test(cadena);
}