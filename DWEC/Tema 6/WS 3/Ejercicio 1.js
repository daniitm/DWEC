$(document).ready(function(){
    // Recorrer las filas de la tabla
    $('#miTabla tr').each(function(index){
        if (index < 2) { 
            // Fondo rojo si la fila está por encima de la tercera (índice 2)
            $(this).css('background-color', 'red');
        } else if (index > 2) { 
            // Fondo azul si la fila está por debajo de la tercera (índice 2)
            $(this).css('background-color', 'blue');
        }
        // La fila 3 (índice 2) no se modifica
    });
});