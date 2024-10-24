let mes = prompt("Dame el nombre de un mes del año: ");


switch(mes) {
    case "Enero": 
    case "Marzo":
    case "Mayo":
    case "Julio": 
    case "Agosto":
    case "Octubre": 
    case "Diciembre":
        document.write("Este mes tiene 31 dias");
        break;

    case "Febrero":
    case "Abril":
    case "Junio":
    case "Septiembre":
    case "Noviembre":
        document.write("Este mes tiene 30 dias");
        break;
}