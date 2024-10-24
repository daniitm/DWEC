let temperaturac = parseInt(prompt("Dame el valor de la temperatura en celsius: "));
document.write("<br> El valor de la temperatura en celsius es: "+ temperaturac);


document.write("<br> De celsius a fahrenheit es: " + ((temperaturac * 1.8) + 32)); //Para los decimales se utiliza punto


let temperaturaf = parseInt(prompt("Dame el valor de la temperatura en fahrenheit: "));
document.write("<br> El valor de la temperatura en fahrenheit es: "+ temperaturaf);


document.write("<br> De fahrenheit a celsius es: " + ((temperaturaf - 32) / 1.8));
