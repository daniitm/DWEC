let suma = 0;

for (let i = 0; i < 10; i++) {
    let numero = parseInt(prompt("Dame un numero:"));
    suma += numero;
}

document.write("La suma de los 10 numeros es: " + suma);
