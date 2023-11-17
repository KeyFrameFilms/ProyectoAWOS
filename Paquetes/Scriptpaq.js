

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona los elementos del DOM necesarios
    const contenedorProd = document.querySelector('.contenedor-productos');
    const tbodyCarrito = document.getElementById('carrito-body');
    const tfootCarrito = document.getElementById('footer');
    const botonVaciar = document.getElementById('vaciar-tabla');

    // Objeto que almacenará los productos en el carrito
    let carrito = {};

    // Selecciona los templates para la tabla del carrito y el footer
    const templateTabla = document.getElementById('agregar-producto-al-carro').content;
    const templateFoot = document.getElementById('tfooter').content;

    // Escucha el clic en el contenedor de productos
    contenedorProd.addEventListener('click', e => {
        if (e.target.classList.contains('boton')) {
            agregarAlCarrito(e.target.parentElement.parentElement);
        }
    });

    // Escucha el clic en la tabla del carrito para aumentar o disminuir la cantidad
    tbodyCarrito.addEventListener('click', e => {
        if (e.target.classList.contains('button')) {
            aumentarDisminuirCantidad(e.target);
        }
    });


    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        const nombre = producto.querySelector('.div-info .nombre-prod').textContent;
        const precio = producto.querySelector('.div-precio-boton .precio').textContent;

        if (carrito[nombre]) {
            carrito[nombre].cantidad++;
        } else {
            carrito[nombre] = {
                cantidad: 1,
                precio: parseFloat(precio)
            };
        }

        // Actualiza la vista del carrito
        actualizarCarrito();
    }

    // Función para aumentar o disminuir la cantidad de un producto en el carrito
    function aumentarDisminuirCantidad(boton) {
        const row = boton.parentElement.parentElement;
        const nombre = row.querySelector('#producto').textContent;

        if (boton.textContent === '+') {
            carrito[nombre].cantidad++;
        } else if (boton.textContent === '-') {
            if (carrito[nombre].cantidad > 1) {
                carrito[nombre].cantidad--;
            } else {
                delete carrito[nombre];
            }
        }

        // Actualiza la vista del carrito
        actualizarCarrito();
    }


    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        // Limpia la tabla del carrito
        tbodyCarrito.innerHTML = '';

        // Llena la tabla con los elementos del carrito
        Object.keys(carrito).forEach(nombre => {
            const producto = carrito[nombre];
            const cloneTabla = templateTabla.cloneNode(true);

            // Llena los datos del producto en la tabla
            cloneTabla.getElementById('producto').textContent = nombre;
            cloneTabla.getElementById('cant').textContent = producto.cantidad;
            cloneTabla.getElementById('precio-uni').textContent = producto.precio.toFixed(2);
            cloneTabla.getElementById('precio-total-prod').textContent = (producto.precio * producto.cantidad).toFixed(2);

            tbodyCarrito.appendChild(cloneTabla);
        });

        // Actualiza el footer del carrito
        actualizarFooterCarrito();
    }
    
    // Función para actualizar el footer del carrito
function actualizarFooterCarrito() {
    // Limpia el footer del carrito
    tfootCarrito.innerHTML = '';

    // Calcula el precio total del carrito
    let total = 0;
    Object.keys(carrito).forEach(nombre => {
        total += carrito[nombre].precio * carrito[nombre].cantidad;
    });

    // Llena el template del footer con el precio total, el botón de pagar y el botón de vaciar carrito
    const cloneFooter = templateFoot.cloneNode(true);
    cloneFooter.getElementById('total-a-pagar').textContent = total.toFixed(2);
    
    // Crea el botón de "Pagar" y agrega el evento de clic
    const botonPagar = document.createElement('button');
    botonPagar.textContent = 'Pagar';
    botonPagar.classList.add('button', 'pagar-button');
    botonPagar.addEventListener('click', () => {
        if (total === 0) {
        alert('No tienes nada en el carrito. No es posible hacer un pago.');
    } else {
        // Redirección a la página de pago
        const urlPago = '/Pago/pago.php';
        
        // Mostrar un mensaje de confirmación antes de redirigir
        if (confirm('¿Deseas proceder al proceso de pago?')) {
            window.location.href = urlPago;
        }
    }
    });
    
    function mostrarMensajeCarritoVacio() {
    tbodyCarrito.innerHTML = '';
    
    const filaMensaje = document.createElement('tr');
    const celdaMensaje = document.createElement('td');
    
    celdaMensaje.textContent = '¡No hay ningún elemento en el carrito!';
    celdaMensaje.setAttribute('colspan', '4');
    filaMensaje.appendChild(celdaMensaje);
    
    tbodyCarrito.appendChild(filaMensaje);
}

function vaciarCarrito() {
    carrito = {};

    // Actualiza la vista del carrito y muestra el mensaje de carrito vacío
    actualizarCarrito();
    mostrarMensajeCarritoVacio();
}

    // Crea el botón de "Vaciar carrito" y agrega el evento de clic
    const botonVaciar = document.createElement('button');
    botonVaciar.textContent = 'Vaciar carrito';
    botonVaciar.classList.add('button', 'vaciar-button');
    botonVaciar.addEventListener('click', () => {
        // Vaciar el carrito
        // Mostrar un mensaje de confirmación antes de redirigir
        if (confirm('¿Deseas vaciar el carrito?')) {
            vaciarCarrito();
        }
    });

    // Agrega los botones al footer
    const footerBotonesContainer = cloneFooter.querySelector('.border-bottom-left');
    footerBotonesContainer.appendChild(botonPagar);
    footerBotonesContainer.appendChild(botonVaciar);

    // Agrega el footer al DOM
    tfootCarrito.appendChild(cloneFooter);
}

});






