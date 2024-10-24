function filtraPalabrasMasLargas(cad_arg, i) {
    let palabras = cad_arg.split(" ");
    let contador = 0;

    for (let palabra of palabras) {
        if (palabra.length > i) {
            contador++;
        }
    }
    return contador;
}

let cad_arg = prompt("Dame una cadena: ");
let i = parseInt(prompt("Dame un numero: "));
document.write("Número de palabras más largas que " + i + ": " + filtraPalabrasMasLargas(cad_arg, i));
