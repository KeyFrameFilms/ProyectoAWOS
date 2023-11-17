<footer id="Contacto">
  <div class="container2">
    <div class="card">
      <div class="card-header">
        <h1 class="card-title">¡Contáctanos y déjanos ser parte de tu historia!</h1>
        <p> Si tienes preguntas sobre nuestros paquetes, servicios o simplemente quieres compartir tus experiencias con
          nosotros, estaremos encantados de escucharte. <br /><br />
          Además, si estás interesado en reservar uno de nuestros servicios, solicitar una cotización personalizada o
          <br> concertar una reunión para discutir tus necesidades específicas, este es el lugar adecuado para hacerlo.
        </p>
      </div>
      
      <form action="index.php" method="post" class="form">
    <input type="text" name="nombre" placeholder="Nombre" class="input input-50" />
    <input type="text" name="apellido_paterno" placeholder="Apellido Paterno" class="input input-50" />
    <input type="text" name="apellido_materno" placeholder="Apellido Materno" class="input input-50" />
    <input type="email" name="correo" placeholder="Correo electrónico" class="input input-50" />
<input type="tel" name="telefono" placeholder="Número de teléfono" class="input" maxlength="10" id="telefonoInput">
    <script>
        const telefonoInput = document.getElementById("telefonoInput");

        telefonoInput.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, ''); // Reemplazar todo lo que no sea dígito con una cadena vacía
        });
    </script>
    <textarea name="mensaje" placeholder="Mensaje" class="input"></textarea>
    
    <button onclick="sendForm()" class="btn">Enviar mensaje</button>
</form>

<?php
// Incluye tu archivo de conexión
include './conexion.php'; // Asegúrate de que la ruta sea correcta

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibe los datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $apellidoPaterno = $_POST['apellido_paterno'] ?? '';
    $apellidoMaterno = $_POST['apellido_materno'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    // Verifica si todos los campos obligatorios están completos
    if ($nombre && $apellidoPaterno && $correo && $telefono) {
        try {
            // Prepara la consulta SQL para insertar los datos
            $sql = "INSERT INTO clientes (id_admin, id_servicio, Nombre, Apellido_Paterno, Apellido_Materno, Correo, Telefono, Mensaje)
                    VALUES (1, 1, :nombre, :apellidoPaterno, :apellidoMaterno, :correo, :telefono, :mensaje)";

            // Prepara la consulta
            $stmt = $conexion->prepare($sql);

            // Vincula los parámetros
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':apellidoPaterno', $apellidoPaterno);
            $stmt->bindParam(':apellidoMaterno', $apellidoMaterno);
            $stmt->bindParam(':correo', $correo);
            $stmt->bindParam(':telefono', $telefono);
            $stmt->bindParam(':mensaje', $mensaje);

            // Ejecuta la consulta
            $stmt->execute();
            echo "<script>alert('Datos enviados correctamente.');</script>";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        // Si faltan campos obligatorios, muestra una alerta con JavaScript
        echo "<script>alert('Por favor completa todos los campos obligatorios.');</script>";
    }
}
?>

      </div>
    </div>
  </div>
  <h2>Tambien nos puedes contactar por:</h2>
  <div class="container" id="container">
    <a href="https://instagram.com/keyframe_films?igshid=NTc4MTIwNjQ2YQ==" target="_blank" class="fa fa-instagram"
      id="instagram"></a>
    <a href="https://youtube.com/@keyframe_films" target="_blank" class="fa fa-youtube" id="youtube"></a>
    <a href="https://api.whatsapp.com/send?phone=%2B527641015573&data=ARCSKE8WNCZ7A7c3R3RBW9wqbJ8jwXH7z9s7Pr9UIzW0WbFJP2cO7AUrtXKkvZbTkjnSsKXu7vF3jez3tSBIfrDoFz1e0c-4JXR0F_aA1nk85K7XSrlwhwFML8tJm3JUl83jq-eZ-hA-dg28xdpc4uNjOQ&source=FB_Page&app=facebook&entry_point=page_cta"
      target="_blank" class="fa fa-whatsapp" id="whatsapp"></a>
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=AgenciaKeyFrameFilms@gmail.com" target="_blank"
      class="fa fa-envelope-square email" id="email"></a>
    <a href="https://www.facebook.com/AgenciaKeyframeFilms?mibextid=ZbWKwL" target="_blank"
      class="fa fa-facebook-square" id="facebook"></a>
  </div>
</footer>