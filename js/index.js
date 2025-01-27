gsap.registerPlugin(ScrollTrigger);

// Animación principal con el zoom
gsap.timeline({
  scrollTrigger: {
    trigger: '.wrapper',
    start: 'top top',
    end: '+=200%', // Duración solo hasta el zoom completo
    pin: true,     // Fija el contenido durante esta sección
    scrub: 1.5,    // Movimiento sincronizado con el scroll
  }
})
.to('.image-container img', {
  scale: 5.4,                 // Zoom hasta esta escala
  transformOrigin: 'center center',
  ease: 'power1.inOut',
});

// Configuración para contenido adicional
gsap.timeline({
  scrollTrigger: {
    trigger: '.hidden-content', // El contenido aparece después
    start: 'top bottom',        // Cuando el contenido entra en la vista
    end: 'bottom top',          // Desplázate con normalidad
    scrub: false,               // Scroll normal
    pin: false,                 // No fija el contenido
  }
})
.to('.hidden-content', {
  opacity: 1,                  // Aparece el contenido adicional
  transform: 'translateY(0)',  // Se posiciona correctamente
  ease: 'power1.inOut',
});


// CONTADOR ******************************************

const fechaObjetivo = new Date("March 1, 2025 16:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  // Cálculos de tiempo
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Actualizar el HTML
  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;

  // Parar el contador si la fecha ha pasado
  if (diferencia < 0) {
    clearInterval(intervalo);
    document.querySelector(".contador").innerHTML = "<h1>¡El día ha llegado!</h1>";
  }
}

// Actualizar cada segundo
const intervalo = setInterval(actualizarContador, 1000);


// Botones del modal
const confirmarAsistenciaBtn = document.getElementById("confirmarAsistenciaBtn");
const cerrarModalBtn = document.getElementById("cerrarModalBtn");
const modal = document.getElementById("asistenciaModal");
const modalContent = document.getElementById("modalContent");

// Abrir modal
confirmarAsistenciaBtn.addEventListener("click", () => {
  modal.style.display = "block";
  cargarVistaInicial();
});

// Cerrar modal
cerrarModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Función para cargar la vista inicial del modal
function cargarVistaInicial() {
  modalContent.innerHTML = `
    <h2 class="text-xl font-bold text-gray-800 mb-4">¿Cuántos invitados confirmarán asistencia?</h2>
    <input type="number" id="cantidadInvitados" class="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4" min="1" placeholder="Cantidad de invitados" />
    <button id="continuarBtn" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">Continuar</button>
  `;

  const continuarBtn = document.getElementById("continuarBtn");
  continuarBtn.addEventListener("click", cargarFormularioInvitados);
}

// Función para cargar el formulario de invitados
function cargarFormularioInvitados() {
  const cantidad = parseInt(document.getElementById("cantidadInvitados").value, 10);

  if (cantidad > 0) {
    let formHtml = `
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Información de los Invitados</h2>
        <form id="invitadosForm" class="space-y-6">
    `;

    for (let i = 1; i <= cantidad; i++) {
      formHtml += `
        <div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px 50px 20px 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 18px; color: #000; font-weight: bold; margin-bottom: 20px; text-align: center;">Persona ${i}</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 24px;">
            <div>
              <label for="nombre${i}" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: bold; color: #333;">Nombres y Apellidos</label>
              <input type="text" id="nombre${i}" style="display: block; width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;" placeholder="Nombre completo" required aria-required="true">
            </div>
            <div>
              <label for="celular${i}" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: bold; color: #333;">Celular</label>
              <input type="text" id="celular${i}" style="display: block; width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;" placeholder="Número de celular" required aria-required="true">
            </div>
            <div>
              <label for="correo${i}" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: bold; color: #333;">Correo</label>
              <input type="email" id="correo${i}" style="display: block; width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;" placeholder="Correo electrónico" required aria-required="true">
            </div>
            <div>
              <label for="edad${i}" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: bold; color: #333;">Edad</label>
              <input type="number" id="edad${i}" style="display: block; width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;" placeholder="Edad" required aria-required="true">
            </div>
          </div>
        </div>
      `;
    }

    formHtml += `
          <div class="flex justify-between items-center">
            <button id="guardarBtn" style="margin-top: 20px; background-color: #e9b91e; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Guardar</button>
            <button id="volverBtn" style="margin-top: 20px; background-color: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Volver</button>
          </div>
        </form>
      </div>
    `;

    modalContent.innerHTML = formHtml;

    // Evento para el botón "Volver"
    document.getElementById("volverBtn").addEventListener("click", cargarVistaInicial);

    // Evento para el botón "Guardar"
    document.getElementById("guardarBtn").addEventListener("click", (e) => {
      e.preventDefault();
      guardarInformacionInvitados(cantidad);
    });
  } else {
    alert("Por favor, ingresa una cantidad válida.");
  }
}

// Función para guardar la información de los invitados y enviarla por WhatsApp
function guardarInformacionInvitados(cantidad) {
  let mensaje = "¡Hola! Te comparto el listado de nuevas personas que confirmaron su asistencia.%0A";
  for (let i = 1; i <= cantidad; i++) {
    const nombre = document.getElementById(`nombre${i}`).value;
    const celular = document.getElementById(`celular${i}`).value;
    const correo = document.getElementById(`correo${i}`).value;
    const edad = document.getElementById(`edad${i}`).value;

    mensaje += `%0APersona ${i}:%0ANOMBRE: ${nombre}%0AEDAD: ${edad}%0ACELULAR: ${celular}%0ACORREO: ${correo}%0A`;
  }

  const numeroWhatsapp = "573008218693";
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensaje}`;
  window.open(url, "_blank");
}