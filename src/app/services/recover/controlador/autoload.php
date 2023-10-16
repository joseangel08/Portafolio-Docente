<?php
//namespace Portafolio\Recover;

//use Portafolio\Recuperar\Controlador;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
include_once 'ControladorRecover.php';
$controlador = new ControladorRecover();
$controlador->enviarEmailRecuperacion();
?>