let numero = prompt("Dame un numero: ");


if (isNaN(numero)) {
    document.write("Me tienes que dar un numero");
} else {
    let suma = 0;
    for (let i = 0; i < numero.length; i++) {
        suma += parseInt(numero[i]);
    }
    document.write("La suma de los dígitos es: " + suma);
}