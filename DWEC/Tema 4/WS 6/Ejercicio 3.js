function setCookie(nombre, valor, minutos) {
    let cookieString = `${nombre}=${encodeURIComponent(valor)};path=/`;
    if (minutos) {
        const d = new Date();
        d.setTime(d.getTime() + (minutos * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        cookieString += `;${expires}`;
    }
    document.cookie = cookieString;
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

function applyUserSettings() {
    const pagina = document.getElementById("pagina");
    const mensajeDiv = document.getElementById("mensaje");

    const colorFondo = getCookie("colorFondo");
    const colorTexto = getCookie("colorTexto");
    const tamanoTexto = getCookie("tamanoTexto");

    if (colorFondo) pagina.style.backgroundColor = colorFondo;
    if (colorTexto) mensajeDiv.style.color = colorTexto;
    if (tamanoTexto) mensajeDiv.style.fontSize = tamanoTexto + "px";
}

function checkUser() {
    const usuario = getCookie("nombreUsuario");
    const mensajeDiv = document.getElementById("mensaje");
    const logoutBtn = document.getElementById("logoutBtn");

    if (usuario !== "") {
        mensajeDiv.textContent = `Hola, ${usuario}! Bienvenido de nuevo.`;
        logoutBtn.style.display = "inline";
        applyUserSettings();
    } else {
        const nombre = prompt("¿Cuál es tu nombre?");
        if (nombre) {
            setCookie("nombreUsuario", nombre);
            mensajeDiv.textContent = `Hola, ${nombre}! Bienvenido.`;
            logoutBtn.style.display = "inline";
        } else {
            mensajeDiv.textContent = "No se ingresó ningún nombre.";
        }
    }
}

function saveUserSettings() {
    const colorFondo = document.getElementById("colorFondo").value;
    const colorTexto = document.getElementById("colorTexto").value;
    const tamanoTexto = document.getElementById("tamanoTexto").value;

    setCookie("colorFondo", colorFondo, 2);
    setCookie("colorTexto", colorTexto, 2);
    setCookie("tamanoTexto", tamanoTexto, 2);

    applyUserSettings();
}

function logout() {
    deleteCookie("nombreUsuario");
    deleteCookie("colorFondo");
    deleteCookie("colorTexto");
    deleteCookie("tamanoTexto");
    location.reload(); 
}

document.getElementById("guardarBtn").addEventListener("click", saveUserSettings);

document.getElementById("logoutBtn").addEventListener("click", logout);

checkUser();