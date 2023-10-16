<?php
class PeriodoAcademicoController{
    private $periodo_academico;
    
    public function __construct() {
        $this->periodo_academico = new PeriodoAcademico();
    }
    
    public function guardarPeriodoAcademico($request){
        $this->periodo_academico->setFecha_inicio($request->getParam('fecha_inicio'));
        $this->periodo_academico->setFecha_fin($request->getParam('fecha_fin'));
        $this->periodo_academico->setEstado('Inactivo');
        $this->periodo_academico->setDescripcion($request->getParam('descripcion'));
        $fecha = date($this->periodo_academico->getFecha_fin());
        $fecha_fin_maxima = strtotime ( '+30 day' , strtotime ( $fecha ) ) ;
        $this->periodo_academico->setFecha_fin_maxima(date ( 'Y-m-j' , $fecha_fin_maxima ));
        return $this->periodo_academico->guardarPeriodoAcademico();
    }
}

