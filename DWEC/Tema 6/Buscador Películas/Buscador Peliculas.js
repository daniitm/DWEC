//AJAX

//Variables globales
var peliculaBusqueda = "";
var paginaBuscar = 1; 
var cargando = false;  

window.onload = () => {
    document.getElementById("btn").addEventListener("click", peticionAJAXModerna);
    window.addEventListener("scroll", verificarScroll);
}

//Funcion para realizar la busqueda inicial
function peticionAJAXModerna() {
    peliculaBusqueda = document.getElementById("cajaTexto").value;
    paginaBuscar = 1; // Reiniciar la página a 1 para una nueva busqueda
    cargarPeliculas();
}

// Función para cargar las películas, ya sea al buscar o al hacer scroll
function cargarPeliculas() {
    if (cargando) return; // Evitar hacer múltiples solicitudes mientras una ya se esté procesando

    cargando = true;
    fetch("http://www.omdbapi.com/?apikey=d535906&s=" + peliculaBusqueda + "&page=" + paginaBuscar, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        if (paginaBuscar === 1) {
            // Limpiar resultados anteriores al realizar una nueva búsqueda
            let peliculasContainer = document.getElementById("peliculas-container");
            peliculasContainer.innerHTML = ""; // Limpiar los resultados previos
        }

        // Mostrar el número de resultados encontrados
        document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults;

        // Añadir nuevas películas a la lista
        let peliculasContainer = document.getElementById("peliculas-container");

        for (let pelicula of datosRecibidos.Search) { 
            let div = document.createElement("div");
            div.classList.add("pelicula");
            div.innerHTML = `<h3>${pelicula.Title}</h3><img src="${pelicula.Poster}" alt="${pelicula.Title}" />`;
            div.addEventListener("click", () => detalles(pelicula.imdbID));
            peliculasContainer.appendChild(div);
        }

        // Incrementar la página para cargar más en la siguiente llamada
        paginaBuscar++;

        // Dejar de cargar
        cargando = false;
    })
    .catch((err) => {
        console.error("error: ", err);
        cargando = false;
    });
}

// Función para cargar más resultados cuando el usuario hace scroll
function verificarScroll() {
    // Verificar si estamos cerca del final de la página
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500) {
        cargarPeliculas(); // Cargar más películas
    }
}

// Función para mostrar los detalles de la película
function detalles(imdbID) {
    fetch("http://www.omdbapi.com/?apikey=d535906&i=" + imdbID, {method: "GET"})
    .then((res) => res.json())
    .then((datosPelicula) => {
        let detallesDiv = document.getElementById("detalles");
        const elementosDetalles = detallesDiv.querySelectorAll("h2, p, img");
        elementosDetalles.forEach(elemento => elemento.remove());
         
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

