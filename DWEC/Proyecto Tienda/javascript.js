let cargando = false;
let pagina = 1; // Página inicial
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let categoriaSeleccionada = null; // Almacena la categoría actualmente seleccionada
let productosCargados = 0; // Número de productos ya cargados de la categoría

// Inicialización
window.onload = () => {
  cargarCategorias(); // Cargar las categorías
  document.getElementById("cerrarDetalles").addEventListener("click", cerrarDetalles);
  actualizarCarrito(); // Actualizar la interfaz del carrito
  document.getElementById("btnCarrito").addEventListener("click", mostrarCarrito);
  document.getElementById("cerrarCarrito").addEventListener("click", cerrarCarrito);
  document.getElementById("realizarPedido").addEventListener("click", realizarPedido);
  configurarScrollInfinito(); // Configuración del scroll infinito
};

// Mostrar y ocultar GIF de carga
function mostrarCargando() {
  document.getElementById("loading").style.display = "flex";
}

function ocultarCargando() {
  document.getElementById("loading").style.display = "none";
}

// Configurar scroll infinito
function configurarScrollInfinito() {
  window.addEventListener('scroll', () => {
    // Verifica si el usuario está cerca del final de la página
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      // El usuario está cerca del final, cargamos más productos
      if (!cargando && productosCargados > 0) {
        cargarMasProductos();
      }
    }
  });
}


// Mostrar productos en el DOM
function mostrarProductos(datosRecibidos) {
  let productosContainer = document.getElementById("productos-container");

  // Añadir productos al contenedor
  datosRecibidos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");

    // Mostrar solo la primera imagen del array
    let img = document.createElement("img");
    if (producto.images && producto.images.length > 0) {
      img.src = producto.images[0]; // Usa solo la primera imagen
    } else {
      img.src = "img/nofoto.png"; // Imagen por defecto si no hay imágenes
    }
    img.alt = producto.title;
    img.addEventListener("error", () => {
      img.src = "img/nofoto.png";
    }); // Imagen de reemplazo en caso de error

    let titulo = document.createElement("h3");
    titulo.textContent = producto.title;

    let precio = document.createElement("p");
    precio.textContent = `${producto.price} €`;

    div.appendChild(img);
    div.appendChild(titulo);
    div.appendChild(precio);

    div.addEventListener("click", () => detallesProducto(producto.id));

    productosContainer.appendChild(div);
  });
}

function detallesProducto(productId) {
  mostrarCargando(); // Mostrar el GIF mientras se cargan los detalles
  fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
    .then((res) => res.json())
    .then((producto) => {
      let detallesDiv = document.getElementById("detalles");
      let fondoOscuro = document.getElementById("fondoOscuro");

      // Limpiar todo el contenido previo
      detallesDiv.innerHTML = "";

      // Agregar el título del producto
      let titulo = document.createElement("h2");
      titulo.textContent = producto.title;
      detallesDiv.appendChild(titulo);

      // Agregar la descripción
      let descripcion = document.createElement("p");
      descripcion.textContent = producto.description;
      detallesDiv.appendChild(descripcion);

      // Agregar la imagen
      let imagen = document.createElement("img");
      imagen.src = producto.images[0] || "img/nofoto.png"; // Imagen por defecto si no hay imágenes
      detallesDiv.appendChild(imagen);
      imagen.addEventListener("error", () => {
        imagen.src = "img/nofoto.png";
      });

      // Agregar el precio
      let precio = document.createElement("p");
      precio.textContent = "Precio: " + producto.price + " €";
      detallesDiv.appendChild(precio);

      // Agregar el botón para agregar al carrito
      let botonAgregar = document.createElement("button");
      botonAgregar.textContent = "Agregar al carrito";
      botonAgregar.onclick = () => agregarAlCarrito(producto.id, producto.title, producto.price);
      detallesDiv.appendChild(botonAgregar);

      // Agregar el botón de cerrar
      let botonCerrar = document.createElement("button");
      botonCerrar.id = "cerrarDetalles";
      botonCerrar.textContent = "Cerrar";
      botonCerrar.onclick = cerrarDetalles;
      detallesDiv.appendChild(botonCerrar);

      // Mostrar la ventana flotante con los detalles
      detallesDiv.style.display = "block";

      // Mostrar el fondo oscuro
      fondoOscuro.style.display = "block";

      // Deshabilitar el scroll en la página principal
      document.body.style.overflow = "hidden";

      ocultarCargando();
    })
    .catch((err) => {
      console.error("Error al obtener los detalles:", err);
      ocultarCargando();
    });
}

// Función para cerrar la ventana de detalles
function cerrarDetalles() {
  let detallesDiv = document.getElementById("detalles");
  let fondoOscuro = document.getElementById("fondoOscuro");

  detallesDiv.style.display = "none"; // Ocultar la ventana de detalles

  fondoOscuro.style.display = "none";

  // Restaurar el scroll en la página principal
  document.body.style.overflow = "";
}

// Configurar el clic en el fondo oscuro para cerrar detalles
document.getElementById("fondoOscuro").addEventListener("click", cerrarDetalles);

// Cargar categorías
function cargarCategorias() {
  const url = `https://api.escuelajs.co/api/v1/categories`;

  fetch(url)
    .then((res) => res.json())
    .then((categorias) => mostrarCategorias(categorias.slice(0, 5))) // Limitar a las primeras 5 categorías
    .catch((err) => console.error("Error al cargar categorías:", err));
}

function mostrarCategorias(categorias) {
  let categoriasContainer = document.getElementById("categorias-container");

  categorias.forEach((categoria) => {
    let div = document.createElement("div");
    div.classList.add("categoria");

    let img = document.createElement("img");
    img.src = categoria.image || "img/nofoto.png";
    img.alt = categoria.name;

    let nombre = document.createElement("p");
    nombre.textContent = categoria.name;

    div.appendChild(img);
    div.appendChild(nombre);

    div.addEventListener("click", () => cargarProductosPorCategoria(categoria.id));

    categoriasContainer.appendChild(div);
  });
}

// Cargar productos por categoría
function cargarProductosPorCategoria(categoriaId) {
  if (cargando) return;
  cargando = true;
  mostrarCargando();

  categoriaSeleccionada = categoriaId; // Guardamos la categoría seleccionada
  productosCargados = 0; // Reseteamos los productos cargados

  // Ocultar la imagen de inicio y la sección de categorías
  document.getElementById("inicio").style.display = "none";
  document.getElementById("categorias").style.display = "none";

  // Hacer visible la sección de productos
  document.getElementById("productos").style.display = "block";

  // Cargar los primeros 10 productos de la categoría seleccionada
  cargarMasProductosDeCategoria(categoriaId, 0); // 0 es el offset inicial
}

// Función para cargar más productos de una categoría con paginación
function cargarMasProductosDeCategoria(categoriaId, offset) {
  const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoriaId}&offset=${offset}&limit=10`;

  fetch(url)
    .then((res) => res.json())
    .then((datosRecibidos) => {
      let productosContainer = document.getElementById("productos-container");
      if (!datosRecibidos.length) {
        cargando = false;
        ocultarCargando();
        return;
      }

      // Mostrar los productos recibidos
      mostrarProductos(datosRecibidos);
      productosCargados += datosRecibidos.length;

      cargando = false;
      ocultarCargando();
    })
    .catch((err) => {
      console.error("Error al cargar productos por categoría:", err);
      cargando = false;
      ocultarCargando();
    });
}

// Cargar más productos
function cargarMasProductos() {
  if (cargando || !categoriaSeleccionada) return;  // Verificar si estamos cargando o no hay categoría seleccionada
  cargando = true;
  mostrarCargando();
  
  // Calculamos el offset en base a los productos ya cargados
  const offset = productosCargados;

  // URL de la API para cargar productos de la categoría seleccionada
  const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoriaSeleccionada}&offset=${offset}&limit=10`;

  fetch(url)
    .then((res) => res.json())
    .then((datosRecibidos) => {
      if (datosRecibidos.length === 0) {
        // No hay más productos, dejamos de cargar
        cargando = false;
        ocultarCargando();
        return;
      }

      // Mostrar los productos cargados
      mostrarProductos(datosRecibidos);
      productosCargados += datosRecibidos.length; // Actualizamos la cantidad de productos cargados

      // Si la respuesta tiene menos de 10 productos, significa que ya no hay más para cargar
      if (datosRecibidos.length < 10) {
        // Aquí puedes deshabilitar el scroll infinito o mostrar un mensaje de "No hay más productos"
      }

      cargando = false;
      ocultarCargando();
    })
    .catch((err) => {
      console.error("Error al cargar productos:", err);
      cargando = false;
      ocultarCargando();
    });
}

// Mostrar más productos cuando el usuario haga clic en el botón "Ver más"
document.getElementById("verMas").addEventListener("click", () => {
  if (!categoriaSeleccionada) return;

  // Cargar más productos de la categoría seleccionada
  cargarMasProductosDeCategoria(categoriaSeleccionada, productosCargados);
  document.getElementById("verMas").style.display = "none"; // Ocultar el botón mientras cargan más productos
});

































// Actualizar del carrito
function actualizarCarrito() {
  const btnCarrito = document.getElementById("btnCarrito");
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  btnCarrito.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> (${totalProductos})`;

  if (carrito.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    localStorage.removeItem("carrito");
  }
}

// Agregar al carrito
function agregarAlCarrito(id, titulo, precio) {
  const productoEnCarrito = carrito.find((item) => item.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ id, titulo, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

// Mostrar el carrito
function mostrarCarrito() {
  const ventanaCarrito = document.getElementById("ventanaCarrito");
  const listadoCarrito = document.getElementById("listadoCarrito");
  const carritoTotal = document.getElementById("carritoTotal");
  const fondoOscuro = document.getElementById("fondoOscuro");

  listadoCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.titulo} - ${item.precio} € x ${item.cantidad}
      <button onclick="modificarCantidad(${index}, -1)">-</button>
      <button onclick="modificarCantidad(${index}, 1)">+</button>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;

    listadoCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  carritoTotal.innerText = total.toFixed(2); // Mostrar total
  ventanaCarrito.style.display = "block";
  fondoOscuro.style.display = "block";

  // Deshabilitar el scroll en la página principal
  document.body.style.overflow = "hidden";
}

// Cerrar el carrito
function cerrarCarrito() {
  const ventanaCarrito = document.getElementById("ventanaCarrito");
  const fondoOscuro = document.getElementById("fondoOscuro");

  // Restaurar el scroll en la página principal
  document.body.style.overflow = "";

  ventanaCarrito.style.display = "none";
  fondoOscuro.style.display = "none"; // Ocultar fondo oscuro
}

// Modificar cantidad de un producto
function modificarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1); // Eliminar si la cantidad llega a 0
  }

  actualizarCarrito();
  mostrarCarrito();
}

// Eliminar un producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  mostrarCarrito();
}

// Realizar pedido
function realizarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Añade productos antes de realizar un pedido.");
    return; // Salir de la función si el carrito está vacío
  }

  carrito = [];
  actualizarCarrito();
  cerrarCarrito();

  // Mostrar el mensaje de éxito
  const mensajePedido = document.getElementById("mensajePedido");
  mensajePedido.style.display = "block"; // Mostrar el mensaje

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajePedido.style.display = "none";
  }, 3000); // El mensaje se oculta después de 3 segundos
}


























