//Datos del Congreso
const partidos = ['PP', 'PSOE', 'Vox', 'Sumar', 'ERC', 'Junts', 'EH Bildu', 'EAJ-PNV', 'BNG', 'CC', 'UPN'];
const escaños = [137, 121, 33, 31, 7, 7, 6, 5, 1, 1, 1];

//Colores para los grafico
const colores = ['#2872c1', '#c12828', '#52bb44', '#d13f74', '#d6d631', '#32b9d1', '#32b9d1', '#3bae54', '#79e1d7', '#d6d631', '#2872c1'];

//Calculando el total de escaños
const totalEscaños = escaños.reduce((a, b) => a + b, 0);

//Grafica de barras
const barChart = document.getElementById('barChart');
escaños.forEach((escaño, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${escaño * 2}px`; 
    bar.style.backgroundColor = colores[i];
    bar.title = `${partidos[i]}: ${escaño} escaños`;

    const number = document.createElement('div');
    number.className = 'bar-number';
    number.textContent = escaño;

    barChart.appendChild(bar);
    bar.appendChild(number); 
});

//Grafica de sectores
const pieChart = document.getElementById('pieChart');
let conicGradient = '';
let startAngle = 0;

//Calculo de escaños
escaños.forEach((escaño, i) => {
    const angle = (escaño / totalEscaños) * 360;
    conicGradient += `${colores[i]} ${startAngle}deg ${startAngle + angle}deg, `;
    startAngle += angle;
});

pieChart.style.background = `conic-gradient(${conicGradient.slice(0, -2)})`; 



//Datos geograficos de los paises
const paises = ['ES', 'FR', 'US', 'CN', 'IT'];  
const visitantes = [89.4, 83.7, 79.3, 65.7, 64.5];

//Mostrar los datos en una lista 
const geoChartList = document.getElementById('geoChartList');
paises.forEach((pais, i) => {
    const row = document.createElement('div');
    row.textContent = `${pais}: ${visitantes[i]} millones de visitantes`;
    geoChartList.appendChild(row);
});

google.charts.load('current', {
    'packages': ['geochart'],
});

google.charts.setOnLoadCallback(drawRegionsMap);

//Funcion que dibuja el mapa con los datos 
function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Visitantes'],
        ...paises.map((pais, i) => [pais, visitantes[i]])
    ]);

    var options = {
        colorAxis: {colors: ['#fff', '#007BFF']}, 
        backgroundColor: '#f4f4f4',
        datalessRegionColor: '#d3d3d3', 
        defaultColor: '#f0f0f0', 
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);
}