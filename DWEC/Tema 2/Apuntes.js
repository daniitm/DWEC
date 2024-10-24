let miCoche = new Coche();
miCoche.marca


let cadena = new String();
cadena.length

let fecha1 = new Date();
fecha1.getDay(); //Devuelve el dia de la semana
let fecha2 = new Date();


let miCoche2 = {
    marca: "Ford",
    modelo: "Focus"
};


//Objeto Date:
nuevaFecha = new Date(); //marca el tiempo en el que se crea, aunque lo utilices de nuevo pondrá la misma fecha

c = new Date();
c.toLocaleString(); //Muestra la fecha local
c.toUTCString(); //Muestra la fecha de manera universal


let cadena2 = "clase de javascript";
cadena2[0]; //Devuelve la "c"
cadena2.indexOf("java"); //Devuelve 9
cadena2.indexOf("java", 10); //Esto sirve para que busque de nuevo la palabra o letras seleccionadas a partir de la anterior busqueda, si no encuentra nada devolverá "-1"


//Objetos del navegador
for(prop in screen) {
    document.write(prop + " - " + screen[prop]);
    document.write("<br>");
}

//Funciones:
function nombre (a){
    
    return 1;
}


//Geolocalizacion:
function muestraPosicion(pos){
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
}

navigator.geolocation.getCurrentPosition(muestraPosicion);



function muestraPosicion(pos){
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);

    var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 12);
    L.tileLayer('https://tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);

    var circle = L.circle([pos.coords.latitude, pos.coords.longitude], {
        color: 'blue',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
}

//API Mapas (interfaz de programación de aplicaciones)