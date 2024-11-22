// Datos iniciales del Congreso
const partidos = ['PP', 'PSOE', 'Vox', 'Sumar', 'ERC', 'Junts', 'EH Bildu', 'EAJ-PNV', 'BNG', 'CC', 'UPN'];
const colores = ['#2872c1', '#c12828', '#52bb44', '#d13f74', '#d6d631', '#32b9d1', '#32b9d1', '#3bae54', '#79e1d7', '#d6d631', '#2872c1'];

// Elementos para las gráficas
const barChart = document.getElementById('barChart');
const pieChart = document.getElementById('pieChart');

// Función para generar datos aleatorios para los escaños
function generarEscañosAleatorios() {
    return Array.from({ length: partidos.length }, () => Math.floor(Math.random() * 150) + 1); // Genera entre 1 y 15 escaños aleatorios
}

// Función para dibujar la gráfica de barras
function dibujarGraficaBarras(escaños) {
    // Limpiar la gráfica de barras
    barChart.innerHTML = '';

    // Dibujar las barras
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
}

// Función para dibujar la gráfica de sectores (pie chart)
function dibujarGraficaSectores(escaños) {
    let conicGradient = '';
    let startAngle = 0;

    // Calcular el ángulo para cada sector
    escaños.forEach((escaño, i) => {
        const angle = (escaño / escaños.reduce((a, b) => a + b, 0)) * 360;
        conicGradient += `${colores[i]} ${startAngle}deg ${startAngle + angle}deg, `;
        startAngle += angle;
    });

    // Actualizar el fondo de la gráfica circular
    pieChart.style.background = `conic-gradient(${conicGradient.slice(0, -2)})`;
}

// Función para actualizar los datos
function actualizarDatos() {
    const nuevosEscaños = generarEscañosAleatorios();
    dibujarGraficaBarras(nuevosEscaños);
    dibujarGraficaSectores(nuevosEscaños);
}

// Ejecutar la actualización cada 10 segundos
setInterval(actualizarDatos, 10000);

// Inicializar con datos aleatorios al cargar la página
actualizarDatos();


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