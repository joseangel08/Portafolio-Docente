<?php

class DocenteController{
    private $docente;
    
    public function __construct() {
        $this->docente=new Docente();
    }
    
    //Guardar - Crear Docentes
    public function guardarDocente($request){
        $this->docente->setCedula($request->getParam('cedula'));
        $this->docente->setPasaporte($request->getParam('pasaporte'));
        $this->docente->setNombre($request->getParam('nombre'));
        $this->docente->setApellido($request->getParam('apellido'));
        $this->docente->setCorreo($request->getParam('correo'));
        $this->docente->setId_carrera($request->getParam('id_carrera'));
        $this->docente->setTelefono($request->getParam('telefono'));
        $this->docente->setCelular($request->getParam('celular'));
        $this->docente->setDireccion($request->getParam('direccion'));
        //    $roles = $request->getParam('roles');
        $usuario = new Usuario();
        $usuario->setEstado($request->getParam('estado'));
        $usuario->setClave(substr( md5(microtime()), 1, 8));
        return $this->docente->guardarDocente($usuario);
    }
    
    //Actualizar - Modificar Docentes
    public function actualizarDocentes($request){
        $this->docente->setId($request->getParam('id_docente'));
        $this->docente->setCedula($request->getParam('cedula'));
        $this->docente->setPasaporte($request->getParam('pasaporte'));
        $this->docente->setNombre($request->getParam('nombre'));
        $this->docente->setApellido($request->getParam('apellido'));
        $this->docente->setCorreo($request->getParam('correo'));
        $this->docente->setId_carrera($request->getParam('id_carrera'));
        $this->docente->setTelefono($request->getParam('telefono'));
        $this->docente->setCelular($request->getParam('celular'));
        $this->docente->setDireccion($request->getParam('direccion'));
        $usuario = new Usuario();
        $usuario->setId($request->getParam('id'));
        $usuario->setUsuario($request->getParam('correo'));
        $usuario->setEstado($request->getParam('estado'));
        return $this->docente->actualizarDocente($usuario);      
    }
    
    //Modificar datos por parte de docente
    public function actualizarDatosDocente($request){
        $this->docente->setId($request->getParam('id_docente'));
        $this->docente->setNombre($request->getParam('nombre'));
        $this->docente->setApellido($request->getParam('apellido'));
        $this->docente->setTelefono($request->getParam('telefono'));
        $this->docente->setCelular($request->getParam('celular'));
        $this->docente->setDireccion($request->getParam('direccion'));
        return $this->docente->actualizarDatosDocente();
    }
    
    
    //Obtener Docentes
    public function obtenerDocentes(){
        return $this->docente->obtenerDocentes();
    }
       
    //Obtener Datos de Docente por CI/Pasaporte
    public function obtenerDatosUsuarioDNIPas($request){
        if($request->getParam('cedula')!=null){
            $this->docente->setCedula($request->getParam('cedula'));
            return $this->docente->obtDocCedula();
        }else{
            if($request->getParam('pasaporte')!=null){
                $this->docente->setCedula($request->getParam('cedula'));
                return $this->docente->obtDocePasaporte();
            }else{
                return null;
            }
        }
    }
    
    ////Metodo para buscar usuario existente por ci / pasaporte
    public function siExistPasaporteDNIPas($request){
        if($request->getParam('cedula')!=null){
            $this->docente->setCedula($request->getParam('cedula'));
            $this->docente->setId($request->getParam('id'));
            $this->docente->setCorreo($request->getParam('correo'));
            return $this->docente->siExisteCedula();
        }else{
            if($request->getParam('pasaporte')!=null){
                $this->docente->setPasaporte($request->getParam('pasaporte'));
                $this->docente->setId($request->getParam('id'));
                $this->docente->setCorreo($request->getParam('correo'));
                return $this->docente->siExistePasaporte();
            }else{
                return null;
            }
        }
    }
    
    //Obtener Datos de Docente por Correo
    public function obtUserCorreo($request){
        $this->docente->setCorreo($request->getParam('correo'));
        return $this->docente->obtDoceCorreo();
    }
}

