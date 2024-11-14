function setCookie(nombre, valor, minutos) {
    const d = new Date();
    d.setTime(d.getTime() + (minutos * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${nombre}=${encodeURIComponent(valor)};${expires};path=/`;
}

function getCookie(nombre) {
    const name = nombre + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(nombre) {
    document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

function checkUser() {
    const usuario = getCookie("nombreUsuario");
    const mensajeDiv = document.getElementById("mensaje");
    const logoutBtn = document.getElementById("logoutBtn");

    if (usuario !== "") {
        mensajeDiv.textContent = `Hola, ${usuario}! Bienvenido de nuevo.`;
        logoutBtn.style.display = "inline";
    } else {
        const nombre = prompt("¿Cuál es tu nombre?");
        if (nombre) {
            setCookie("nombreUsuario", nombre, 2);
            mensajeDiv.textContent = `Hola, ${nombre}! Bienvenido.`;
            logoutBtn.style.display = "inline";
        } else {
            mensajeDiv.textContent = "No se ingresó ningún nombre.";
        }
    }
}

function logout() {
    deleteCookie("nombreUsuario");
    location.reload(); 
}

document.getElementById("logoutBtn").addEventListener("click", logout);

checkUser();