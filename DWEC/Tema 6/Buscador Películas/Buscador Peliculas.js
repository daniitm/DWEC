//AJAX:
var peliculaBusqueda = "";
var paginaBuscar = 2;

window.onload = () => {
    document.getElementById("btn").addEventListener("click", peticionAJAXModerna);
    document.getElementById("btn1").addEventListener("click", cargarPaginas);
}

function peticionAJAXModerna() {
    peliculaBusqueda = document.getElementById("cajaTexto").value;
    paginaBuscar = 2; // Reiniciar página a 2 al realizar una nueva búsqueda
    fetch("http://www.omdbapi.com/?apikey=d535906&s=" + peliculaBusqueda, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults;
        let peliculasContainer = document.getElementById("peliculas-container");
        peliculasContainer.innerHTML = "";  // Limpiar resultados previos
        document.getElementById("btn1").style.display = "inline-block";  // Mostrar el botón de cargar más

        for (let pelicula of datosRecibidos.Search) { 
            let div = document.createElement("div");
            div.classList.add("pelicula");
            div.innerHTML = `<h3>${pelicula.Title}</h3><img src="${pelicula.Poster}" alt="${pelicula.Title}" />`;
            div.addEventListener("click", () => detalles(pelicula.imdbID));
            peliculasContainer.appendChild(div);
        }
    })
    .catch((err) => console.error("error: ", err));
}

function cargarPaginas() {
    fetch("http://www.omdbapi.com/?apikey=d535906&s=" + peliculaBusqueda + "&page=" + paginaBuscar, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        paginaBuscar++;
        let peliculasContainer = document.getElementById("peliculas-container");

        for (let pelicula of datosRecibidos.Search) { 
            let div = document.createElement("div");
            div.classList.add("pelicula");
            div.innerHTML = `<h3>${pelicula.Title}</h3><img src="${pelicula.Poster}" alt="${pelicula.Title}" />`;
            div.addEventListener("click", () => detalles(pelicula.imdbID));
            peliculasContainer.appendChild(div);
        }
    })
    .catch((err) => console.error("error: ", err));
}

// Función para mostrar los detalles de la película
function detalles(imdbID) {
    fetch("http://www.omdbapi.com/?apikey=d535906&i=" + imdbID, {method: "GET"})
    .then((res) => res.json())
    .then((datosPelicula) => {
        let detallesDiv = document.getElementById("detalles");
        detallesDiv.innerHTML = "";  // Limpiar detalles previos

        let titulo = document.createElement("h2");
        titulo.textContent = datosPelicula.Title;
        detallesDiv.appendChild(titulo);

        let anio = document.createElement("p");
        anio.textContent = "Año: " + datosPelicula.Year;
        detallesDiv.appendChild(anio);

        let director = document.createElement("p");
        director.textContent = "Director: " + datosPelicula.Director;
        detallesDiv.appendChild(director);

        let actores = document.createElement("p");
        actores.textContent = "Actores: " + datosPelicula.Actors;
        detallesDiv.appendChild(actores);

        let sinopsis = document.createElement("p");
        sinopsis.textContent = "Sinopsis: " + datosPelicula.Plot;
        detallesDiv.appendChild(sinopsis);

        let poster = document.createElement("img");
        poster.src = datosPelicula.Poster;
        detallesDiv.appendChild(poster);

        // Mostrar la ventana flotante
        detallesDiv.style.display = "block";
    })
    .catch((err) => console.error("error: ", err));
}

// Función para cerrar la ventana de detalles
document.getElementById("cerrarDetalles").addEventListener("click", () => {
    let detallesDiv = document.getElementById("detalles");
    detallesDiv.style.display = "none";  // Ocultar la ventana de detalles
});