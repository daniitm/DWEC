let a = parseInt(prompt("Dame el primer numero: "));
let b = parseInt(prompt("Dame el segundo numero: "));
let c = parseInt(prompt("Dame el tercer numero: "));

let resultado1;
let resultado2;

resultado1 = (-b + Math.sqrt((b*b) - 4 * a * c)) / 2 * a;
document.write("El primer resultado es: " + resultado1 + "<br>");

resultado2 = (-b - Math.sqrt((b*b) - 4 * a * c)) / 2 * a;
document.write("El segundo resultado es: " + resultado2);