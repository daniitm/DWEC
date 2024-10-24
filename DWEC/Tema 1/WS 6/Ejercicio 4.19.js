let espacio = parseInt(prompt("Dime el tamaño de las celdas: "));

document.write("<table border='0' cellspacing='2' bgcolor='black' width='" + (espacio * 8) + "'>");

for (let i = 0; i < 8; i++) {
    document.write("<tr height='" + espacio + "'>");
    for (let j = 0; j < 8; j++) {
        let color = (i + j) % 2 === 0 ? 'white' : 'black';
        document.write("<td width='" + espacio + "' height='" + espacio + "' bgcolor='" + color + "'></td>");
    }
    document.write("</tr>");
}

document.write("</table>");