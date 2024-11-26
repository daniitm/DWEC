//AJAX:

window.onload = ()=>{
    document.getElementById("btn").addEventListener("click", peticionAJAX);
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

/*
window.onload = () => {
    document.getElementById("btn").addEventListener("click", peticionAJAX);
};

function peticionAJAX() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("usuarios").innerHTML = this.responseText;
            let usuarios = JSON.parse(this.responseText);
            for (usuarios of respuesta.usuarios) {
            document.getElementById("usuarios").innerHTML = respuesta.usuarios[0].titulo;
            }
        }
    };

    xhttp.open("GET", "usuarios.json", true); 
    xhttp.send();
}
*/