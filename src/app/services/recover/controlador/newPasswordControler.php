<?php
include_once 'ControladorRecover.php';
$controlador = new ControladorRecover();
include_once '../modelo/Consultas.php';
$code=$_GET['codigo'];
$controlador->newPassword($code);
?>