let cadena = prompt("Dame una cadena: ");
cadena.length;


function informacionCadena(cadena) {
    if (cadena === cadena.toUpperCase()) {
        return "La cadena esta formada solo por mayusculas.";
    } else if (cadena === cadena.toLowerCase()) {
        return "La cadena esta formada solo por minusculas.";
    } else {
        return "La cadena esta formada por una mezcla de mayusculas y minusculas.";
    }
}

document.write("Informacion de la cadena: " + informacionCadena(cadena) + "<br>");