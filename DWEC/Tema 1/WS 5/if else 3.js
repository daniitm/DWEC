let edad = parseInt(prompt("Dame tu edad: "));


if (edad < 5) {
    document.write("Debes de estar en el jardin de infancia");
} else if (edad >= 6 && edad <= 11) {
    document.write("Debes de estar en primaria");
} else if (edad >= 12 && edad <= 16) {
    document.write("Debes de estar en la ESO");
} else if (edad >= 17 && edad <= 21) {
    document.write("Debes de estar en bachillerato o en un ciclo");
} else if (edad > 21) {
    document.write("Debes de estar en la universidad");
}