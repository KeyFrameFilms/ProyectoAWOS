<?php
include("verificar_sesion.php");
include("template/header.php");

// Definir las credenciales válidas
$usuario_valido = "usuario";
$contrasena_valida = "12345";

// Variables para almacenar mensajes de error
$mensaje_usuario = "";
$mensaje_contrasena = "";
$mensaje_error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener valores ingresados por el usuario
    $usuario = $_POST["usuario"];
    $contrasena = $_POST["contrasena"];

    // Validar el usuario y la contraseña
    if ($usuario == $usuario_valido && $contrasena == $contrasena_valida) {
    // Credenciales válidas, establecer la sesión y redirigir
    session_start();
    $_SESSION['usuario'] = $usuario;
    header("Location: https://keyframefilms.online/adminkey123/modulos/contactos/");
    exit();
} else {
    // Mostrar mensaje de error si las credenciales son incorrectas
    $mensaje_error = "Usuario o contraseña incorrectos";
}
}

?>

<div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <!doctype html>
<html lang="en">
<head>
  <title>Inicio</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/styles.css">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div id="stars"></div>
<div id="stars2"></div>
<div id="stars3"></div>
<div class="section">
  <div class="container">
    <div class="row full-height justify-content-center">
      <div class="col-12 text-center align-self-center py-5">
        <div class="section pb-5 pt-5 pt-sm-2 text-center">
          <div class="card-3d-wrap mx-auto">
            <div class="card-3d-wrapper">
              <div class="card-front">
                <div class="center-wrap">
                  <div class="section text-center">
                    <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
    <span>Inicio de sesión</span>
        <form method="POST">
            <div class="form-group">
                <input type="text" class="form-style" placeholder="Usuario" name="usuario">
                <i class="input-icon uil uil-at"></i>
            </div>
            <div class="form-group mt-2">
                <input type="password" class="form-style" placeholder="Contraseña" name="contrasena">
                <i class="input-icon uil uil-lock-alt"></i>
            </div>
            <button type="submit" class="btn mt-4">Accesar</button>
        </form>

        <?php if ($mensaje_error !== "") : ?>
            <p class="text-danger"><?php echo $mensaje_error; ?></p>
        <?php endif; ?>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
</body>
</html>

    </div>
  </div>
  <?php include ("template/footer.php");?>
