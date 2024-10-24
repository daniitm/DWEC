let numero;
let intento;

numero = parseInt(prompt("Dame un numero: "));


do {
    intento = parseInt(prompt("Adivina el número: ")) 
        if (intento > numero) {
            alert("El numero es menor. Intentalo de nuevo.");
        } else if (intento < numero) {
            alert("El numero es mayor. Intentalo de nuevo.");
        } else {
            document.write("Has acertado el numero");
        }
} while (intento != numero);