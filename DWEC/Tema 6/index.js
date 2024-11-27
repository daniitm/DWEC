//AJAX:

var pelicaBusqueda = "";
var paginaBuscar = 2;

window.onload = ()=>{
    document.getElementById("btn").addEventListener("click", peticionAJAXModerna);
    document.getElementById("btn1").addEventListener("click", cargarPaginas);

}

function peticionAJAX () {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        //Llega la respuesta y ademas ha encontrado lo que he pedido
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("index").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "index.txt", true);
    xhttp.send();
}

function peticionAJAXModerna() {
    let pelicaBusqueda = document.getElementById("cajaTexto").value;
    fetch("http://www.omdbapi.com/?apikey=d535906&s="+pelicaBusqueda, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        document.getElementById("numeroResultados").innerHTML = "Se han encontrado " + datosRecibidos.totalResults;

        let milista = document.getElementById("lista");
        milista.innerHTML = "";
        console.log(datosRecibidos);
        for (pelicula of datosRecibidos.Search) {
            let li = document.createElement("li");
            li.innerHTML = pelicula.Title +" - "+ pelicula.Year; 
            milista.appendChild(li);

            let img = document.createElement("img");
            img.src = pelicula.Poster;
            milista.appendChild(img);
        }
        //document.getElementById("titulo").innerHTML = "He recibido " + datosRecibidos.usuarios.length + " usuarios";
        console.log(datosRecibidos)
    })
    .catch((err) => console.error ("error: ", err));
}

function cargarPaginas () {
    fetch("http://www.omdbapi.com/?apikey=d535906&s="+pelicaBusqueda+"&page="+paginaBuscar, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) => {
        paginaBuscar++
        let milista = document.getElementById("lista");
        console.log(datosRecibidos);
        for (pelicula of datosRecibidos.Search) {
            let li = document.createElement("li");
            li.innerHTML = pelicula.Title +" - "+ pelicula.Year; 
            milista.appendChild(li);

            let img = document.createElement("img");
            img.src = pelicula.Poster;
            milista.appendChild(img);
        }
        console.log(datosRecibidos)
    })
    .catch((err) => console.error ("error: ", err));
}