let cargando = false;
let pagina = 1; 
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let categoriaSeleccionada = null; 
let productosCargados = 0; 

//Inicializacion
window.onload = () => {
  cargarCategorias(); 
  document.getElementById("cerrarDetalles").addEventListener("click", cerrarDetalles);
  actualizarCarrito(); 
  document.getElementById("btnCarrito").addEventListener("click", mostrarCarrito);
  document.getElementById("cerrarCarrito").addEventListener("click", cerrarCarrito);
  document.getElementById("realizarPedido").addEventListener("click", realizarPedido);
  configurarScrollInfinito(); 
};

//Mostrar y ocultar GIF de carga
function mostrarCargando() {
  document.getElementById("loading").style.display = "flex";
}

function ocultarCargando() {
  document.getElementById("loading").style.display = "none";
}

//Configurar scroll infinito
function configurarScrollInfinito() {
  window.addEventListener('scroll', () => {
    //Verifica si el usuario esta cerca del final de la pagina
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      if (!cargando && productosCargados > 0) {
        cargarMasProductos();
      }
    }
  });
}


//Mostrar productos en el DOM
function mostrarProductos(datosRecibidos) {
  let productosContainer = document.getElementById("productos-container");

  datosRecibidos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");

    //Mostrar solo la primera imagen del array
    let img = document.createElement("img");
    if (producto.images && producto.images.length > 0) {
      img.src = producto.images[0]; 
    } else {
      img.src = "img/nofoto.png"; 
    }
    img.alt = producto.title;
    img.addEventListener("error", () => {
      img.src = "img/nofoto.png";
    });

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
  mostrarCargando(); 
  fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
    .then((res) => res.json())
    .then((producto) => {
      let detallesDiv = document.getElementById("detalles");
      let fondoOscuro = document.getElementById("fondoOscuro");

      detallesDiv.innerHTML = "";

      let titulo = document.createElement("h2");
      titulo.textContent = producto.title;
      detallesDiv.appendChild(titulo);

      let descripcion = document.createElement("p");
      descripcion.textContent = producto.description;
      detallesDiv.appendChild(descripcion);

      let imagen = document.createElement("img");
      imagen.src = producto.images[0] || "img/nofoto.png"; 
      detallesDiv.appendChild(imagen);
      imagen.addEventListener("error", () => {
        imagen.src = "img/nofoto.png";
      });

      let precio = document.createElement("p");
      precio.textContent = "Precio: " + producto.price + " €";
      detallesDiv.appendChild(precio);

      let botonAgregar = document.createElement("button");
      botonAgregar.textContent = "Agregar al carrito";
      botonAgregar.onclick = () => agregarAlCarrito(producto.id, producto.title, producto.price);
      detallesDiv.appendChild(botonAgregar);

      let botonCerrar = document.createElement("button");
      botonCerrar.id = "cerrarDetalles";
      botonCerrar.textContent = "Cerrar";
      botonCerrar.onclick = cerrarDetalles;
      detallesDiv.appendChild(botonCerrar);

      detallesDiv.style.display = "block";

      fondoOscuro.style.display = "block";

      document.body.style.overflow = "hidden";

      ocultarCargando();
    })
    .catch((err) => {
      console.error("Error al obtener los detalles:", err);
      ocultarCargando();
    });
}

//Funcion para cerrar la ventana de detalles
function cerrarDetalles() {
  let detallesDiv = document.getElementById("detalles");
  let fondoOscuro = document.getElementById("fondoOscuro");
  detallesDiv.style.display = "none"; 
  fondoOscuro.style.display = "none";
  document.body.style.overflow = "";
}

//Configurar el clic en el fondo oscuro para cerrar detalles
document.getElementById("fondoOscuro").addEventListener("click", cerrarDetalles);

//Cargar categorias
function cargarCategorias() {
  const url = `https://api.escuelajs.co/api/v1/categories`;

  fetch(url)
    .then((res) => res.json())
    .then((categorias) => mostrarCategorias(categorias.slice(0, 5))) 
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

//Cargar productos por categoria
function cargarProductosPorCategoria(categoriaId) {
  if (cargando) return;
  cargando = true;
  mostrarCargando();

  categoriaSeleccionada = categoriaId; 
  productosCargados = 0;

  document.getElementById("inicio").style.display = "none";
  document.getElementById("categorias").style.display = "none";
  document.getElementById("productos").style.display = "block";

  cargarMasProductosDeCategoria(categoriaId, 0); 
}

//Funcion para cargar mas productos de una categoria con paginacion
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

      //Mostrar los productos recibidos
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

//Cargar mas productos
function cargarMasProductos() {
  if (cargando || !categoriaSeleccionada) return;  
  cargando = true;
  mostrarCargando();
  
  const offset = productosCargados;

  //URL de la API para cargar productos de la categoria seleccionada
  const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoriaSeleccionada}&offset=${offset}&limit=10`;

  fetch(url)
    .then((res) => res.json())
    .then((datosRecibidos) => {
      if (datosRecibidos.length === 0) {
        cargando = false;
        ocultarCargando();
        return;
      }

      mostrarProductos(datosRecibidos);
      productosCargados += datosRecibidos.length; 
  
      cargando = false;
      ocultarCargando();
    })
    .catch((err) => {
      console.error("Error al cargar productos:", err);
      cargando = false;
      ocultarCargando();
    });
}

//Mostrar más productos cuando el usuario haga clic en el boton ver mas
document.getElementById("verMas").addEventListener("click", () => {
  if (!categoriaSeleccionada) return;

  cargarMasProductosDeCategoria(categoriaSeleccionada, productosCargados);
  document.getElementById("verMas").style.display = "none"; 
});

//Actualizar del carrito
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

//Agregar al carrito
function agregarAlCarrito(id, titulo, precio) {
  const productoEnCarrito = carrito.find((item) => item.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ id, titulo, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

//Mostrar el carrito
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

  carritoTotal.innerText = total.toFixed(2); 
  ventanaCarrito.style.display = "block";
  fondoOscuro.style.display = "block";

  document.body.style.overflow = "hidden";
}

//Cerrar el carrito
function cerrarCarrito() {
  const ventanaCarrito = document.getElementById("ventanaCarrito");
  const fondoOscuro = document.getElementById("fondoOscuro");

  document.body.style.overflow = "";

  ventanaCarrito.style.display = "none";
  fondoOscuro.style.display = "none"; 
}

//Configurar el clic en el fondo oscuro para cerrar carrito
document.getElementById("fondoOscuro").addEventListener("click", cerrarCarrito);

//Modificar cantidad de un producto
function modificarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1); 
  }

  actualizarCarrito();
  mostrarCarrito();
}

//Eliminar un producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  mostrarCarrito();
}

//Realizar pedido
function realizarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Añade productos antes de realizar un pedido.");
    return; 
  }

  carrito = [];
  actualizarCarrito();
  cerrarCarrito();

  //Mostrar el mensaje 
  const mensajePedido = document.getElementById("mensajePedido");
  mensajePedido.style.display = "block"; 

  //Ocultar el mensaje después de 3 segundos
  setTimeout(() => {mensajePedido.style.display = "none";}, 3000); 
}


























