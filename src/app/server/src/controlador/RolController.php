<?php
class RolController{
    
   private $rol;
    
    public function __construct() {
        $this->rol=new Rol();
    }
    
    public function obtenerRoles() {
        return $this->rol->obtenerRoles();
    }
    
    //Guardar - Crear Rol
    public function guardarRol($peticion) {
        $this->rol->setNombreRol($peticion->getParam('nombre_rol'));
        $this->rol->setEstado($peticion->getParam('estado'));
        return $this->rol->guardarRol();
    }
    
    //Buscar Rol
    public function buscarRol($peticion) {
        $this->rol->setNombreRol($peticion->getParam('nombre_rol'));
        return $this->rol->buscarRol();
    }
    
    //Actualizar
    public function actualizarRol($peticion) {
        $this->rol->setId($peticion->getParam('id'));
        $this->rol->setNombreRol($peticion->getParam('nombre_rol'));
        $this->rol->setEstado($peticion->getParam('estado'));
        return $this->rol->actualizarRoles();
    }
    
    //Activa - Inactivar Roles
    public function activarDesactivarRol($peticion){
        $this->rol->setId($peticion->getParam('id'));
        $this->rol->setEstado($peticion->getParam('estado'));
        return $this->rol->activarDesactivarRol();
    }
    
    //Activa - Inactivar Roles
    public function asignarRolUsuario($peticion){
        $id_periodo_academico = $peticion->getParam('id_periodo_academico');
        $id_usuario = $peticion->getParam('id_usuario');
        $id_rol = $peticion->getParam('id_rol');
        return $this->rol->asignarRolUsuario($id_periodo_academico, $id_usuario, $id_rol);
    }
    
    //Activa - Inactivar Roles
    public function obtenerRolesUsuarios($peticion){
        $id=$peticion->getParam('id');
        return $this->rol->obtenerRolesUsuarios($id);
    }
    
}

