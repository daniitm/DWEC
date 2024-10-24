function lanzamiento() {
    return Math.floor(Math.random() * 6) + 1;
}

function simularTiradas() {
    const ocurrencias = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 6000; i++) {
        const resultado = lanzamiento();
        ocurrencias[resultado - 1]++;
    }

    mostrarResultados(ocurrencias);
}
