//AJAX

// Variables globales
var peliculaBusqueda = "";
var cargando = false;  
var paginaBuscar = 1; 

window.onload = () => {
    // Eventos de click
    document.getElementById("btn").addEventListener("click", peticionAJAXModerna);
    document.getElementById("btn1").addEventListener("click", mostrarInforme); // Evento para mostrar el informe
    document.getElementById("cerrarInforme").addEventListener("click", cerrarInforme); // Evento para cerrar el informe
    window.addEventListener("scroll", verificarScroll);

    document.getElementById("numeroResultados").textContent = "Aún no has buscado nada";
}

// Función para mostrar y ocultar el gif
function mostrarCargando() {
    document.getElementById("loading").style.display = "flex"; // Muestra el GIF
}

function ocultarCargando() {
    document.getElementById("loading").style.display = "none"; // Oculta el GIF
}

// Función para realizar la búsqueda inicial
function peticionAJAXModerna() {
    peliculaBusqueda = document.getElementById("cajaTexto").value;
    paginaBuscar = 1; // Reiniciar la página de búsqueda
    cargarPeliculas();
}

// Función para cargar las películas (búsqueda o scroll)
function cargarPeliculas() {
    if (cargando) return; 
    cargando = true;
    mostrarCargando();

    const categoria = document.getElementById("categoria").value;
    let tipoFiltro = "";

    if (categoria === "movie") {
        tipoFiltro = "&type=movie";
    } else if (categoria === "series") {
        tipoFiltro = "&type=series";
    }

    fetch(`http://www.omdbapi.com/?apikey=d535906&s=${peliculaBusqueda}&page=${paginaBuscar}${tipoFiltro}`, { method: "GET" })
    .then((res) => res.json())
    .then((datosRecibidos) => {
        if (paginaBuscar === 1) {
            // Limpiar resultados anteriores
            let peliculasContainer = document.getElementById("peliculas-container");
            peliculasContainer.innerHTML = "";
        }

        // Manejar casos sin resultados
        if (!datosRecibidos.Search) {
            document.getElementById("numeroResultados").textContent = "No se encontraron resultados.";
            cargando = false;
            ocultarCargando();
            return;
        }

        // Mostrar el número de resultados encontrados
        document.getElementById("numeroResultados").textContent = `Se han encontrado ${datosRecibidos.totalResults} resultados`;

        let peliculasContainer = document.getElementById("peliculas-container");
        for (let pelicula of datosRecibidos.Search) {
            let div = document.createElement("div");
            div.classList.add("pelicula");
            
            let img = document.createElement("img");
            img.src = pelicula.Poster;
            img.alt = pelicula.Title;
            img.addEventListener("error", () => { img.src = "disponible.png"; });

            let titulo = document.createElement("h3");
            titulo.textContent = pelicula.Title;

            div.appendChild(titulo);
            div.appendChild(img);

            // Evento de click para mostrar detalles
            div.addEventListener("click", () => detalles(pelicula.imdbID));

            peliculasContainer.appendChild(div);
        }
        paginaBuscar++; // Aumentar la página para siguiente carga
        cargando = false;
        ocultarCargando();
    })
    .catch((err) => {
        console.error("error: ", err);
        cargando = false;
        ocultarCargando();
    });
}

// Función para mostrar el informe
function mostrarInforme() {
    mostrarCargando(); // Mostrar GIF de carga

    // Obtener el término de búsqueda de la caja de texto
    let terminoBusqueda = document.getElementById("cajaTexto").value;
    
    // Realizar tres peticiones distintas basadas en el término de búsqueda
    Promise.all([
        fetch(`http://www.omdbapi.com/?apikey=d535906&s=${terminoBusqueda}&type=`), // Películas más valoradas (por ejemplo, IMDb Rating)
        fetch(`http://www.omdbapi.com/?apikey=d535906&s=${terminoBusqueda}&type=`), // Películas con mayor recaudación
        fetch(`http://www.omdbapi.com/?apikey=d535906&s=${terminoBusqueda}&type=`)  // Películas más votadas
    ])
    .then(([resValoradas, resRecaudacion, resVotadas]) => {
        return Promise.all([resValoradas.json(), resRecaudacion.json(), resVotadas.json()]);
    })
    .then(([datosValoradas, datosRecaudacion, datosVotadas]) => {
        // Limpiar el contenido previo de las listas (si es necesario)
        let listadoValoradas = document.getElementById("listadoValoradas");
        listadoValoradas.innerHTML = "";

        let listadoRecaudacion = document.getElementById("listadoRecaudacion");
        listadoRecaudacion.innerHTML = "";

        let listadoVotadas = document.getElementById("listadoVotadas");
        listadoVotadas.innerHTML = "";

        // Agregar las películas más valoradas (IMDB Rating)
        if (datosValoradas.Search) {
            // Ordenar por IMDb Rating de mayor a menor (aunque en la API no podemos ordenarlo directamente)
            let valoradasOrdenadas = datosValoradas.Search.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
            valoradasOrdenadas.slice(0, 5).forEach(pelicula => {
                let li = document.createElement("li");
                li.textContent = `${pelicula.Title} - IMDB Rating: ${pelicula.imdbRating}`;
                listadoValoradas.appendChild(li);
            });
        }

        // Agregar las películas con mayor recaudación
        if (datosRecaudacion.Search) {
            // Ordenar por Recaudación de mayor a menor
            let recaudoOrdenado = datosRecaudacion.Search.sort((a, b) => {
                // Convertir BoxOffice a número o asignar 0 si no es válido
                let recaudoA = parseFloat(a.BoxOffice?.replace(/[^\d.-]/g, '')) || 0;
                let recaudoB = parseFloat(b.BoxOffice?.replace(/[^\d.-]/g, '')) || 0;

                return recaudoB - recaudoA; // Ordenar de mayor a menor
            });

            // Mostrar los primeros 5
            recaudoOrdenado.slice(0, 5).forEach(pelicula => {
                let li = document.createElement("li");
                li.textContent = `${pelicula.Title} - Recaudación: ${pelicula.BoxOffice || "No disponible"}`;
                listadoRecaudacion.appendChild(li);
            });
        }

        // Agregar las películas más votadas
        if (datosVotadas.Search) {
            // Ordenar por número de votos de mayor a menor
            let votadasOrdenadas = datosVotadas.Search.sort((a, b) => {
                // Convertir imdbVotes a número o asignar 0 si no es válido
                let votosA = parseInt(a.imdbVotes?.replace(/,/g, '')) || 0;
                let votosB = parseInt(b.imdbVotes?.replace(/,/g, '')) || 0;

                return votosB - votosA; // Ordenar de mayor a menor
            });

            // Mostrar los primeros 5
            votadasOrdenadas.slice(0, 5).forEach(pelicula => {
                let li = document.createElement("li");
                li.textContent = `${pelicula.Title} - Votos: ${pelicula.imdbVotes || "No disponible"}`;
                listadoVotadas.appendChild(li);
            });
        }

        // Mostrar la ventana del informe
        document.getElementById("ventanaInforme").style.display = "block";
        ocultarCargando(); // Ocultar el GIF de carga
    })
    .catch((err) => {
        console.error("Error:", err);
        ocultarCargando();
    });
}

// Función para cerrar el informe
function cerrarInforme() {
    document.getElementById("ventanaInforme").style.display = "none";
}

// Función para scroll
function verificarScroll() {
    // Verificar si el usuario ha llegado al final de la página
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        cargarPeliculas(); 
    }
}

// Función para mostrar los detalles de una película
function detalles(imdbID) {
    mostrarCargando(); // Mostrar el GIF mientras se cargan los detalles
    fetch("http://www.omdbapi.com/?apikey=d535906&i=" + imdbID, {method: "GET"}).then((res) => res.json())
    .then((datosPelicula) => {
        let detallesDiv = document.getElementById("detalles");

        // Limpiar todo el contenido previo (excepto el botón de cerrar)
        const elementosDetalles = detallesDiv.querySelectorAll("h2, p, img, h3");
        elementosDetalles.forEach(elemento => elemento.remove());

        // Agregar el título de la película
        let titulo = document.createElement("h2");
        titulo.textContent = datosPelicula.Title;
        detallesDiv.appendChild(titulo);

        // Agregar la fecha de estreno
        let fecha = document.createElement("p");
        fecha.textContent = "Fecha de estreno: " + datosPelicula.Released;
        detallesDiv.appendChild(fecha);

        // Agregar la duración
        let duracion = document.createElement("p");
        duracion.textContent = "Duración: " + datosPelicula.Runtime;
        detallesDiv.appendChild(duracion);

        // Agregar el género
        let genero = document.createElement("p");
        genero.textContent = "Género: " + datosPelicula.Genre;
        detallesDiv.appendChild(genero);

        // Agregar el director
        let director = document.createElement("p");
        director.textContent = "Director: " + datosPelicula.Director;
        detallesDiv.appendChild(director);

        // Agregar el guion
        let guion = document.createElement("p");
        guion.textContent = "Guión: " + datosPelicula.Writer;
        detallesDiv.appendChild(guion);

        // Agregar los actores
        let actores = document.createElement("p");
        actores.textContent = "Actores: " + datosPelicula.Actors;
        detallesDiv.appendChild(actores);

        // Agregar la sinopsis
        let sinopsis = document.createElement("p");
        sinopsis.textContent = "Sinopsis: " + datosPelicula.Plot;
        detallesDiv.appendChild(sinopsis);

        // Agregar el poster de la película
        let poster = document.createElement("img");
        poster.src = datosPelicula.Poster;
        detallesDiv.appendChild(poster);
        poster.addEventListener("error", () => {
            poster.src = "disponible.png"; // Poster por defecto si falla la carga
        });

        // Mostrar las calificaciones si existen
        if (datosPelicula.Ratings && datosPelicula.Ratings.length > 0) {
            let calificacionesTitle = document.createElement("h3");
            calificacionesTitle.textContent = "Calificaciones:";
            detallesDiv.appendChild(calificacionesTitle);

            datosPelicula.Ratings.forEach(rating => {
                let ratingDiv = document.createElement("p");
                ratingDiv.textContent = `${rating.Source}: ${rating.Value}`;
                detallesDiv.appendChild(ratingDiv);
            });
        }

        // Mostrar la ventana flotante con los detalles
        detallesDiv.style.display = "block";
        
        // Deshabilitar el scroll en la página principal
        document.body.style.overflow = "hidden";

        ocultarCargando(); // Ocultar el GIF después de que los detalles se hayan cargado
    })
    .catch((err) => {
        console.error("error: ", err);
        ocultarCargando(); // Ocultar el GIF si ocurre un error
    });
}

// Función para cerrar la ventana de detalles
document.getElementById("cerrarDetalles").addEventListener("click", () => {
    let detallesDiv = document.getElementById("detalles");
    detallesDiv.style.display = "none";  // Ocultar la ventana de detalles
    
    // Restaurar el scroll en la página principal
    document.body.style.overflow = "";
});



