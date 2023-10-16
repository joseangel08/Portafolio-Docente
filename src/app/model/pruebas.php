<?php 
include 'ConsultaBD.php';
$cons = new ConsultaBD();
$resultado=$cons->login('admin', 'admin');
$personas = array();
$jsonR=null;

$item = array('id' => utf8_decode($resultado->id), 'usuario' => utf8_decode($resultado->usuario), 'clave' => utf8_decode($resultado->clave), 
    'id_persona' => utf8_decode($resultado->id_persona), 'id_rol' => utf8_decode($resultado->id_rol));
array_push($personas, $item);
echo json_encode($resultado);

?>