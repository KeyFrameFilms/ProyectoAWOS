<!-- Button trigger modal -->
<?php include("../../conexion.php") ; ?>
<?php 
if($_POST){

  $nombre=(isset($_POST['Nombre'])?$_POST['Nombre']:"");
  $telefono=(isset($_POST['Telefono'])?$_POST['Telefono']:"");
  $fecha=(isset($_POST['Fecha'])?$_POST['Fecha']:"");

  $stm=$conexion->prepare("INSERT INTO contactos(id,nombre,telefono,fecha)VALUES(null ,:nombre,:telefono,:fecha)");
  $stm->bindParam(":nombre",$nombre);
  $stm->bindParam(":telefono",$telefono);
  $stm->bindParam(":fecha",$fecha);
  $stm->execute();

  header("location:index.php");
}


?>


<!-- Modal -->
<div class="modal fade" id="create" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar contacto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

    <form action="" method="post">
    <label for="">Nombre</label>
    <input type="text" class="form-control"  name="Nombre" placeholder="Ingresa el nombre" required>

    <label for="">Telefono</label>
    <input type="text" class="form-control"  name="Telefono" placeholder="Ingresa el telefono" required>

    <label for="">Fecha</label>
    <input type="date" class="form-control"  name="Fecha" required>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
        </form>
     
    </div>
  </div>
</div>