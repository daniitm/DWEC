function simularLanzamientos(numLanzamientos) {
    const frecuencias = new Array(13).fill(0); 

    for (let i = 0; i < numLanzamientos; i++) {
        const dado1 = Math.floor(Math.random() * 6) + 1; 
        const dado2 = Math.floor(Math.random() * 6) + 1; 
        const suma = dado1 + dado2;

        frecuencias[suma]++;
    }

    console.log("Resultados de las sumas de dos dados después de " + numLanzamientos + " lanzamientos:");
    for (let suma = 2; suma <= 12; suma++) {
        console.log("Suma " + suma + ": " + frecuencias[suma] + " veces");
    }
}

simularLanzamientos(36000);