//AJAX:

var peliculaBusqueda = "";
var paginaBuscar = 2;

window.onload = ()=>{
    document.getElementById("btn").addEventListener("click", peticionAJAXModerna);
    document.getElementById("btn1").addEventListener("click", cargarPaginas);
}

function peticionAJAX () {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("index").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "index.txt", true);
    xhttp.send();
}

function peticionAJAXModerna() {
    peliculaBusqueda = document.getElementById("cajaTexto").value;
    fetch("http://www.omdbapi.com/?apikey=d535906&s=" + peliculaBusqueda, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults;
        let milista = document.getElementById("lista");
        milista.innerHTML = "";
        console.log(datosRecibidos);
        for (let pelicula of datosRecibidos.Search) { 
            let li = document.createElement("li");
            li.innerHTML = pelicula.Title + " - " + pelicula.Year; 
            li.addEventListener("click", () => detalles(pelicula.imdbID)); 
            milista.appendChild(li);

            let img = document.createElement("img");
            img.src = pelicula.Poster;
            img.addEventListener("click", () => detalles(pelicula.imdbID)); 
            milista.appendChild(img);
        }

        console.log(datosRecibidos);
    })
    .catch((err) => console.error("error: ", err));
}

function cargarPaginas () {
    fetch("http://www.omdbapi.com/?apikey=d535906&s=" + peliculaBusqueda + "&page=" + paginaBuscar, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        paginaBuscar++; 
        let milista = document.getElementById("lista");
        console.log(datosRecibidos);

        for (let pelicula of datosRecibidos.Search) { 
            let li = document.createElement("li");
            li.innerHTML = pelicula.Title + " - " + pelicula.Year; 
            li.addEventListener("click", () => detalles(pelicula.imdbID)); 
            milista.appendChild(li);

            let img = document.createElement("img");
            img.src = pelicula.Poster;
            img.addEventListener("click", () => detalles(pelicula.imdbID)); 
            milista.appendChild(img);
        }

        console.log(datosRecibidos);
    })
    .catch((err) => console.error("error: ", err));
}

function detalles(imdbID) {
    fetch("http://www.omdbapi.com/?apikey=d535906&i="+imdbID, {method: "GET"})
    .then((res) => res.json())
    .then((datosPelicula) => {
        let detallesDiv = document.getElementById("detalles");
        detallesDiv.innerHTML = ""; //Limpia los detalles previos

        let titulo = document.createElement("h2");
        titulo.textContent = datosPelicula.Title;
        detallesDiv.appendChild(titulo);

        let anio = document.createElement("p");
        anio.textContent = "Year: " + datosPelicula.Year;
        detallesDiv.appendChild(anio);

        let director = document.createElement("p");
        director.textContent = "Director: " + datosPelicula.Director;
        detallesDiv.appendChild(director);

        let actores = document.createElement("p");
        actores.textContent = "Actors: " + datosPelicula.Actors;
        detallesDiv.appendChild(actores);

        let sinopsis = document.createElement("p");
        sinopsis.textContent = "Synopsis: " + datosPelicula.Plot;
        detallesDiv.appendChild(sinopsis);

        let poster = document.createElement("img");
        poster.src = datosPelicula.Poster;
        detallesDiv.appendChild(poster);
    })
    .catch((err) => console.error("error: ", err));
}