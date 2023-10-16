<?php
class ActividadDocenteController{
    private $actividad_docente;
    
    public function __construct() {
        $this->actividad_docente=new ActividadDocente();
    }
    
    //Crear actividad docente
    public function guardarActividadDocente($peticion){
        $this->actividad_docente->setDescripcion($peticion->getParam('descripcion'));
        $this->actividad_docente->setNombre($peticion->getParam('nombre'));
        $this->actividad_docente->setCodigo($peticion->getParam('codigo'));
        $this->actividad_docente->setEstado($peticion->getParam('estado'));
        return $this->actividad_docente->guardarActividadDocente();
    }
    
    //Modificar actividad docente
    public function modificarActividadDocente($peticion){
        $this->actividad_docente->setId($peticion->getParam('id'));
        $this->actividad_docente->setNombre($peticion->getParam('nombre'));
        $this->actividad_docente->setDescripcion($peticion->getParam('descripcion'));
        $this->actividad_docente->setCodigo($peticion->getParam('codigo'));
        $this->actividad_docente->setEstado($peticion->getParam('estado'));
        return $this->actividad_docente->modificarActividadDocente();
    }
    
    //Asignar actividad docente
    public function asignarActividadDocente($peticion){
        $id_actividad_docente = $peticion->getParam('id_actividad_docente');
        $id_periodo_academico = $peticion->getParam('id_periodo_academico');
        $id_usuario = $peticion->getParam('id_docente');
        return $this->actividad_docente->asignarActividadDocente($id_actividad_docente, $id_periodo_academico, $id_usuario);
    }
    
    
    public function obtActivDocSelec($peticion){
        $this->actividad_docente->setId($peticion->getParam('id'));
        return $this->actividad_docente->obtActivDocSelec();
    }
    
    //Obtener actividades Docentes de Usuarios en un Periodo Determinado    
    public function obtUsActAsigPerActualUsuario($peticion){
        $id_usuario = $peticion->getParam('id_usuario');
        $id_periodo_academico = $peticion->getParam('id_periodo_academico');
        return $this->actividad_docente->obtUsActAsigPerActualUsuario($id_usuario, $id_periodo_academico);
    }
    
    //Obtiene los actividades docentes asignadas de un usuario o docente
    public function obtActDoc($peticion){
        $id_docente = $peticion->getParam('id_docente');
        return $this->actividad_docente->obtActDoc($id_docente);
    }
}

