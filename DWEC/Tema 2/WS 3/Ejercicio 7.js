let cadena = prompt("Dame una cadena: ");
cadena.length;


function palindromo(cadena) {
    // Eliminar espacios y convertir a minúsculas para una comparación precisa
    let cadenaLimpia = cadena.replace(/\s+/g, '').toLowerCase();
    let cadenaInvertida = cadenaLimpia.split('').reverse().join('');
    return cadenaLimpia === cadenaInvertida;
}

document.write("La cadena es " + (palindromo(cadena) ? "palindroma" : "no palindroma") + "<br>");