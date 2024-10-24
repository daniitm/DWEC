function inicializarArray() {
    const array = new Array(10).fill(0); 
    return array;
}

function sumarUno(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] += 1;
    }
}

function mostrarArray(array) {
    console.log(array.join(' '));
}

const miArray = inicializarArray();
console.log("Array inicial:", miArray);

sumarUno(miArray);
console.log("Array después de sumar 1:", miArray);

mostrarArray(miArray);