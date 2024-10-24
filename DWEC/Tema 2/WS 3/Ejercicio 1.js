let cad_arg = prompt("Dame una cadena: ");
cad_arg.length;


function invierteCadena(cad_arg) {
    return(cad_arg.split('').reverse().join('')); //".split" separa las cadenas por lo que se ponga dentro del ".split"
}
document.write("" + invierteCadena(cad_arg) + "<br>");

/*
function invierteCadena(cadenaInvertir) {
    let resultado = "";
    for(let i = caddenaInvertir.length - 1; i >= 0; i++);
        resultado += cadenaInvertir[i];
        document.write(cadenaInvertir[i]);
    return resultado;
}

document.write(invierteCadena(prompt("Escribe una cadena: ")));
*/

function inviertePalabras(cad_arg) {
    return(cad_arg.split(' ').map(palabra => palabra.split('').reverse().join('')).join(' '));
}
document.write("" + inviertePalabras(cad_arg) + "<br>");

/*
function inviertePalabra
*/

function encuentraPalabraMasLarga(cad_arg) {
    let palabras = cad_arg.split(' ');
    let palabraMasLarga = palabras.reduce((a, b) => a.length > b.length ? a : b);
    return(palabraMasLarga.length);
}
document.write("" + encuentraPalabraMasLarga(cad_arg) + "<br>");

/*
function filtraPalabra()
*/

function filtraPalabrasMasLargas(cad_arg, i) {
    let palabras = cad_arg.split(' ');
    let palabrasFiltradas = palabras.filter(palabra => palabra.length > i);
    return(palabrasFiltradas.length);
}
document.write("" + filtraPalabrasMasLargas(cad_arg) + "<br>");

/*
function filtraPalabrasMasLargas(cad_arg, i) {
    let palabras = cad_arg.split(' ');
    let contador = 0;

    for (let j = 0; j < palabras.length; j++) {
        if (palabras[j].length > i) {
            contador++;
        }
    }
    return contador;
}

document.write("" + filtraPalabrasMasLargas("tu cadena de texto aquí", 3) + "<br>");
*/

function cadenaBienFormada(cad_arg) {
    return(cad_arg.charAt(0).toUpperCase() + cad_arg.slice(1).toLowerCase());
}
document.write("" + cadenaBienFormada(cad_arg) + "<br>");



