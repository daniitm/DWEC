let columnas = parseInt(prompt("Dime el numero de columnas: "));
let filas = parseInt(prompt("Dime el numero de filas: "));
let alto = parseInt(prompt("Dime el alto: "));
let ancho = parseInt(prompt("Dime el ancho: "));

document.write("<table border='0' cellspacing='2' bgcolor='black' width='" + (ancho * columnas) + "'>");

for (let i = 0; i < filas; i++) {
    document.write("<tr height='" + alto + "'>");
    for (let j = 0; j < columnas; j++) {
        document.write("<td width='" + ancho + "' height='" + alto + "' bgcolor='white'></td>");
    }
    document.write("</tr>");
}

document.write("</table>");