class Nota {
    constructor(titulo, texto, x = 100, y = 100) {
        this.id = Date.now();
        this.titulo = titulo;
        this.texto = texto;
        this.horaCreacion = new Date();
        this.x = x;
        this.y = y;
    }
}

class ModeloNotas {
    constructor() {
        this.notas = JSON.parse(localStorage.getItem('notas')) || [];
    }

    guardar() {
        localStorage.setItem('notas', JSON.stringify(this.notas));
    }

    agregarNota(titulo, texto) {
        const nuevaNota = new Nota(titulo, texto);
        this.notas.push(nuevaNota);
        this.guardar();
        return nuevaNota;
    }

    eliminarNota(id) {
        this.notas = this.notas.filter(nota => nota.id !== id);
        this.guardar();
    }

    actualizarNota(id, titulo, texto) {
        const nota = this.notas.find(n => n.id === id);
        if (nota) Object.assign(nota, { titulo, texto });
        this.guardar();
    }

    actualizarPosicion(id, x, y) {
        const nota = this.notas.find(n => n.id === id);
        if (nota) Object.assign(nota, { x, y });
        this.guardar();
    }
}

class VistaNotas {
    constructor(controlador) {
        this.controlador = controlador;
        this.toolbar = document.querySelector('.toolbar');
        this.container = document.getElementById('notasContainer');
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderNotas();
    }

    renderNotas() {
        this.container.innerHTML = '';
        this.controlador.obtenerNotas().forEach(nota => {
            const notaDiv = this.crearNotaElemento(nota);
            this.container.appendChild(notaDiv);
        });
    }

    crearNotaElemento(nota) {
        const notaDiv = document.createElement('div');
        notaDiv.className = 'nota';
        notaDiv.draggable = true;
        notaDiv.dataset.id = nota.id;
        notaDiv.style.left = `${nota.x}px`;
        notaDiv.style.top = `${nota.y}px`;

        notaDiv.innerHTML = `
            <h3 contenteditable="true" class="nota-titulo">${nota.titulo}</h3>
            <p contenteditable="true" class="nota-texto">${nota.texto}</p>
            <button class="eliminar">X</button>
        `;

        this.bindNotaEvents(notaDiv);
        return notaDiv;
    }

    bindEvents() {
        const nuevaNotaBtn = document.getElementById('nuevaNota');
        nuevaNotaBtn.addEventListener('click', () => {
            const titulo = prompt('Título:');
            const texto = prompt('Contenido:');
            if (titulo && texto) {
                this.controlador.crearNota(titulo, texto);
                this.renderNotas();
            }
        });
    }

    bindNotaEvents(notaDiv) {
        const id = parseInt(notaDiv.dataset.id, 10);

        notaDiv.querySelector('.eliminar').addEventListener('click', () => {
            this.controlador.eliminarNota(id);
            this.renderNotas();
        });

        const actualizarNota = () => {
            const titulo = notaDiv.querySelector('.nota-titulo').textContent;
            const texto = notaDiv.querySelector('.nota-texto').textContent;
            this.controlador.actualizarNota(id, titulo, texto);
        };

        notaDiv.querySelector('.nota-titulo').addEventListener('blur', actualizarNota);
        notaDiv.querySelector('.nota-texto').addEventListener('blur', actualizarNota);

        let offsetX = 0, offsetY = 0;

        notaDiv.addEventListener('dragstart', e => {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        });

        notaDiv.addEventListener('dragend', e => {
            const x = e.pageX - offsetX;
            const y = e.pageY - offsetY;
            this.controlador.actualizarPosicion(id, x, y);
            this.renderNotas();
        });
    }
}

class ControladorNotas {
    constructor(modelo) {
        this.modelo = modelo;
        this.vista = new VistaNotas(this);
    }

    obtenerNotas() {
        return this.modelo.notas;
    }

    crearNota(titulo, texto) {
        return this.modelo.agregarNota(titulo, texto);
    }

    eliminarNota(id) {
        this.modelo.eliminarNota(id);
    }

    actualizarNota(id, titulo, texto) {
        this.modelo.actualizarNota(id, titulo, texto);
    }

    actualizarPosicion(id, x, y) {
        this.modelo.actualizarPosicion(id, x, y);
    }
}

new ControladorNotas(new ModeloNotas());