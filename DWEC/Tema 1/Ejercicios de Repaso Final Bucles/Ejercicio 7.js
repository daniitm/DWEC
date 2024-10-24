let numeros = parseInt(prompt("Dame un numero: "));
let suma = 0;

for (let i = 1; i <= numeros; i++) {
    suma += i;
}

document.write("La suma de los primeros " + numeros + " numeros es: " + suma);