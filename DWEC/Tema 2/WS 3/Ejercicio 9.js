let cadena = prompt("Dame una cadena: ");

// Función para generar la tabla
function generarTabla(cadena) {
    let longitud = cadena.length;
    
    // Imprimir la primera fila con la palabra original
    for (let i = 0; i < longitud; i++) {
        document.write(cadena[i] + " ");
    }
    document.write("<br>");

   
    //Imprimir la primera y la ultima columna 
    for (let i = 1; i < longitud - 1; i++) {
        document.write(cadena[i]); // Primera columna
        for (let j = 1; j < longitud - 1; j++) {
            document.write("<br>" ^ longitud); // Espacios en blanco
        }
        document.write(cadena[longitud - i - 1] + "<br>"); // Última columna
    }

    // Imprimir la ultima fila con la palabra invertida
    for (let i = longitud - 1; i >= 0; i--) {
        document.write(cadena[i] + " ");
    }
}

generarTabla(cadena);

