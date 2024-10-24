function muestraPosicion(pos) {
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);

    var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);    
    var marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
}

navigator.geolocation.getCurrentPosition(muestraPosicion);