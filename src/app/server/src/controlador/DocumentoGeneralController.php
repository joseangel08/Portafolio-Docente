<?php
class DocumentoGeneralController{
    private $documento_general;
    
    public function __construct() {
        $this->documento_general=new DocumentoGeneral();
    }
    
    public function guardarDocumentoGeneral($peticion){
        $file = $peticion->getUploadedFiles();     
        $this->documento_general->setId_portafolio_docente($_POST['id_portafolio_docente']);
        $this->documento_general->setId_categoria($_POST['id_categoria']);
        $this->documento_general->setNombre($_POST['nombre']);
        $this->documento_general->setFecha_ingreso($_POST['fecha_ingreso']);  
        $this->documento_general->setEstado($_POST['estado']);        
        $this->documento_general->setComentario($_POST['comentario']);
        $this->documento_general->setObservacion(NULL);
        $this->documento_general->setPath_ubicacion($_POST['path_ubicacion']);
        return $this->documento_general->guardarDocumentoGeneral($file);
    }
    
    public function obtenerDocumentoGeneral($peticion){
        $this->documento_general->setId($peticion->getParam('id'));
        return $this->documento_general->obtenerDocumentoGeneral();
    }
    
    //Validar documento
    public function validarDocumentoGeneral($peticion){
        $this->documento_general->setId($peticion->getParam('id_documento'));
        $this->documento_general->setObservacion($peticion->getParam('observacion'));
        return $this->documento_general->validarDocGeneral();
    }
    
    //No Validar documento
    public function noValidarDocumentacion($peticion){
        $this->documento_general->setId($peticion->getParam('id_documento'));
        $this->documento_general->setObservacion($peticion->getParam('observacion'));
        return $this->documento_general->noValidarDocGeneral();
    }
    
    //Eliminar documento
    public function eliminarDocumentoGeneral($peticion){
        $this->documento_general->setId($peticion->getParam('id'));
        $this->documento_general->setPath_ubicacion($peticion->getParam('path_ubicacion'));
        return $this->documento_general->eliminarDocumentoGeneral();
    }
}

