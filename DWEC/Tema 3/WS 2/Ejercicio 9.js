function simularLanzamientos(numLanzamientos) {
    const frecuencias = new Array(13).fill(0); 
    const combinaciones = Array.from({ length: 7 }, () => new Array(7).fill(0));

    for (let i = 0; i < numLanzamientos; i++) {
        const dado1 = Math.floor(Math.random() * 6) + 1;
        const dado2 = Math.floor(Math.random() * 6) + 1;

        const suma = dado1 + dado2;

        frecuencias[suma]++;
        combinaciones[dado1][dado2]++;
    }

    console.log("Resultados de las sumas de dos dados después de " + numLanzamientos + " lanzamientos:");
    for (let suma = 2; suma <= 12; suma++) {
        console.log("Suma " + suma + ": " + frecuencias[suma] + " veces");
    }

    console.log("\nTabla de combinaciones de los dados:");
    console.log("     1   2   3   4   5   6"); 
    console.log("     _   _   _   _   _   _");
    for (let i = 1; i <= 6; i++) {
        let fila = `${i} | `;
        for (let j = 1; j <= 6; j++) {
            fila += `${combinaciones[i][j]} `; 
        }
        console.log(fila); 
    }
}

simularLanzamientos(36000);











