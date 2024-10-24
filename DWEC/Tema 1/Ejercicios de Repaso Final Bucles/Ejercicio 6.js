let numero1 = parseInt(prompt("Dame un numero: "));
let numero2 = parseInt(prompt("Dame otro numero: "));
let suma = 0;


for (let i = numero1; i <= numero2; i++) {
    if (i % 2 === 0) {
        suma += i;
    }
}

document.write("La suma de los numeros pares entre " + numero1 + " y " + numero2 + " es: " + suma);  