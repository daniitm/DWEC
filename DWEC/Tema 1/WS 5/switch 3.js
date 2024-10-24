let numero1 = parseInt(prompt("Dame un numero: "));
let numero2 = parseInt(prompt("Dame otro numero: "));
let operacion = prompt("Dame una operacion: ");


switch(operacion) {
    case "+": 
        document.write("La operacion es: " + (numero1 + numero2));
        break;

    case "-": 
        document.write("La operacion es: " + (numero1 - numero2));
        break;

    case "*": 
        document.write("La operacion es: " + (numero1 * numero2));
        break;

    case "/": 
        document.write("La operacion es: " + (numero1 / numero2));
        break;
}