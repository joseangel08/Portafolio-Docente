<?php
//require_once('../modelo/Docente.php');
require_once ('../db/ConexionBD.php');
require_once('../modelo/Rol.php');
require_once('../modelo/Docente.php');
require_once('../modelo/Carrera.php');
require_once('../modelo/Usuario.php');
require_once('../modelo/ActividadDocente.php');
require_once('../modelo/PeriodoAcademico.php');
require_once('../controlador/RolController.php');
require_once('../db/Consultas.php');
require_once('../controlador/CarreraController.php');
require_once('../modelo/PortafolioDocente.php');
require_once('../controlador/PortafolioDocenteController.php');
require_once('../modelo/DocumentoGeneral.php');

$r = new RolController();
$c = new CarreraController();
$c1 = new Carrera();
$d = new Docente();
$u = new Usuario();
$rol = new Rol();
$act = new ActividadDocente();
$per = new PeriodoAcademico();
$port = new PortafolioDocente();
$doc_general = new DocumentoGeneral();
//$r->setNombreRol("Decano");
//$r->setEstado("Activo");
//echo var_dump($r->obtenerRoles());
//echo var_dump($c1->obtenerCarreras());
//$u->setUsuario("jose@unl.edu.ec");
//$u->setClave("jose1234");


/*
$d->setCedula("1105139248");
$pasaporte = null;
$d->set = "Jackeline";
$d->setApellido = "Cuenca";
$d->setCorreo = "mjcuencac@unl.edu.ec";
$d->setId_carrera = 1;
$d->settelefono = "5555555";
$d->setcelular = "00000";
$d->setdireccion = "Argelia";
$d->setclave = "1234";
$d->setestado = "Activo";*/

//$rol->setId(6);
//$rol->setNombreRol("Vicerrector");
//$rol->setEstado("Activo");
/*$cons = new Consultas();
$descripcion = "Periodo Julio 2022 - Noviembre 2022";
$fecha_inicio = "2022-07-18";
$fecha_fin = "2022-11-08";
$fecha = date($fecha_fin);
$fecha_fin_maxima = strtotime ( '+30 day' , strtotime ( $fecha ) ) ;
$fecha_fin_maxima = date ( 'Y-m-j' , $fecha_fin_maxima );
$estado = 'Inactivo';
echo var_dump($cons->guardarPeriodoAcademico($fecha_inicio, $fecha_fin, $estado, $descripcion, $fecha_fin_maxima));
*/
/*$doc = new Docente();
$doc->setCedula("1104680192");
$doc->setId(3);
echo var_dump($doc->siExisteCedula());*/
//echo var_dump($act->buscarUsuarioActividad(3));
//echo var_dump($act->buscarPeriodo(8));
//echo var_dump($act->buscarActividadDocente(2));
//echo var_dump($act->asignarActividadDocente(2, 8, 3));
// echo $per->obtenerPerAcadId(9)->path_dir_periodo;
//echo $d->obtNombreDocente(3)->nombre." ".$d->obtNombreDocente(3)->apellido;
//$port->setEstado("Sin Revisar");
//$port->setFecha_creacion("03-08-2022");
//$port->setFecha_fin("03-09-2022");
//$port->setId_docente(2);
//$port->setId_periodo_academico(9);
//echo json_encode($port->crearPortafolioDocente());
//echo json_encode($port->buscarPortafolioDocente(0));
//echo json_encode($act->asignarActividadDocente(2, 9, 2));
//echo json_encode($port->obtenerDocuGeneral(3));
//echo json_encode($doc_general->obtenerDocumentoGeneral(24));
//echo basename(dirname(__FILE__));
//$d= date(time());
//echo $d;
$str = strtolower("MAMA");
echo define('ROOT_PATH', dirname(__DIR__) . '/');


//echo var_dump($rol->actualizarRoles());