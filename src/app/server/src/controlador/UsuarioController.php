<?php

class UsuarioController{
    private $usuario;
    
    public function __construct(){
        $this->usuario = new Usuario();
    }
    
    public function obtenerDatosUsuario(){
        return $this->usuario->obtenerDatosUsuarios();
    }
    
    public function login($request){
        $this->usuario->setUsuario($request->getParam('usuario'));
        $this->usuario->setClave($request->getParam('clave'));
        return $this->usuario->login();
    }
    
    public function obtenerDatosUsuariosId($request){
        $this->usuario->setId($request->getParam('id'));
        return $this->usuario->obtenerDatosUsuariosId();
    }
    
    //Obtener Datos de los Usuarios por IdPersona
    public function obtenerDatosDocenteId($request){
        $this->usuario->setId($request->getParam('id_docente'));
        return $this->usuario->obtenerDatosDocenteId();
    }
    
    public function obtenerDatosUsuarioLogin($request){
        $this->usuario->setId($request->getParam('id'));
        return $this->usuario->obtenerDatosUsuarioLogin();
    }
    
}

