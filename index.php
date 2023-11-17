<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="/css/style.css">
  <title>Keyframe Films</title>
  <link rel="icon" href="./img/Logo/LOGO-2021-TRANSPARENTE_Mesa de trabajo 1.png">
</head>

<body>
  <main>
    <section>
      <img src="./img/Fotos Dron/Amanecer.jpg" id="bg" />
      <h1 id="text">KeyFrame Films</h1>
      <img src="./img/Logo/LOGO-2021-BYW_Mesa de trabajo 1 copia.png" id="logo" class="logo_class" />
    </section>
    <div class="sec">
      <div class="hamburger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <menu class="navbar">
        <ul id="menu">
          <li>
            <a href="#Inicio"><b>Inicio</b></a>
          </li>
          <li>
            <a href="#Portafolio"><b>Portafolio</b></a>
          </li>
          <!--<li> 
            <a href="./Servicios/servicios.php"><b>Servicios</b></a>
          </li>-->
          <li>
            <a href="Paquetes/Paquetes.php"><b>Paquetes</b></a> 
          </li>
          <li>
            <a href="#Contacto"><b>Contacto</b></a>
          </li>
        </ul>
      </menu>
      <div class="content" id="Inicio">
        <h2>
          En nombre de todo nuestro equipo, <br />
          me gustaría darle la bienvenida a nuestro sitio web.</h2>
        <p>
          Nuestra productora se ha comprometido a ofrecer contenido
          cautivador, emocionante y de alta calidad desde sus inicios. <br />
          Aquí encontrarás un espacio dedicado a la creatividad, la innovación
          y la ilusión por la producción cinematográfica y audiovisual.
          <br \ /><br \ />
          ¡Esperamos que disfrutes de tu visita y que te emociones tanto como
          nosotros con nuestro apasionante universo cinematográfico!
        </p>
      </div>
      <div id="Portafolio">
        <h2>Portafolio</h2>
        <ul class="galeria">
          <li class="galeria__item">
            <img src="../img/Boda/J5.JPG"
              class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img src="../img/Retrato/Fatima12-4.jpg" class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img
              src="../img/Retrato/20.jpg"
              class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img src="../img/Retrato/13.jpg"
              class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img src="../img/Fotos Dron/Cielo Dron_.JPG" class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img src="../img/Gastronomia/Don_Mundo_Hamburguesas.JPG" class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img src="../img/Gastronomia/Don_Mundo_Entrada.JPG" class="galeria__img" />
          </li>
          <li class="galeria__item">
            <img src="../img/Gastronomia/Don_Mundo_Tacos2.jpg"
              class="galeria__img" />
          </li>
        </ul>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      </div>
    </div>
  </main>
  <div id="lastray" class="element"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/ScrollTrigger.min.js"></script>
  <script src="./script.js"></script>
</body>
<?php
include("./templates/footer.php");
?>
</html>