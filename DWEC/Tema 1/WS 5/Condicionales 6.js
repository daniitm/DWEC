let localidad = prompt("Dime dónde vives: ");
let edad = parseInt(prompt("Dame tu edad: "));


if (localidad == "Madrid" && edad > 18 && edad < 30) {
    document.write("Puedes acceder al carnet de empresarios emprendedores");
}