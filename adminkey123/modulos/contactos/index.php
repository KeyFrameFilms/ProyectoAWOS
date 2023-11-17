
<?php include ("../../template/header.php")?>
<?php include("../../../conexion.php") ;

 $stm=$conexion->prepare("select * from clientes");
 $stm-> execute();
 $clientes=$stm->fetchAll(PDO::FETCH_ASSOC); 
 
 if(isset($_GET['id'])){

    $txtid=(isset($_GET['id'])?$_GET['id']:"");
    $stm=$conexion->prepare("DELETE from clientes WHERE id=:txtid");
    $stm->bindParam(":txtid",$txtid);
    $stm->execute();
    header("location:index.php");
 }  
 
 ?>

<div class="table-responsive">
    <table class="table table-primary">

        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido Paterno</th>
                <th scope="col">Apellido Materno</th>
                <th scope="col">Correo</th>
                <th scope="col">Telefono</th>
                <th scope="col">Mensaje</th>
            </tr>
        </thead>

        <tbody>
            <?php foreach($clientes as $clientes){ ?>
            <tr class="">
                <td scope="row"><?php echo $clientes["id"]?></td>
                <td><?php echo $clientes["Nombre"]?></td>
                <td><?php echo $clientes["Apellido_Paterno"]?></td>
                <td><?php echo $clientes["Apellido_Materno"]?></td>
                <td><?php echo $clientes["Correo"]?></td>
                <td><?php echo $clientes["Telefono"]?></td>
                <td><?php echo $clientes["Mensaje"]?></td>
            </tr>
            <?php }?>
        </tbody>
    </table>
</div>




<?php include ("../../template/footer.php");?>
<?php include ("create.php");?>