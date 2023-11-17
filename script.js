gsap.to("#bg", {
  scrollTrigger: {
    scrub: 1
  },
  scale: 2.5
})
gsap.to("#logo", {
  scrollTrigger: {
    scrub: 1
  },
  scale: 0.5
})

gsap.to("#text", {
  scrollTrigger: {
    scrub: 1
  },
  y: 900
})

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.navbar');

// Función para abrir o cerrar el menú al hacer clic en el botón de hamburguesa
function toggleMenu(event) {
  event.stopPropagation(); // Detener la propagación del evento de clic
  hamburger.classList.toggle('isactive');
  if (menu.classList.contains('active')) {
    // Si el menú está activo, lo cerramos
    menu.classList.add('closing');
    setTimeout(() => {
      menu.classList.remove('active', 'closing'); // Removemos las clases 'active' y 'closing' después de la animación
      menu.style.display = "none";
    }, 400); // Esperamos 400ms para asegurarnos de que la animación termine
  } else {
    // Si el menú no está activo, lo abrimos
    menu.style.display = "block";
    menu.classList.add('active');
  }
}

// Agregar evento de clic al botón de hamburguesa
hamburger.addEventListener('click', toggleMenu);

// Función para cerrar el menú al hacer clic en un enlace del navbar
function closeMenuAndScroll(event) {
  event.stopPropagation(); // Detener la propagación del evento de clic

  // Cerrar el menú si está abierto
  if (menu.classList.contains('active')) {
    menu.classList.add('closing');
    setTimeout(() => {
      menu.classList.remove('active', 'closing');
      menu.style.display = "none";
    }, 400);
  }

  // Obtener el elemento ancla (destino del enlace)
  const anchor = event.target.closest('a');
  if (anchor) {
    const href = anchor.getAttribute('href');

    // Realizar el scroll suave hasta el destino del enlace
    smoothScroll(href);
  }
}

// Agregar evento de clic a los enlaces del navbar
const navbarLinks = document.querySelectorAll('.navbar li a');
navbarLinks.forEach(link => {
  link.addEventListener('click', closeMenuAndScroll);
});


// Agregar evento de clic al documento (body)
document.addEventListener('click', function (event) {
  // Si el clic ocurrió fuera del menú y el menú está abierto, cerramos el menú
  if (!menu.contains(event.target) && menu.classList.contains('active')) {
    toggleMenu(event); // Pasar el evento para detener la propagación
  }
});


// Función para abrir el modal y mostrar la imagen
function openModal(imageSrc) {
  var modal = '<div class="modal" id="modal"><img src="' + imageSrc + '" class="modal__img"><div class="modal__boton" id="modal__boton">X</div></div>';
  $('body').append(modal);

  // Agregar evento de clic al fondo oscuro del modal
  $('#modal').click(function (event) {
    if (event.target === this) {
      closeModal();
    }
  });

  $('#modal__boton').click(function () {
    closeModal();
  });

  $(document).keyup(function (e) {
    if (e.which == 27) {
      closeModal();
    }
  });
}

// Función para cerrar el modal
function closeModal() {
  $('#modal').remove();
}

// Agregar evento de clic a las imágenes de la galería
$('.galeria__img').click(function (e) {
  var img = e.target.src;
  openModal(img);
});

function sendForm(){
  document.getElementsByClassName('form').submit();
}