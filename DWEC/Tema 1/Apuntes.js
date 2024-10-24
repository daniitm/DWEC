let valor = -3;

if (valor > 0) {
    document.write("Es mayor a 0");
} else {
    document.write("Es menor a 0");
}


let resultado; //valor indefinido

if (resultado) {
    document.write("Es verdadero");
} else {
    document.write("Es falso"); //tanto si se pone "= false" como si no se le da valor o es igual a 0, lo detectará como falso
}
//!valor significa negacion o anulacion
//&& para decir "y"
//|| se utiliza para decir "y" pero solo entre dos o mas condiciones concretas

//Bucles:
let nombre1 = prompt("Dime tu nombre: ");

document.write(nombre1[nombre1.length -1]); //Para que te aparezca la ultima letra del nombre
document.write(nombre1[0]); //Para que te aparezca la primera letra del nombre

let nombre2 = prompt("Dime tu nombre: ");

for (let i=0; (i < nombre2.length) && (nombre2 != "Jesus"); i++, j++) {
    document.write("<p>" + nombre2[i] + "</p>");
}

//Do...while:
let nombre3 = prompt("Dime tu nombre: ");

do {
    document.write("Hola Jose"); //Ejecuta "Hola Jose" mientras nombre3 sea "Jose"
} while (nombre3 == "Jose");


let a = prompt("Dime tu nombre: ");
let encontrado = false;

for (let i = 0; i < a.length && !encontrado; i++) {
    if (a[i] == "J") {
        encontrado = true;
    } else {
        document.write("No es J");
    }
}

//For...of sirve para mostrar los valores de la variable en este caso "arr"
const arr =  [3, 5, 7];

for (const i of arr) {
    document.write(i + "<br>");
}

for (let i = 0; i < arr.length; i++) { //Ambos for hacen lo mismo
    document.write(arr[i]);
}

//For...in sirve para mostrar los miembros de los valores de la variable en este caso "arr" y va donde esta el of en el primer for

