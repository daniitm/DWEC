//AJAX

//Variables globales
var peliculaBusqueda = "";
var cargando = false;  
var paginaBuscar = 1; 

window.onload = () => {
    //Eventos de click
    document.getElementById("btn").addEventListener("click", peticionAJAXModerna);
    document.getElementById("btn1").addEventListener("click", mostrarInforme); //Evento para mostrar el informe
    document.getElementById("cerrarInforme").addEventListener("click", cerrarInforme); //Evento para cerrar el informe
    window.addEventListener("scroll", verificarScroll);

    document.getElementById("numeroResultados").textContent = "Aún no has buscado nada";
}

//Funcion para mostrar y ocultar el gif
function mostrarCargando() {
    document.getElementById("loading").style.display = "flex"; // Muestra el GIF
}

function ocultarCargando() {
    document.getElementById("loading").style.display = "none"; // Oculta el GIF
}

//Función para realizar la busqueda inicial
function peticionAJAXModerna() {
    peliculaBusqueda = document.getElementById("cajaTexto").value;
    paginaBuscar = 1; 
    cargarPeliculas();
}

//Funcion para cargar las peliculas 
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

    fetch(`https://www.omdbapi.com/?apikey=d535906&s=${peliculaBusqueda}&page=${paginaBuscar}${tipoFiltro}`, { method: "GET" })
    .then((res) => res.json())
    .then((datosRecibidos) => {
        if (paginaBuscar === 1) {
            //Limpiar resultados anteriores
            let peliculasContainer = document.getElementById("peliculas-container");
            peliculasContainer.innerHTML = "";
        }

        //Manejar casos sin resultados
        if (!datosRecibidos.Search) {
            document.getElementById("numeroResultados").textContent = "No se encontraron resultados.";
            cargando = false;
            ocultarCargando();
            return;
        }

        //Mostrar el número de resultados encontrados
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

            //Evento de click para mostrar detalles
            div.addEventListener("click", () => detalles(pelicula.imdbID));

            peliculasContainer.appendChild(div);
        }
        paginaBuscar++; 
        cargando = false;
        ocultarCargando();
    })
    .catch((err) => {
        console.error("error: ", err);
        cargando = false;
        ocultarCargando();
    });
}

//Funcion para mostrar el informe
function mostrarInforme() {
    mostrarCargando();

    let terminoBusqueda = document.getElementById("cajaTexto").value;

    fetch(`https://www.omdbapi.com/?apikey=d535906&s=${terminoBusqueda}&type=`)
        .then((res) => res.json())
        .then((datosBusqueda) => {
            if (!datosBusqueda.Search) {
                alert("No se encontraron resultados para generar el informe.");
                ocultarCargando();
                return;
            }

            let promesasDetalles = datosBusqueda.Search.map(pelicula =>
                fetch(`https://www.omdbapi.com/?apikey=d535906&i=${pelicula.imdbID}`)
                    .then((res) => res.json())
            );

            Promise.all(promesasDetalles)
                .then((detallesPeliculas) => {
                    let listadoValoradas = document.getElementById("listadoValoradas");
                    listadoValoradas.innerHTML = "";

                    let listadoRecaudacion = document.getElementById("listadoRecaudacion");
                    listadoRecaudacion.innerHTML = "";

                    let listadoVotadas = document.getElementById("listadoVotadas");
                    listadoVotadas.innerHTML = "";

                    let valoradasOrdenadas = [...detallesPeliculas].sort((a, b) => 
                        parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
                    );
                    valoradasOrdenadas.slice(0, 5).forEach((pelicula) => {
                        let li = document.createElement("li");
                        li.textContent = `${pelicula.Title} - IMDB Rating: ${pelicula.imdbRating || "No disponible"}`;
                        listadoValoradas.appendChild(li);
                    });

                    let recaudoOrdenado = [...detallesPeliculas].sort((a, b) => {
                        let recaudoA = parseFloat(a.BoxOffice?.replace(/[^\d.-]/g, '')) || 0;
                        let recaudoB = parseFloat(b.BoxOffice?.replace(/[^\d.-]/g, '')) || 0;
                        return recaudoB - recaudoA;
                    });
                    recaudoOrdenado.slice(0, 5).forEach((pelicula) => {
                        let li = document.createElement("li");
                        li.textContent = `${pelicula.Title} - Recaudación: ${pelicula.BoxOffice || "No disponible"}`;
                        listadoRecaudacion.appendChild(li);
                    });

                    let votadasOrdenadas = [...detallesPeliculas].sort((a, b) => {
                        let votosA = parseInt(a.imdbVotes?.replace(/,/g, '')) || 0;
                        let votosB = parseInt(b.imdbVotes?.replace(/,/g, '')) || 0;
                        return votosB - votosA;
                    });
                    votadasOrdenadas.slice(0, 5).forEach((pelicula) => {
                        let li = document.createElement("li");
                        li.textContent = `${pelicula.Title} - Votos: ${pelicula.imdbVotes || "No disponible"}`;
                        listadoVotadas.appendChild(li);
                    });

                    document.getElementById("ventanaInforme").style.display = "block";
                    document.body.style.overflow = "hidden"; // Bloquear scroll en el fondo

                    ocultarCargando();
                })
                .catch((err) => {
                    console.error("Error al obtener los detalles de las películas:", err);
                    ocultarCargando();
                });
        })
        .catch((err) => {
            console.error("Error al buscar las películas:", err);
            ocultarCargando();
        });
}

//Funcion para cerrar el informe
function cerrarInforme() {
    document.getElementById("ventanaInforme").style.display = "none";
    document.getElementById("overlay").style.display = "none"; 
    document.body.style.overflow = ""; 
}

//Funcion para cerrar el informe
function cerrarInforme() {
    document.getElementById("ventanaInforme").style.display = "none";
    //Restaurar el scroll en la pagina principal
    document.body.style.overflow = "";
}

//Funcion para scroll
function verificarScroll() {
    //Verificacion del final de la pagina
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        cargarPeliculas(); 
    }
}

//Funcion para mostrar los detalles de una pelicula
function detalles(imdbID) {
    mostrarCargando(); //Mostrar el GIF mientras se cargan los detalles
    fetch("https://www.omdbapi.com/?apikey=d535906&i=" + imdbID, {method: "GET"}).then((res) => res.json())
    .then((datosPelicula) => {
        let detallesDiv = document.getElementById("detalles");

        //Limpiar todo el contenido previo 
        const elementosDetalles = detallesDiv.querySelectorAll("h2, p, img, h3");
        elementosDetalles.forEach(elemento => elemento.remove());

        //Agregar el titulo de la pelicula
        let titulo = document.createElement("h2");
        titulo.textContent = datosPelicula.Title;
        detallesDiv.appendChild(titulo);

        //Agregar la fecha de estreno
        let fecha = document.createElement("p");
        fecha.textContent = "Fecha de estreno: " + datosPelicula.Released;
        detallesDiv.appendChild(fecha);

        //Agregar la duracion
        let duracion = document.createElement("p");
        duracion.textContent = "Duración: " + datosPelicula.Runtime;
        detallesDiv.appendChild(duracion);

        //Agregar el genero
        let genero = document.createElement("p");
        genero.textContent = "Género: " + datosPelicula.Genre;
        detallesDiv.appendChild(genero);

        //Agregar el director
        let director = document.createElement("p");
        director.textContent = "Director: " + datosPelicula.Director;
        detallesDiv.appendChild(director);

        //Agregar el guion
        let guion = document.createElement("p");
        guion.textContent = "Guión: " + datosPelicula.Writer;
        detallesDiv.appendChild(guion);

        //Agregar los actores
        let actores = document.createElement("p");
        actores.textContent = "Actores: " + datosPelicula.Actors;
        detallesDiv.appendChild(actores);

        //Agregar la sinopsis
        let sinopsis = document.createElement("p");
        sinopsis.textContent = "Sinopsis: " + datosPelicula.Plot;
        detallesDiv.appendChild(sinopsis);

        //Agregar el poster 
        let poster = document.createElement("img");
        poster.src = datosPelicula.Poster;
        detallesDiv.appendChild(poster);
        poster.addEventListener("error", () => {
            poster.src = "disponible.png"; 
        });

        //Mostrar las calificaciones si existen
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

        //Mostrar la ventana flotante con los detalles
        detallesDiv.style.display = "block";
        
        //Deshabilitar el scroll en la pagina principal
        document.body.style.overflow = "hidden";

        ocultarCargando(); //Ocultar el GIF después de que los detalles se hayan cargado
    })
    .catch((err) => {
        console.error("error: ", err);
        ocultarCargando(); //Ocultar el GIF si ocurre un error
    });
}

//Funcion para cerrar la ventana de detalles
document.getElementById("cerrarDetalles").addEventListener("click", () => {
    let detallesDiv = document.getElementById("detalles");
    detallesDiv.style.display = "none";  //Ocultar la ventana de detalles
    
    //Restaurar el scroll en la pagina principal
    document.body.style.overflow = "";
});