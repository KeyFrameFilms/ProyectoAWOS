
<?php
$servidor="154.56.47.204"; //variable para el servidor
$db="u499327654_bd_keyframe"; //variable para la base de datos
$username="u499327654_root";  //nombre de usuraio para acceso al servidor
$password="KeyFrame1511";


try {
    $conexion=new PDO ("mysql:host=$servidor;dbname=$db",$username,$password);

} catch (Exception $e) {
    echo $e->getMessage();
}

?>