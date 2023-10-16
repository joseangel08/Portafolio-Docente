<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../src/db/Consultas.php';
$app = new \Slim\App;
require '../src/rutas/Rutas.php';
require '../src/controlador/RolController.php';
require '../src/modelo/Rol.php';
require '../src/controlador/DocenteController.php';
require '../src/modelo/Docente.php';
require '../src/controlador/UsuarioController.php';
require '../src/modelo/Usuario.php';
require '../src/controlador/CarreraController.php';
require '../src/modelo/Carrera.php';
require '../src/modelo/ActividadDocente.php';   
require '../src/controlador/ActividadDocenteController.php';
require '../src/modelo/PeriodoAcademico.php';
require '../src/controlador/PeriodoAcademicoController.php';
require '../src/modelo/PortafolioDocente.php';
require '../src/controlador/PortafolioDocenteController.php';
require '../src/modelo/CategoriaDocumento.php';
require '../src/controlador/CategoriaDocumentoController.php';
require '../src/modelo/DocumentoGeneral.php';
require '../src/controlador/DocumentoGeneralController.php';
require '../src/modelo/Documento.php';
require '../src/controlador/DocumentoController.php';

$app->run();
    