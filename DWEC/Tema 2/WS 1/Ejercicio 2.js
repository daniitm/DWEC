let fechaHoy = new Date();
document.write("Fecha de hoy: " + fechaHoy.getDate() + "<br>");

let fecha85 = new Date(fechaHoy);
fecha85.setDate((fecha85.getDate()) + 85);
document.write("Fecha de hoy mas 85 dias: " + fecha85.toLocaleString() + "<br>");

let fecha187 = new Date(fechaHoy);
fecha187.setDate((fecha187.getDate()) - 187);
document.write("Fecha de hoy menos 187 dias: " + fecha187.toLocaleString() + "<br>");

fecha85.setFullYear((fecha85.getFullYear()) + 2);
document.write("Fecha de hoy mas 85 dias y 2 anios: " + fecha85.toLocaleString() + "<br>");

fecha187.setDate((fecha187.getDate()) - 24);
document.write("Fecha de hoy menos 187 dias y 24 horas anios: " + fecha85.toLocaleString() + "<br>");

let fechaResto = fecha85 - fecha187;
document.write("Fecha restante: " + fechaResto.toLocaleString() + "<br>");



