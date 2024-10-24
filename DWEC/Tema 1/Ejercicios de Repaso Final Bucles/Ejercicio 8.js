let numero = parseInt(prompt("Dime un numero: "));

for (let i = 1; i <= numero; i++) {
    let factorial = 1;
    for (let j = 1; j <= i; j++) {
        factorial *= j;
    }
    document.write("El factorial de "+ i +" es: "+ factorial +"<br>");
}