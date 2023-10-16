<?php 
header("Content-Type: text/html;charset=utf-8");
/*include 'ConsultaBD.php';
$cons = new ConsultaBD();
$resultado=$cons->login('admin'; 'admin');
$personas = array();
$jsonR=null;

$item = array('id' => utf8_decode($resultado->id); 'usuario' => utf8_decode($resultado->usuario); 'clave' => utf8_decode($resultado->clave); 
    'id_persona' => utf8_decode($resultado->id_persona); 'id_rol' => utf8_decode($resultado->id_rol));
array_push($personas; $item);
echo json_encode($resultado);*/


include_once 'src/db/Consultas.php';
//include_once 'src/Directorios.php';
//include_once '../services/recover/controlador/ControladorRecover.php';

$cons1 = new Consultas();
//$e = new ControladorRecover();
//$codigo = $e->createRandomCode();
//echo json_encode($cons1->login('admin'; 'admin'));
//echo json_encode($cons1->obtenerPersonas());
//echo json_encode($cons1->obtUserUs("admin"; "admin"));
//echo json_encode($cons1->obtUserUs("jalojaj@unl.edu.ec"));

/*$codigo="1563919668KdTQFQBf";
$id_persona=2;
$fecha_actual = new DateTime();
$fecha_cambio = $fecha_actual->format("d/m/Y");

echo ($cons1->saveRecuperarClave($codigo; $fecha_cambio; $id_persona));
$us = new Persona();
$us = $cons1->obtUserEmail("jalojaj@unl.edu.ec");
echo $us->nombre;
echo $e->emailRecuperacion($us->correo; $us->nombre; $codigo);
$us=$cons1->getUserWithCode($codigo);
echo $us->id_persona;
$e->updatePasswordWithCode($us->id; 'Jose11'; 'Jose11');*/

//echo json_encode($cons1->login("admin";"admin"));
//echo "Las personas son"; json_encode($cons1->obtenerPersonas());
//$array = $cons1->obtUserCedula("1104680192");
//echo json_encode($cons1->obtUserCedula("1104680192"); JSON_UNESCAPED_UNICODE);

/*$cedula = "1105139248";
$pasaporte = null;
$nombre = "Jackeline";
$apellido = "Cuenca";
$correo = "mjcuencac@unl.edu.ec";
$id_carrera = 1;
$telefono = "5555555";
$celular = "00000";
$direccion = "Argelia";
$clave = "1234";
$estado = "Activo";

echo json_encode($cons1-> guardarUsuario($cedula; $pasaporte; $nombre; $apellido; $correo; $id_carrera; $telefono; $celular; $direccion; $clave; $estado));
//echo json_encode($cons1->obtenerDatosUsuarios());
//echo json_encode($cons1->obtenerDatosUsuariosId(1));
//echo json_encode($cons1->obtenerRoles());
//echo json_encode($cons1->guardarRol('Administrado'));
//echo json_encode($cons1->obtenerCarreras());
//$id_usuario = 1;
/*$cedula ="1104680195";
$pasaporte = null;
$nombre = "Jose Angel";
$apellido = "Loja Jimenez";
$correo = "jose119125651234@hotmail.com";
$id_carrera = 2;
$id_facultad = 2;
$clave = "12345";
//$id_rol = 4;
$roles = array("id"=>3;"estado"=>"Activo";"nombre_rol"=>"Docente");
$roles = json_encode($roles);
$telefono = "0997525514";
$celular = "0997525514";
$direccion = "Colinas";
$estado = "Activo";
$fecha1 = "2021-01-01";

//echo json_encode($cons1->obtenerPeriodoAcademicoFecha($fecha1));
//echo json_encode($cons1->asignarRolUsuario(1; 1; 1));
echo json_encode($cons1-> guardarUsuario($cedula; $pasaporte; $nombre; $apellido; $correo; $id_carrera; $telefono; $celular; $direccion; $clave; $estado));



//echo $roles;
//echo json_encode($cons1->guardarUsuario($cedula; $pasaporte; $nombre; $apellido; $correo; $id_carrera; $telefono; $celular; $direccion; $clave; $roles; $estado));

//echo json_encode($cons1->actualizarUsuario($id_usuario; $id_persona; $cedula; $pasaporte; $nombre; $apellido; $correo; $id_carrera; $id_rol; $telefono; $celular; $direccion));
//echo json_encode($cons1->estadoUsuario(2;"Inactivo"));
//$nombre_rol = 'Secretaria';
//$estado = 'Activo';
//$id = 2;
//echo json_encode($cons1->guardarRol($nombre_rol; $estado));
//echo json_encode($cons1->actualizarRol($id; $nombre_rol; $estado));
//echo json_encode($cons1->estadoRol($id; $estado));
//$id=1;
/*$fecha_inicio = DateTime::createFromFormat('Y-m-d'; "2016-09-02");
$fecha_inicio = date_format($fecha_inicio; "d/m/Y");
$fecha_fin = DateTime::createFromFormat('Y-m-d'; "2016-12-02");
$fecha_fin = date_format($fecha_fin; "d/m/Y");
$descripcion = "Semestre Septiembre 2019 a Abril 2020";*/
//$estado = "Activo";
//echo json_encode($cons1->actualizarPeriodoAcademico($id; $descripcion; $fecha_inicio; $fecha_fin; $estado));
//echo json_encode($cons1->obtenerPeriodosAcademicos());
//echo json_encode($cons1->estadoPeriodoAcademico($id; $estado));
//$id=1;
//$descripcion="Imparticion de clases presenciales; virtuales o en linea; de caracter teorico o practico.";
//$codigo="AD1";
//echo json_encode($cons1->guardarActividadDocente($descripcion; $codigo));
//echo json_encode($cons1->obtenerActividadesDocentes());
//$id_actividad_docente=1;
//$id_usuario=1;
//echo json_encode($cons1->asignarActividadDocente($id_actividad_docente; $id_usuario));
//echo json_encode($cons1->login('jalojaj@unl.edu.ec'; 'jose1234'));
//$cadena = "ja lojaj@unl.edu.ec";
//echo $cadena;
//$cadena=str_replace(' '; ''; $cadena);

//print_r($cons1->obtUserCorreo('jalojaj@unl.edu.ec'));
//$roles=array('roles'=>$cons1->obtenerRolesUsuarios(1));
//echo json_encode($cons1->obtenerDatosUsuariosId(1));
//echo "EL usuario es: ".$cons1->getUserWithCode("1581217789YHKFGVOG")->id_persona;
//echo json_encode($cons1->eliminarRol(1));
//echo json_encode($cons1->asignarActividadDocente(1;1;37));
//$fecha = date('2020-11-10');
//$nuevafecha = strtotime ( '+30 day' , strtotime ( $fecha ) ) ;
//$nuevafecha = date ( 'Y-m-j' , $nuevafecha );
//echo json_encode($cons1->obtenerPeriodoAcademicoGracia($fecha));
//echo json_encode($cons1->obtUsActAsigPerActualUsuario(1,1));
//echo json_encode($cons1->guardarPeriodoAcademico("2022-01-31", "2022-06-30", "Inactivo", "Semestre Enero - Junio 2022", "2022-07-30"));
$dir = new Directorios();
$semestre = "semestre-2019";
echo($dir->crearDirectorioSemestre($semestre));
$micarpeta = "../../assets/docs/Portafolio UNL/".$semestre;
if (!file_exists($micarpeta)) {
    echo mkdir($micarpeta, 0777, true);
}else{
    echo "no se cre�";
}



?>