let examen1 = parseInt(prompt("Dame la nota del primer examen: "));
let examen2 = parseInt(prompt("Dame la nota del segundo examen: "));
let trabajo1 = parseInt(prompt("Dame la nota del primer trabajo: "));
let trabajo2 = parseInt(prompt("Dame la nota del segundo trabajo: "));

let resultadoE = ((((examen1 + examen2) / 2) * 75) / 100);
let resultadoT = ((((trabajo1 + trabajo2) / 2) * 25) / 100);


if ((resultadoE + resultadoT) > 5) {
    document.write("Estas aprobado");
} else if (examen1 == 4.5 || examen2 == 4.5 || trabajo1 == 4.5 || trabajo2 == 4.5) {
    document.write("Estas aprobado");
} 