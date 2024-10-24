function actualizarReloj() {
    const fecha = new Date();
    document.write(fecha.getFullYear() + "/");
    document.write(fecha.getMonth() + "/");
    document.write(fecha.getDay() + "/ ");
    document.write(fecha.getHours() + ":");
    document.write(fecha.getMinutes() + ":");
    document.write(fecha.getSeconds());
    setTimeout(actualizarReloj, 1000);
    document.write("<br>");
}

window.onload = actualizarReloj;