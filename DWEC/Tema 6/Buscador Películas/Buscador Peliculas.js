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
    paginaBuscar = 1; //Reiniciar la pagina a 1 para una nueva busqueda
    cargarPeliculas();
}

//Funcion para cargar las peliculas, al buscar o al hacer scroll
function cargarPeliculas() {
    if (cargando) return; //Evitar muchas solicitudes simultaneas
    cargando = true;

    //Obtener la categoria 
    const categoria = document.getElementById("categoria").value;
    let tipoFiltro = ""; 

    //Ajustar el filtro segun la categoría seleccionada
    if (categoria === "movie") {
        tipoFiltro = "&type=movie"; 
    } else if (categoria === "series") {
        tipoFiltro = "&type=series";
    }

    fetch(`http://www.omdbapi.com/?apikey=d535906&s=${peliculaBusqueda}&page=${paginaBuscar}${tipoFiltro}`, { method: "GET" })
    .then((res) => res.json())
    .then((datosRecibidos) => {
        if (paginaBuscar === 1) {
            //Limpiar resultados anteriores para uuna nueva busqueda
            let peliculasContainer = document.getElementById("peliculas-container");
            peliculasContainer.innerHTML = "";
        }

        //Manejar casos en que no se encuentren resultados
        if (!datosRecibidos.Search) {
            document.getElementById("numeroResultados").textContent = "No se encontraron resultados.";
            cargando = false;
            return;
        }

        //Mostrar numero de resultados
        document.getElementById("numeroResultados").textContent = `Se han encontrado: ${datosRecibidos.totalResults}`;

        let peliculasContainer = document.getElementById("peliculas-container");
        for (let pelicula of datosRecibidos.Search) {
            let div = document.createElement("div");
            div.classList.add("pelicula");
            
            //Crear la imagen con un evento error
            let img = document.createElement("img");
            img.src = pelicula.Poster;
            img.alt = pelicula.Title;
            img.addEventListener("error", () => {
                img.src = "chill.png"; //Imagen por defecto si falla la carga
            });

            //Crear el titulo
            let titulo = document.createElement("h3");
            titulo.textContent = pelicula.Title;

            //Agregar titulo e imagen al contenedor
            div.appendChild(titulo);
            div.appendChild(img);

            //Agregar evento de click para mostrar detalles
            div.addEventListener("click", () => detalles(pelicula.imdbID));

            peliculasContainer.appendChild(div);
        }
        paginaBuscar++; //Incrementar pagina para la siguiente carga
        cargando = false;
    })
    .catch((err) => {
    console.error("error: ", err);
    cargando = false;
    });
}

//Funcion para scroll
function verificarScroll() {
    //Velocidad
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 800) {
        cargarPeliculas(); 
    }
}

//Funcion para mostrar los detalles 
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

        let fecha = document.createElement("p");
        fecha.textContent = "Fecha de estreno: " + datosPelicula.Released;
        detallesDiv.appendChild(fecha);

        let duracion = document.createElement("p");
        duracion.textContent = "Duración: " + datosPelicula.Runtime;
        detallesDiv.appendChild(duracion);

        let genero = document.createElement("p");
        genero.textContent = "Género: " + datosPelicula.Genre;
        detallesDiv.appendChild(genero);

        let director = document.createElement("p");
        director.textContent = "Director: " + datosPelicula.Director;
        detallesDiv.appendChild(director);

        let guion = document.createElement("p");
        guion.textContent = "Guión: " + datosPelicula.Writer;
        detallesDiv.appendChild(guion);

        let actores = document.createElement("p");
        actores.textContent = "Actores: " + datosPelicula.Actors;
        detallesDiv.appendChild(actores);

        let sinopsis = document.createElement("p");
        sinopsis.textContent = "Sinopsis: " + datosPelicula.Plot;
        detallesDiv.appendChild(sinopsis);

        let poster = document.createElement("img");
        poster.src = datosPelicula.Poster;
        detallesDiv.appendChild(poster);

        poster.addEventListener("error", () => {
            poster.src = "chill.png"; //Imagen por defecto si falla la carga
        });

        //Mostrar la ventana flotante
        detallesDiv.style.display = "block";
    })
    .catch((err) => console.error("error: ", err));
}

//Funcion para cerrar la ventana de detalles
document.getElementById("cerrarDetalles").addEventListener("click", () => {
    let detallesDiv = document.getElementById("detalles");
    detallesDiv.style.display = "none";  //Ocultar la ventana de detalles
});

