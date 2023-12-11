// Importa el módulo Dropzone de la biblioteca "dropzone"
import { Dropzone } from "dropzone";

// Inicializa Dropzone con opciones específicas
Dropzone.options.image = {
  // Mensaje predeterminado cuando no hay archivos seleccionados
  dictDefaultMessage: "Please load the selected images",

  // Tipos de archivos aceptados
  acceptedFiles: ".png, .jpg, .jpeg, .bmp, .svg, .JPG",

  // Tamaño máximo de archivo en megabytes
  maxFilesize: 20,

  // Número máximo de archivos permitidos
  maxFiles: 1,

  // Número de cargas simultáneas permitidas
  parallelUploads: 1,

  // Desactiva la carga automática de archivos al soltarlos en la zona de carga
  autoProcessQueue: false,

  // Agrega enlaces para quitar archivos
  addRemoveLinks: true,

  // Nombre del parámetro que llevará el archivo en la solicitud HTTP
  paramName: "image",

  // Cabeceras personalizadas para incluir en las solicitudes HTTP
  headers: {},

  // Función de inicialización que se ejecuta cuando Dropzone se inicia
  init: function () {
    // Almacena la instancia de Dropzone para acceder a ella en eventos
    const DropzoneInstance = this;

    // Selecciona el botón con el id 'publish'
    const btnPublish = document.querySelector("#publish");

    // Agrega un evento de clic al botón 'publish'
    btnPublish.addEventListener("click", function () {
      // Procesa la cola de archivos pendientes de carga
      DropzoneInstance.processQueue();
    });

    // Evento que se dispara cuando la cola de archivos se completa
    DropzoneInstance.on("queuecomplete", function () {
      // Redirige a la página de inicio si no hay archivos en la cola
      if (DropzoneInstance.getActiveFiles().length == 0) {
        window.location.href = "/home";
      }
    });
  },
};
