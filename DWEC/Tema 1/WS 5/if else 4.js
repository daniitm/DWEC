let nhermanos = parseInt(prompt("¿Cuantos hermanos tienes?: "));
let cantidad = parseInt(prompt("Dame una cantidad: "));


if (isNaN(nhermanos) || isNaN(cantidad)) {//isNaN sirve para detectar que el valor que pone el usuario no es un numero (Not a Number)
    document.write("Me tienes que dar un numero");
} else {
    if (nhermanos > 3) {
        document.write("Tienes un 15% de descuento: " + ((cantidad * 15) / 100));
    } else if (nhermanos < 3) {
        document.write("Tienes un 5% de descuento: " + ((cantidad * 5) / 100));
    } else if (nhermanos == 0) {
        document.write("No tienes ningun descuento: " + cantidad);
    } 
}
