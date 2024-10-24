let numero = parseInt(prompt("Dime un numero:"));


if (!isNaN(numero)) {
    for (let i = 1; i <= 10; i++) {
        document.write("<p>La tabla de multiplicar de tu numero es: " + numero + "x" + i + "=" + (numero * i) + "</p>");
    }
} else {
    document.write("Debe de ser un numero");
}
