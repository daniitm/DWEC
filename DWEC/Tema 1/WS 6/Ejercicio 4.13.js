let cuadro = parseInt(prompt("Dime un numero: "));
let alto = parseInt(prompt("Dime el alto: "));
let ancho = parseInt(prompt("Dime el ancho: "));

document.write("<table border='0' cellspacing='2' bgcolor='black' width='" + (ancho * cuadro) + "'>");
document.write("<tr bgcolor='white' height='" + alto + "'>");

let i = 0;
while (i < cuadro) {
    document.write("<td width='" + ancho + "'></td>");
    i++;
}

document.write("</tr>");
document.write("</table>");