<?php include ("../../template/header.php");?>
<?php include("../../conexion.php") ;

if(isset($_GET['id'])){

    $txtid=(isset($_GET['id'])?$_GET['id']:"");
    $stm=$conexion->prepare("SELECT * from contactos WHERE id=:txtid");
    $stm->bindParam("txtid",$txtid);
    $stm->execute();
  $registro=$stm->fetch(PDO::FETCH_LAZY);
  $nombre=$registro['nombre'];
  $telefono=$registro['telefono'];
  $fecha=$registro['fecha'];
}
  if($_POST){

    $nombre=(isset($_POST['Nombre'])?$_POST['Nombre']:"");
    $telefono=(isset($_POST['Telefono'])?$_POST['Telefono']:"");
    $fecha=(isset($_POST['Fecha'])?$_POST['Fecha']:"");
    $txtid=(isset($_POST['txtid'])?$_POST['txtid']:"");

  $stm=$conexion->prepare("UPDATE contactos set nombre=:nombre,telefono=:telefono,fecha=:fecha WHERE id=:txtid");

  $stm->bindParam(":nombre",$nombre);
  $stm->bindParam(":telefono",$telefono);
  $stm->bindParam(":fecha",$fecha);
  $stm->bindParam(":txtid",$txtid);
  $stm->execute();

  header("location:index.php");
}

?>

<form action="" method="post">
    <input type="hidden" class="form-control" name="txtid"  value="<?php echo $txtid?>" placeholder="ingresa">
    <label for="">Nombre</label>
    <input type="text" class="form-control"  name="Nombre" value="<?php echo $nombre?>" placeholder="Ingresa el nombre">

    <label for="">Telefono</label>
    <input type="text" class="form-control"  name="Telefono" value="<?php echo $telefono?>" placeholder="Ingresa el nombre">

    <label for="">Fecha</label>
    <input type="date" class="form-control"  name="Fecha"  value="<?php echo $fecha?>" placeholder="Ingresa el nombre">
      </div>
      <div class="modal-footer">
       <a href="index.php" class="btn btn-danger">Cancelar</a>
        <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>

        <?php include ("../../template/footer.php");?>