<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


$app = new \Slim\App;

///////////////////////////////////////////////////////////////
///           RUTAS PARA LA CLASE DOCENTE                   ///
///////////////////////////////////////////////////////////////

//Obtener Docentes
$app->get('/api/obtenerUsuario', function (Request $peticion, Response $respuesta){
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->obtenerDocentes());
});

//Guardar - Crear Docentes
$app->post('/api/guardarUsuario', function (Request $request, Response $respuesta){
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->guardarDocente($request));
});

//Modificar - Actualizar Docentes
$app->post('/api/actualizarDatosDocente', function (Request $request, Response $respuesta){
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->actualizarDatosDocente($request), JSON_UNESCAPED_UNICODE);
});

//Modificar - Datos por parte del docente
$app->post('/api/actualizarUsuario', function (Request $request, Response $respuesta){
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->actualizarDocentes($request), JSON_UNESCAPED_UNICODE);
});

//Obtener Datos Docente por identificacion
$app->post('/api/obtenerUsuarioCedula', function (Request $peticion, Response $respuesta) {
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->obtenerDatosUsuarioDNIPas($peticion));
});

//Verificar si usuario existe en BD por CI / Pasaporte
$app->post('/api/verificarExistenciaUsuario', function (Request $peticion, Response $respuesta) {
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->siExistPasaporteDNIPas($peticion));
});

//Obtener Datos de Docente por Correo
$app->post('/api/obtenerUsuarioCorreo', function (Request $peticion, Response $respuesta) {
    $doc_controller = new DocenteController();
    echo json_encode($doc_controller->obtUserCorreo($peticion));
});

///////////////////////////////////////////////////////////////
///               RUTAS PARA LA CLASE USUARIO               ///
///////////////////////////////////////////////////////////////

//Obtener datos de Usuarios
$app->post('/api/obtenerDatosUsuario', function (Request $request, Response $respuesta){
    $user_controller = new UsuarioController();
    echo json_encode($user_controller->obtenerDatosUsuario());
});

//Login de Usuarios
$app->post('/api/login', function (Request $peticion, Response $respuesta){
    $user_controller = new UsuarioController();
    echo json_encode($user_controller->login($peticion));
});

//Obtener usuario por id
$app->post('/api/obtenerDatosUsuarioId', function (Request $peticion, Response $respuesta) {
    $user_controller = new UsuarioController();
    echo json_encode($user_controller->obtenerDatosUsuariosId($peticion), JSON_UNESCAPED_UNICODE);
});

//Obtener usuario por id_docente
$app->post('/api/obtenerDatosPersonaId', function (Request $peticion, Response $respuesta) {
    $user_controller = new UsuarioController();
    echo json_encode($user_controller->obtenerDatosDocenteId($peticion), JSON_UNESCAPED_UNICODE);
});

//Obtener datos de usuario logueado por id
$app->post('/api/obtenerDatosUsuarioLogin', function (Request $peticion, Response $respuesta) {
    $user_controller = new UsuarioController();
    echo json_encode($user_controller->obtenerDatosUsuarioLogin($peticion), JSON_UNESCAPED_UNICODE);
});


///////////////////////////////////////////////////////////////
///               RUTAS PARA LA CLASE CARRERA               ///
///////////////////////////////////////////////////////////////

//Obtener Carreras
$app->get('/api/obtenerCarreras', function (Request $peticion, Response $respuesta){
    $carrera_controller = new CarreraController();
    echo json_encode($carrera_controller->obtenerCarreras());

});

//Crear Carrera
$app->post('/api/guardarCarrera', function (Request $request, Response $respuesta){
    $car_controller = new CarreraController();
    echo json_encode($car_controller->guardarCarrera($request));
});

//Modificar Carrera
$app->post('/api/modificarCarrera', function (Request $request, Response $respuesta){
    $car_controller = new CarreraController();
    echo json_encode($car_controller->modificarCarrera($request));
});

//Activar-Inactivar Rol
$app->post('/api/actDesacCarrera', function (Request $peticion, Response $respuesta){
    $car_controller = new CarreraController();
    echo json_encode($car_controller->activarDesactivarCarrera($peticion));
});

//Obtener Roles
$app->get('/api/obtenerCarrerasAsignar', function (Request $peticion, Response $respuesta){
    $car_controller = new CarreraController();
    echo json_encode($car_controller->obtenerCarrerasActivas());
});
    
    
///////////////////////////////////////////////////////////////
///               RUTAS PARA LA CLASE ROL                   ///
///////////////////////////////////////////////////////////////

//Obtener Roles
$app->get('/api/obtenerRoles', function (Request $peticion, Response $respuesta){
    $rol_controller = new RolController();
    echo json_encode($rol_controller->obtenerRoles());
});

//Guardar Roles
$app->post('/api/guardarRol', function (Request $peticion, Response $respuesta) {
    $rol_controller = new RolController();
    echo json_encode($rol_controller->guardarRol($peticion), JSON_UNESCAPED_UNICODE);
});

//Buscar - Verificar Rol
$app->post('/api/buscarRol', function (Request $peticion, Response $respuesta) {
    $rol_controller = new RolController();
    echo json_encode($rol_controller->buscarRol($peticion), JSON_UNESCAPED_UNICODE);
});

//Actualizar Roles
$app->post('/api/actualizarRol', function (Request $peticion, Response $respuesta){
    $rol_controller = new RolController();
    echo json_encode($rol_controller->actualizarRol($peticion), JSON_UNESCAPED_UNICODE);
});

//Activar-Inactivar Rol
$app->post('/api/inactivarRol', function (Request $peticion, Response $respuesta){
    $rol_controller = new RolController();
    echo json_encode($rol_controller->activarDesactivarRol($peticion), JSON_UNESCAPED_UNICODE);
});

$app->post('/api/asignarRolUsuario', function (Request $peticion, Response $respuesta){
        $rol_controller = new RolController();
        echo json_encode($rol_controller->asignarRolUsuario($peticion), JSON_UNESCAPED_UNICODE);
});



///////////////////////////////////////////////////////////////
///       RUTAS PARA LA CLASE ACTIVIDAD DOCENTE             ///
///////////////////////////////////////////////////////////////

//Asignar Actividad Docente
$app->post('/api/asignarActividadDocente', function (Request $peticion, Response $respuesta){
    $act_doc_controller = new ActividadDocenteController();
    echo json_encode($act_doc_controller->asignarActividadDocente($peticion), JSON_UNESCAPED_UNICODE);
});

//Obtiene los actividades docentes asignadas de un usuario en un per�odo acad�mico
    $app->post('/api/obtUsActAsigPerActualUsuario', function (Request $peticion, Response $respuesta){
    $act_doc_controller = new ActividadDocenteController();
    echo json_encode($act_doc_controller->obtUsActAsigPerActualUsuario($peticion), JSON_UNESCAPED_UNICODE);
});
    
//Obtiene los actividades docentes asignadas de un usuario o docente
$app->post('/api/obtActDoc', function (Request $peticion, Response $respuesta){
    $act_doc_controller = new ActividadDocenteController();
    echo json_encode($act_doc_controller->obtActDoc($peticion), JSON_UNESCAPED_UNICODE);
});

$app->post('/api/guardarActividadDocente', function (Request $peticion, Response $respuesta) {
    $act_doc_controller = new ActividadDocenteController();
    echo json_encode($act_doc_controller->guardarActividadDocente($peticion), JSON_UNESCAPED_UNICODE);
});

//Actualizar Actividad Docente
$app->post('/api/actualizarActividadDocente', function (Request $peticion, Response $respuesta) {
    $act_doc_controller = new ActividadDocenteController();
    echo json_encode($act_doc_controller->modificarActividadDocente($peticion), JSON_UNESCAPED_UNICODE);
});

///////////////////////////////////////////////////////////////
///        RUTAS PARA LA CLASE PERIODO ACADEMICO            ///
///////////////////////////////////////////////////////////////

$app->post('/api/guardarPeriodoAcademico', function (Request $peticion, Response $respuesta) {
    $periodo_academico = new PeriodoAcademicoController();
    echo json_encode($periodo_academico->guardarPeriodoAcademico($peticion), JSON_UNESCAPED_UNICODE);
});

///////////////////////////////////////////////////////////////
///            RUTAS PARA LA CLASE PORTAFOLIO               ///
///////////////////////////////////////////////////////////////

$app->post('/api/habilitarPortafolioDocente', function (Request $peticion, Response $respuesta) {
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->crearPortafolioDocente($peticion), JSON_UNESCAPED_UNICODE);
});

//Obtener Documentacion General
$app->post('/api/obtDocumentGeneral', function (Request $peticion, Response $respuesta) {
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerDocuGeneral($peticion), JSON_UNESCAPED_UNICODE);
});

//Buscar Protafolio por id de Docente
$app->post('/api/obtPortIdDoc', function (Request $peticion, Response $respuesta) {
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerPortIdDoc($peticion), JSON_UNESCAPED_UNICODE);
});

//Buscar Protafolio por periodo academico
$app->post('/api/obtPortPeriodo', function (Request $peticion, Response $respuesta) {
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerPortPeriodo($peticion), JSON_UNESCAPED_UNICODE);
});

//Buscar ID de Actividad Docente Portafolio
$app->post('/api/obtenerIdPortActiv', function (Request $peticion, Response $respuesta) {
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerIdPortActiv($peticion), JSON_UNESCAPED_UNICODE);
});

//Obtener Documento Actividad Docente
$app->post('/api/obtenerDocumentoActividad', function (Request $peticion, Response $respuesta){
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerDocumentosActividad($peticion));
});

//Obtener Categorias
$app->get('/api/obtenerPortafolios', function (Request $peticion, Response $respuesta){
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerPortafoliosDocentes());
});

//Obtener Portafolio Docente por Id del portafolio
$app->post('/api/obtenerPortDocIdPort', function (Request $peticion, Response $respuesta){
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->obtenerPortDocIdPort($peticion));
});

//Obtener Portafolio Docente por Id del portafolio
$app->post('/api/validarExistPort', function (Request $peticion, Response $respuesta){
    $portafolio = new PortafolioDocenteController();
    echo json_encode($portafolio->validarExistPort($peticion));
});

///////////////////////////////////////////////////////////////
///        RUTAS PARA LA CLASE CATEGORIA DOCUMENTO          ///
///////////////////////////////////////////////////////////////

//Obtener Categorias
$app->get('/api/obtenerCategorias', function (Request $peticion, Response $respuesta){
    $cat_controller = new CategoriaDocumentoController();
    echo json_encode($cat_controller->obtenerCategorias());
});

//Guardar Categoria
$app->post('/api/guardarCategoria', function (Request $peticion, Response $respuesta){
    $cat_controller = new CategoriaDocumentoController();
    echo json_encode($cat_controller->guardarCategoria($peticion));
});

//Modificar Categoria
$app->post('/api/modificarCategoria', function (Request $peticion, Response $respuesta){
    $cat_controller = new CategoriaDocumentoController();
    echo json_encode($cat_controller->modificarCategoria($peticion));
});
        
    
///////////////////////////////////////////////////////////////
///       RUTAS PARA LA CLASE DOCUMENTO GENERAL             ///
///////////////////////////////////////////////////////////////

//Guardar Documento de Actividad Docente
$app->post('/api/guardarDocumentoGeneral', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoGeneralController();
    echo json_encode($documento->guardarDocumentoGeneral($peticion));
});

//Validar Documento Actividad Doncente
$app->post('/api/validarDocGeneral', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoGeneralController();
    echo json_encode($documento->validarDocumentoGeneral($peticion));
});
    
//No Validar Documento Actividad Docente
$app->post('/api/noValidarDocGeneral', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoGeneralController();
    echo json_encode($documento->noValidarDocumentacion($peticion));
});


$app->post('/api/upload', function ($request, $response, $args) {
    $files = $request->getUploadedFiles();
    if (empty($files['newfile'])) {
        throw new Exception('Expected a newfile');
    }
    
    $newfile = $files['newfile'];
    if ($newfile->getError() === UPLOAD_ERR_OK) {
        $uploadFileName = $newfile->getClientFilename();
        $newfile->moveTo("./$uploadFileName");
    }
    // do something with $newfile
});

//Obtener Documento Base64
$app->post('/api/obtenerDocumentoGeneral', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoGeneralController();
    echo json_encode($documento->obtenerDocumentoGeneral($peticion));
});

//Eliminar documento General
$app->post('/api/eliminarDocumentoGeneral', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoGeneralController();
    echo json_encode($documento->eliminarDocumentoGeneral($peticion));
});


///////////////////////////////////////////////////////////////
///         RUTAS PARA LA CLASE DOCUMENTO                   ///
///////////////////////////////////////////////////////////////

//Guardar Documento de Actividad Docente
$app->post('/api/guardarDocumentoActividad', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoController();
    echo json_encode($documento->guardarDocumento($peticion));
});

//Validar Documento Actividad Doncente
$app->post('/api/validarDocumento', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoController();
    echo json_encode($documento->validarDocumentacion($peticion));
});

    //No Validar Documento Actividad Docente
$app->post('/api/noValidarDocumento', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoController();
    echo json_encode($documento->noValidarDocumentacion($peticion));
});

//Eliminar documento
$app->post('/api/eliminarDocumento', function (Request $peticion, Response $respuesta){
    $documento = new DocumentoController();
    echo json_encode($documento->eliminarDocumento($peticion));
});



//Asignar actividad docente
$app->post('/api/obtenerActDocSelect', function (Request $peticion, Response $respuesta){
    $act_doc_controller = new ActividadDocenteController();
    echo json_encode($act_doc_controller->obtActivDocSelec($peticion), JSON_UNESCAPED_UNICODE);
});

//Faltan Arreglar
//Activar-Inactivar Usuarios
$app->post('/api/inactivarUsuario', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id_usuario = $request->getParam('id');
    $estado = $request->getParam('estado');
    echo json_encode($consulta->estadoUsuario($id_usuario, $estado), JSON_UNESCAPED_UNICODE);
});
        
//Obtener Periodos Academicos
$app->get('/api/obtenerPeriodosAcademicos', function (Request $peticion, Response $respuesta){
    $consulta = new Consultas();
    echo json_encode($consulta->obtenerPeriodosAcademicos());
});
            
//crear Per�odos Acad�micos
/*$app->post('/api/guardarPeriodoAcademico', function (Request $peticion, Response $respuesta) {
    $descripcion = $peticion->getParam('descripcion');
    $fecha_inicio = $peticion->getParam('fecha_inicio');
    $fecha_fin = $peticion->getParam('fecha_fin');
    $fecha = date($fecha_fin);
    $fecha_fin_maxima = strtotime ( '+30 day' , strtotime ( $fecha ) ) ;
    $fecha_fin_maxima = date ( 'Y-m-j' , $fecha_fin_maxima );
    $estado = 'Inactivo';
    $consulta = new Consultas();
    //echo $fecha_inicio.$fecha_fin.$estado.$descripcion.$fecha_fin_maxima;
    echo json_encode($consulta->guardarPeriodoAcademico($fecha_inicio, $fecha_fin, $estado, $descripcion, $fecha_fin_maxima));
});*/
    
//crear Per�odos Acad�micos
$app->post('/api/actualizarPeriodoAcademico', function (Request $peticion, Response $respuesta) {
    $id = $peticion->getParam('id');
    $descripcion = $peticion->getParam('descripcion');
    $fecha_inicio = $peticion->getParam('fecha_inicio');
    $fecha_fin = $peticion->getParam('fecha_fin');
    $estado = $peticion->getParam('estado');
    $consulta = new Consultas();
    echo json_encode($consulta->actualizarPeriodoAcademico($id, $descripcion, $fecha_inicio, $fecha_fin, $estado), JSON_UNESCAPED_UNICODE);
});
                    
//Activar-Inactivar Usuarios
$app->post('/api/estadoPeriodoAcademico', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id = $request->getParam('id');
    $estado = $request->getParam('estado');
    echo json_encode($consulta->estadoPeriodoAcademico($id, $estado), JSON_UNESCAPED_UNICODE);
});
                        
$app->get('/api/obtenerActividadesDocentes', function (Request $peticion, Response $respuesta){
    $consulta = new Consultas();
    echo json_encode($consulta->obtenerActividadesDocentes());
});
                            
                          
//Activar-Inactivar Actividad Docente
$app->post('/api/estadoActividadDocente', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id = $request->getParam('id');
    $estado = $request->getParam('estado');
    echo json_encode($consulta->estadoActividadDocente($id, $estado), JSON_UNESCAPED_UNICODE);
});
    
//Asignar Actividad Docente
/*$app->post('/api/asignarActividadDocente', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id_actividad_docente = $request->getParam('id_actividad_docente');
    $id_periodo_academico = $request->getParam('id_periodo_academico');
    $id_usuario = $request->getParam('id_usuario');
    $path_dir_act_docente = $request->getParam('path_directorio');
    echo json_encode($consulta->asignarActividadDocente($id_actividad_docente, $id_periodo_academico, $id_usuario, $path_dir_act_docente), JSON_UNESCAPED_UNICODE);
});*/
                                            
//solo pruebas
$app->post('/api/guardarRolesUsuario', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $roles = $request->getParam('roles');
    $id_usuario = $request->getParam('id_usuario');
    echo json_encode($consulta->guardarRolesUsuarios($roles, $id_usuario), JSON_UNESCAPED_UNICODE);
});
                                                
                                                
$app->post('/api/obtenerRolesUsuario', function (Request $request, Response $respuesta){
    $rol = new RolController();
    echo json_encode($rol->obtenerRolesUsuarios($request), JSON_UNESCAPED_UNICODE);
});
                                                    
                                                    
$app->post('/api/obtenerPeriodoAcademicoActual', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $fecha = $request->getParam('fecha');
    echo json_encode($consulta->obtenerPeriodoAcademicoFecha($fecha), JSON_UNESCAPED_UNICODE);
});
                                                        
                                                        
$app->post('/api/obtenerPeriodoAcademicoGracia', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $fecha = $request->getParam('fecha');
    echo json_encode($consulta->obtenerPeriodoAcademicoGracia($fecha), JSON_UNESCAPED_UNICODE);
});
                                                      
$app->post('/api/obtenerRolesUsuariosPeriodos', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id = $request->getParam('id');
    echo json_encode($consulta->obtenerRolesUsuariosPeriodos($id), JSON_UNESCAPED_UNICODE);
});
                                                                    
//obtener roles del periodo actual
$app->post('/api/obtenerRolesUsuariosPeriodoActual', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id_periodo = $request->getParam('id_periodo_academico');
    $id_usuario = $request->getParam('id_usuario');
    echo json_encode($consulta->obtenerRolesUsuariosPeriodoActual($id_periodo, $id_usuario), JSON_UNESCAPED_UNICODE);
});
                                                                        
$app->post('/api/eliminarRol', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id = $request->getParam('id');
    echo json_encode($consulta->eliminarRol($id), JSON_UNESCAPED_UNICODE);
});
                                                                            
$app->get('/api/obtenerActDocUsuarios', function (Request $peticion, Response $respuesta){
    $consulta = new Consultas();
    echo json_encode($consulta->obtenerActividadesDocentesUsuarios());
});
                                                                                    
//Obtener Usuarios de Actividad Docente Seleccionada en un determinado periodo academico
$app->post('/api/obtUsActAsigPerActual', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id_actividad_docente = $request->getParam('id_actividad_docente');
    $id_periodo_academico = $request->getParam('id_periodo_academico');
    echo json_encode($consulta->obtUsActAsigPerActual($id_actividad_docente, $id_periodo_academico), JSON_UNESCAPED_UNICODE);
});
                                                                                    
                                                                                            
$app->post('/api/obtenerActDocUsuarioSelect', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id = $request->getParam('id');
    echo json_encode($consulta->obtenerActividadesDocentesUsuarioSeleccionado($id), JSON_UNESCAPED_UNICODE);
});
                                                                                                
$app->post('/api/obtenerActDocId', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id_actividad_docente = $request->getParam('id');
    echo json_encode($consulta->buscarActividadDocente($id_actividad_docente), JSON_UNESCAPED_UNICODE);
});
                                                                                                    
$app->post('/api/eliminarUsuarioAD', function (Request $request, Response $respuesta){
    $consulta = new Consultas();
    $id = $request->getParam('id');
    echo json_encode($consulta->eliminarUsuarioAD($id), JSON_UNESCAPED_UNICODE);
});
