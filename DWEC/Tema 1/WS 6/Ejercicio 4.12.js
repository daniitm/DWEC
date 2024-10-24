let cuadro = parseInt(prompt("Dime un numero: "));
let alto = parseInt(prompt("Dime el alto: "));
let ancho = parseInt(prompt("Dime el ancho: "));

document.write("<table border='0' cellspacing='2' bgcolor='black' width='" + (ancho * cuadro) + "'>");
document.write("<tr height='" + alto + "'>");

for (let i = 0; i < cuadro; i++) {
    if (i % 2 === 0) {
        document.write("<td width='" + ancho + "' height='" + alto + "' bgcolor='black'></td>");
    } else {
        document.write("<td width='" + ancho + "' height='" + alto + "' bgcolor='white'></td>");
    }
}

document.write("</tr>");
document.write("</table>");
