const validaciones = {
    nombre: valor => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor),
    apellidos: valor => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor),
    dni: valor => /^[0-9]{8}[A-Za-z]$/.test(valor),
    telefono: valor => /^\d{9}$/.test(valor),
    email: valor => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor),
    username: valor => /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(valor)
};

function validarCampo(input) {
    const campo = input.id;
    const valor = input.value;
    const esValido = validaciones[campo](valor);
    const mensajeError = document.getElementById(`${campo}Error`);

    if (esValido) {
        input.classList.remove("error");
        mensajeError.style.display = "none";
    } else {
        input.classList.add("error");
        mensajeError.style.display = "block";
    }
        return esValido;
}

document.querySelectorAll('#registroForm input').forEach(input => {
    input.addEventListener('blur', () => validarCampo(input));
});

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let formularioValido = true;
    document.querySelectorAll('#registroForm input').forEach(input => {
        if (!validarCampo(input)) {
            formularioValido = false;
        }
    });
});