//Apartado 1:
function muestraPosicion(pos) {
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
}
navigator.geolocation.getCurrentPosition(muestraPosicion);



//Apartado 4:
navigator.geolocation.watchPosition(muestraPosicion);

//Apartado 5:
function getDistanceBetweenPointsNew($latitude1, $longitude1, $latitude2, $longitude2, $unit = 'miles') {
    $theta = $longitude1 - $longitude2; 
    $distance = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta))); 
    $distance = acos($distance); 
    $distance = rad2deg($distance); 
    $distance = $distance * 60 * 1.1515; 
    switch($unit) { 
      case 'miles': 
        break; 
      case 'kilometers' : 
        $distance = $distance * 1.609344; 
    } 
    return (round($distance,2)); 
  }