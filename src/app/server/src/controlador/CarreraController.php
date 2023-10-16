<?php

class CarreraController{
    private $carrera;
    
    public function __construct() {
        $this->carrera = new Carrera();
    }
    
    //Obtener carreras
    public function obtenerCarreras(){
        return $this->carrera->obtenerCarreras();
    }
    
    //Obtener carreras
    public function obtenerCarrerasActivas(){
        return $this->carrera->obtenerCarrerasActivas();
    }
    
    //Guardar Carrerea
    public function guardarCarrera($peticion){
        $this->carrera->setNombre($peticion->getParam('nombre'));
        $this->carrera->setDescripcion($peticion->getParam('descripcion'));
        $this->carrera->setEstado($peticion->getParam('estado'));
        return $this->carrera->guardarCarrera();
    }
    
    //Modificar Carrera
    public function modificarCarrera($peticion){
        $this->carrera->setId($peticion->getParam('id'));
        $this->carrera->setNombre($peticion->getParam('nombre'));
        $this->carrera->setDescripcion($peticion->getParam('descripcion'));
        $this->carrera->setEstado($peticion->getParam('estado'));
        return $this->carrera->modificarCarrera();
    }
    
    //Activa - Inactivar Roles
    public function activarDesactivarRol($peticion){
        $this->carrera->setId($peticion->getParam('id'));
        $this->carrera->setEstado($peticion->getParam('estado'));
        return $this->carrera->activarDesactivarCarrera();
    }
}

