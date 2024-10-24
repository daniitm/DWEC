let longitude, latitude, map, marker, route = [], line;

function actualizarMapa(pos) {
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);

  if (!map) {
    map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(map);
    marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
    line = L.polyline(route, { color: 'blue' }).addTo(map);
  }
  marker.setLatLng([pos.coords.latitude, pos.coords.longitude]);
  route.push([pos.coords.latitude, pos.coords.longitude]);
  line.setLatLngs(route);
  map.setView([pos.coords.latitude, pos.coords.longitude], map.getZoom());
}

navigator.geolocation.getCurrentPosition(actualizarMapa);



