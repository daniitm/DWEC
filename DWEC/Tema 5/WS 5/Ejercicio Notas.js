class Nota {
    constructor(titulo, texto, horaCreacion) {
        this.id = Date.now();
        this.titulo = titulo;
        this.texto = texto;
        this.horaCreacion = horaCreacion;
    }
}

class ModeloNotas {
    constructor() {
        this.notas = this.cargarNotas() || [];
    }

    agregarNota(titulo, texto) {
        const nuevaNota = new Nota(titulo, texto, new Date());
        this.notas.push(nuevaNota);
        this.guardarNotas();
        return nuevaNota;
    }

    eliminarNota(id) {
        this.notas = this.notas.filter(nota => nota.id !== id);
        this.guardarNotas();
    }

    actualizarNota(id, nuevoTitulo, nuevoTexto) {
        const nota = this.notas.find(nota => nota.id === id);
        if (nota) {
            nota.titulo = nuevoTitulo;
            nota.texto = nuevoTexto;
            this.guardarNotas();
        }
    }

    guardarNotas() {
        localStorage.setItem('notas', JSON.stringify(this.notas));
    }

    cargarNotas() {
        return JSON.parse(localStorage.getItem('notas'));
    }
}

class VistaNotas {
    constructor(controlador) {
        this.controlador = controlador;
        this.root = document.getElementById('app');
        this.vistaActual = 'grid'; // Por defecto, vista en cuadrícula

        this.init();
    }

    init() {
        this.renderUI();
        this.bindEvents();
    }

    renderUI() {
        this.root.innerHTML = `
            <div class="toolbar">
                <button id="nuevaNota">Nueva Nota</button>
                <button id="cambiarVista">Cambiar Vista</button>
            </div>
            <div id="notasContainer" class="${this.vistaActual}"></div>
        `;
        this.renderNotas();
    }

    renderNotas() {
        const container = document.getElementById('notasContainer');
        container.innerHTML = '';
        const notas = this.controlador.obtenerNotas();

        notas.forEach(nota => {
            const tiempoTranscurrido = this.calcularTiempoTranscurrido(nota.horaCreacion);

            const notaDiv = document.createElement('div');
            notaDiv.className = 'nota';
            notaDiv.draggable = true;
            notaDiv.dataset.id = nota.id;
            notaDiv.innerHTML = `
                <h3 contenteditable="true" class="nota-titulo">${nota.titulo}</h3>
                <p contenteditable="true" class="nota-texto">${nota.texto}</p>
                <span class="nota-tiempo">Hace ${tiempoTranscurrido} minutos</span>
                <button class="eliminar">Eliminar</button>
            `;

            this.bindNotaEvents(notaDiv);
            container.appendChild(notaDiv);
        });
    }

    calcularTiempoTranscurrido(horaCreacion) {
        const ahora = new Date();
        const minutos = Math.floor((ahora - new Date(horaCreacion)) / 60000);
        return minutos;
    }

    bindEvents() {
        document.getElementById('nuevaNota').addEventListener('click', () => {
            const titulo = prompt('Título de la nota:');
            const texto = prompt('Contenido de la nota:');
            if (titulo && texto) {
                this.controlador.crearNota(titulo, texto);
                this.renderNotas();
            }
        });

        document.getElementById('cambiarVista').addEventListener('click', () => {
            this.vistaActual = this.vistaActual === 'grid' ? 'list' : 'grid';
            document.getElementById('notasContainer').className = this.vistaActual;
        });
    }

    bindNotaEvents(notaDiv) {
        notaDiv.querySelector('.eliminar').addEventListener('click', () => {
            const id = parseInt(notaDiv.dataset.id, 10);
            this.controlador.eliminarNota(id);
            this.renderNotas();
        });

        notaDiv.querySelector('.nota-titulo').addEventListener('blur', (e) => {
            const id = parseInt(notaDiv.dataset.id, 10);
            const nuevoTitulo = e.target.textContent;
            const nuevoTexto = notaDiv.querySelector('.nota-texto').textContent;
            this.controlador.actualizarNota(id, nuevoTitulo, nuevoTexto);
        });

        notaDiv.querySelector('.nota-texto').addEventListener('blur', (e) => {
            const id = parseInt(notaDiv.dataset.id, 10);
            const nuevoTitulo = notaDiv.querySelector('.nota-titulo').textContent;
            const nuevoTexto = e.target.textContent;
            this.controlador.actualizarNota(id, nuevoTitulo, nuevoTexto);
        });

        notaDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', notaDiv.dataset.id);
        });

        notaDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        notaDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const idArrastrado = e.dataTransfer.getData('text/plain');
            const idDestino = notaDiv.dataset.id;

            if (idArrastrado !== idDestino) {
                const notas = this.controlador.intercambiarNotas(idArrastrado, idDestino);
                this.renderNotas();
            }
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

    intercambiarNotas(id1, id2) {
        const idx1 = this.modelo.notas.findIndex(nota => nota.id == id1);
        const idx2 = this.modelo.notas.findIndex(nota => nota.id == id2);
        if (idx1 > -1 && idx2 > -1) {
            [this.modelo.notas[idx1], this.modelo.notas[idx2]] = [this.modelo.notas[idx2], this.modelo.notas[idx1]];
            this.modelo.guardarNotas();
        }
        return this.modelo.notas;
    }
}

const modelo = new ModeloNotas();
const controlador = new ControladorNotas(modelo);