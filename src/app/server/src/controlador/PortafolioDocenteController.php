<?php
class PortafolioDocenteController{
    private $portafolio;
    
    public function __construct() {
        $this->portafolio = new PortafolioDocente();
    }
    
    //Crear Portafolio Docente
    public function crearPortafolioDocente($peticion){
        $this->portafolio->setId_docente($peticion->getParam('id_docente'));
        $this->portafolio->setId_periodo_academico($peticion->getParam('id_periodo_academico'));
        return $this->portafolio->crearPortafolioDocente();
    }
    
    //Buscar Protafolio por id de Docente
    public function obtenerPortIdDoc($peticion){
        $this->portafolio->setId_docente($peticion->getParam('id_docente'));
        return $this->portafolio->obtenerPortIdDoc();
    }    
    
    //Buscar Protafolio por id de Docente
    public function obtenerPortPeriodo($peticion){
        $this->portafolio->setId_docente($peticion->getParam('id_periodo_academico'));
        $this->portafolio->setId_docente($peticion->getParam('id_docente'));
        return $this->portafolio->obtenerPortIdDoc();
    } 
    
    //Obtener documentación General
    public function obtenerDocuGeneral($peticion){
        $id_docente = $peticion->getParam('id_portafolio');
        return $this->portafolio->obtenerDocuGeneral($id_docente);
    }
    
    //Obtener id de relacion ACtividad Doncente Portafolio
    public function obtenerIdPortActiv($peticion){
        $id_actividad_docente = $peticion->getParam('id_actividad_docente');
        $id_periodo_academico = $peticion->getParam('id_portafolio_docente');
        return $this->portafolio->obtenerIdPortActiv($id_actividad_docente, $id_periodo_academico);
    }
    
    //Obtener documentaciónde Actividades
    public function obtenerDocumentosActividad($peticion){
        $id_portafolio_docente = $peticion->getParam('id_portafolio_docente');
        return $this->portafolio->obtenerDocumentosActividad($id_portafolio_docente);
    }
    
    //Obtener documentaciónde Actividades
    public function obtenerPortafoliosDocentes(){
        return $this->portafolio->obtenerPortafoliosDocentes();
    }
    
    //Obtener Portafolio del Docente por id de portafolio
    public function obtenerPortDocIdPort($peticion){
        $id_portafolio_docente = $peticion->getParam('id_portafolio_docente');
        return $this->portafolio->obtenerPortDocIdPort($id_portafolio_docente);
    }
    
    public function validarExistPort($peticion){
        $this->portafolio->setId_periodo_academico($peticion->getParam('id_periodo_academico'));
        $this->portafolio->setId_docente($peticion->getParam('id_docente'));
        return $this->portafolio->validarExistPort();
    } 
}