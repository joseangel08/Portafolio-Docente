<?php
class DocumentoController{
    private $documento;
    
    public function __construct() {
        $this->documento=new Documento();
    }
    
    //Verificar Funcionamiento
    public function guardarDocumento($peticion){
        $file = $peticion->getUploadedFiles();
        $this->documento->setId_act_docente_port($_POST['id_portafolio_docente']);
        $this->documento->setNombre($_POST['nombre']);
        $this->documento->setFecha_ingreso($_POST['fecha_ingreso']);
        $this->documento->setEstado($_POST['estado']);
        $this->documento->setComentario($_POST['comentario']);
        $this->documento->setObservacion(NULL);
        $this->documento->setPath_ubicacion($_POST['path_ubicacion']);
        return $this->documento->guardarDocumento($file);
    }
    
    public function obtenerDocumentoActividad($peticion){
        $this->documento->setId_act_docente_port($peticion->getParam('id_portafolio_docente'));
        return $this->documento->obtenerDocumentoActividad();
    }
    
    //Validar documento
    public function validarDocumentacion($peticion){
        $this->documento->setId($peticion->getParam('id_documento'));
        $this->documento->setObservacion($peticion->getParam('observacion'));
        return $this->documento->validarDocumentacion();
    }
    
    //No Validar documento
    public function noValidarDocumentacion($peticion){
        $this->documento->setId($peticion->getParam('id_documento'));
        $this->documento->setObservacion($peticion->getParam('observacion'));
        return $this->documento->noValidarDocumentacion();
    }
    
    //Eliminar documento
    public function eliminarDocumento($peticion){
        $this->documento->setId($peticion->getParam('id_documento'));
        $this->documento->setPath_ubicacion($peticion->getParam('path_ubicacion'));
        return $this->documento->eliminarDocumento();
    }
}

