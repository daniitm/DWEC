document.write("Esto se escribe desde JS");
document.write("<p> Y esta es otra sentencia </p>");

//const para cuando quiero definir una constante (es otra variable)

let mivariable1 = 0; //variable local
document.write("El contenido de la variable es: "+ mivariable1);

var mivariable2 = 0; //variable global
document.write("El contenido de la variable es: "+ mivariable2);
if (true)
{
    let varlocalAlBloque = 3;
}

//la mayoria de casos utilizar let, si es global var
//si la variable no tiene valos definido (=) tiene un valor indefinido
//no se definen tipos (numeros, letras...)

let valor = parseInt(prompt("Dame un numero")); //parseInt sirve para sumar valores numericos
valor = valor + 1;
document.write(valor);


