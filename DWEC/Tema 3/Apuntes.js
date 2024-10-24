//Funciones:
function imprimeEnConsola(error) {
    console.log(error);
}

function orden(letraA, letraB) {
    if (letraA > letraB)
        return 1;
    else if (letraB < letraA)
        return -1;
    else
        return 0;
}

var resultado = orden("jose", "francisco");


//forEach:
let nombre = ["jose","rosa","paco"];
function pintaNombres(n) {
    console.log(n);
}

nombre.forEach(pintaNombres);