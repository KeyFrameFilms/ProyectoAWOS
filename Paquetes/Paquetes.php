    <link rel="stylesheet" href="../Paquetes/stylespaq.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/css/style.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paquetes</title>
<style>
  body{
    background: hsl(0, 0%, 0%)  }
</style>
    <h1>Paquetes</h1>

<!-- Tabla - Productos del Carrito -->
<div class="tabla-calculo" id="tabla-calculo">
  <table class="tabla">
    <caption class="titulo-tabla">Productos en el carrito</caption>
    <thead class="cabecera border-top-right">
      <tr>
        <th class="border-top-left">Nombre Producto</th>
        <th>Cantidad</th>
        <th>Precio Unitario</th>
        <th class="border-top-right">Precio Total</th>
      </tr>
    </thead>
    <!-- Agrega este código donde deseas que aparezca el botón de pago -->
    <tbody id="carrito-body">

    </tbody>
    <tfoot id="footer">
      <tr><td class="border-bottom-left border-bottom-right" colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>
    </tfoot>
  </table>
</div>
<!-- Template de las filas -->
<template id="agregar-producto-al-carro">
  <tr>
        <td id="producto">Paquete</td>
        <td><button id="menos-cantidad" class="button">-</button><span id="cant">1</span><button id='mas-cantidad' class="button">+</button></td>
        <td class="precio-tabla" id="precio-uni">350</td>
        <td class="precio-tabla" id="precio-total-prod">350</td>
      </tr>
</template>

<!-- Template del footer de la tabla -->
<template id="tfooter">
  <tr class="none">
    <td colspan="2" class="border-bottom-left">
      <!-- <button id="vaciar-tabla" class="button">Vaciar carrito</button> -->
    </td>
    <td class="negrita">Precio Total</td>
    <td id="total-a-pagar" class="precio-tabla border-bottom-right negrita">5.00</td>
  </tr>
</template>

<!-- Aqui se insertan las cards de productos con javascript-->
    <div class="contenedor-productos">
        <article class="cartola">
         <!-- Imagen del producto -->
         <div class="contenedor-img">
          <img src="../img/Retrato/Imagen-8.gif" alt="Papas fritas">
         </div>
         <!-- Nombre y descripción del producto -->
         <div class="div-info">
           <h2 class="nombre-prod">Paquete Retrato 1</h2>
           <hr class="separador">
           <p class="descripcion-prod">*10 fotografías reveladas (editadas). <br>
            *Cantidad de outfits: 2 <br>
              * Tiempo aproximado:1 hora y 30 minutos.</p>
         </div>
         <!-- Precio y Agregar al carrito -->
         <div class="div-precio-boton">
            <p class="precio">700</p>
            <button class="boton">Agregar</button>
         </div>
        </article>
      
        <article class="cartola">
         <!-- Imagen del producto -->
         <div class="contenedor-img">
          <img src="../img/Retrato/13.jpg" alt="Paquete Retrato 1">
         </div>
         <!-- Nombre y descripción del producto -->
         <div class="div-info">
           <h2 class="nombre-prod">Paquete Retrato 2</h2>
           <hr class="separador">
           <p class="descripcion-prod">*  15 fotografías reveladas (editadas). <br>
            * Cantidad de outfits: 3 <br>
              * Tiempo aproximado:2  horas.</p>
         </div>
         <!-- Precio y Agregar al carrito -->
         <div class="div-precio-boton">
            <p class="precio">1000</p>
            <button class="boton">Agregar</button>
         </div>
        </article>
      
        <article class="cartola">
         <!-- Imagen del producto -->
         <div class="contenedor-img">
          <img src="../img/Retrato/19.jpg" alt="Paquete Retrato 2">
         </div>
         <!-- Nombre y descripción del producto -->
         <div class="div-info">
           <h2 class="nombre-prod">Paquete Retrato 3</h2>
           <hr class="separador">
           <p class="descripcion-prod">*20 fotografías reveladas (editadas). <br>
            * Cantidad de outfits: 4 <br>
              * Tiempo aproximado:2 horas y 30 minutos. <br>
            * Puedes compartir este paquete con otra persona</p>
         </div>
         <!-- Precio y Agregar al carrito -->
         <div class="div-precio-boton">
            <p class="precio">1300</p>
            <button class="boton">Agregar</button>
         </div>
        </article>

        <article class="cartola">
            <!-- Imagen del producto -->
            <div class="contenedor-img">
             <img src="../img/Boda/J5.JPG" alt="Paquete Retrato 3">
            </div>
            <!-- Nombre y descripción del producto -->
            <div class="div-info">
              <h2 class="nombre-prod">Paquete evento social</h2>
              <hr class="separador">
              <p class="descripcion-prod">*Fotografías durante el evento <br>
                * Vídeo <br>
                * Tiempo aproximado: Duracion del evento</p>
            </div>
            <!-- Precio y Agregar al carrito -->
            <div class="div-precio-boton">
               <p class="precio">5500</p>
               <button class="boton">Agregar</button>
            </div>
           </article>

           <article class="cartola">
            <!-- Imagen del producto -->
            <div class="contenedor-img">
             <video src="../Video/Reels/Necaxa.mp4" alt="Paquete Dron" muted autoplay loop>
            </div>
            <!-- Nombre y descripción del producto -->
            <div class="div-info">
              <h2 class="nombre-prod">Paquete vídeo Dron</h2>
              <hr class="separador">
              <p class="descripcion-prod"> * Vuelos con dron. <br>
                * Tiempo aproximado:30 minutos (aproximadamente).</p>
            </div>
            <!-- Precio y Agregar al carrito -->
            <div class="div-precio-boton">
               <p class="precio">900</p>
               <button class="boton">Agregar</button>
            </div>
           </article>

           <article class="cartola">
            <!-- Imagen del producto -->
            <div class="contenedor-img">
             <video src="../Video/Reels/Galletas Esponjadas.mp4" alt="Paquete Publicitario" muted autoplay loop>
            </div>
            <!-- Nombre y descripción del producto -->
            <div class="div-info">
              <h2 class="nombre-prod">Paquete Publicitario</h2>
              <hr class="separador">
              <p class="descripcion-prod"> *Vídeo publicitario. <br>
                * El formato de entrega 
                puede ser en formato
              horizontal y vertical
              TikTok y Reels.</p>
            </div>
            <!-- Precio y Agregar al carrito -->
            <div class="div-precio-boton">
               <p class="precio">3500</p>
               <button class="boton">Agregar</button>
            </div>
           </article>
      </div>
      <!-- template del producto -->
<template id="template-prod">
    <article class="cartola">
     <!-- Imagen del producto -->
     <div class="contenedor-img">
      <img src="" alt="">
     </div>
     <!-- Nombre y descripción del producto -->
     <div class="div-info">
       <h2 class="nombre-prod">Nombre Producto</h2>
       <hr class="separador">
       <p class="descripcion-prod">Descripción producto</p>
     </div>
     <!-- Precio y Agregar al carrito -->
     <div class="div-precio-boton">
        <p class="precio">precio Producto</p>
        <button class="boton">Agregar</button>
     </div>
    </article>
  </template>
<script src="Scriptpaq.js"></script>
<?php
include ("../templates/footer.php");
?>