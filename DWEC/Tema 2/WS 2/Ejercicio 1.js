let numero1 = Math.random()*1;
let numero2 = (Math.random()*100) + 100;

let primernumero = parseInt(prompt("Dame un numero: "));
let segundonumero = parseInt(prompt("Dame otro numero: "));

let numeroAleatorio = Math.random() * (Math.max(primernumero, segundonumero) - Math.min(primernumero, segundonumero)) + Math.min(primernumero, segundonumero);
document.write("El número aleatorio entre " + primernumero + " y " + segundonumero + " es: " + numeroAleatorio);

