<?php
include_once 'ControladorRecover.php';
$controlador = new ControladorRecover();
$idUsuario = $_POST['txtIdUsuario'];
$contrasena = $_POST['txtContrasena'];
$repetirContrasena = $_POST['txtRepetirContrasena'];
$controlador->updatePasswordWithCode($idUsuario, $contrasena, $repetirContrasena);
?>