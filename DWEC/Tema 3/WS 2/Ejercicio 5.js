function paresImpares() {
    const numerosAleatorios = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000) + 1);
    
    console.log("Contenido original:", numerosAleatorios);

    const numerosOrganizados = [...numerosAleatorios.filter(num => num % 2 === 0), ...numerosAleatorios.filter(num => num % 2 !== 0)];
    console.log("Contenido organizado (pares e impares):", numerosOrganizados);
}

paresImpares();