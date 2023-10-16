<?php
class CategoriaDocumentoController{
    private $categoria;
    
    public function __construct() {
        $this->categoria=new CategoriaDocumento();
    }
    
    public function obtenerCategorias(){
        return $this->categoria->obtenerCategorias();
    }
    
    //Guardar Categoria
    public function guardarCategoria($peticion){
        $this->categoria->setNombre($peticion->getParam('nombre'));
        $this->categoria->setDescripcion($peticion->getParam('descripcion'));
        return $this->categoria->guardarCategoria();
    }
    
    //Modificar Categoria
    public function modificarCategoria($peticion){
        $this->categoria->setNombre($peticion->getParam('nombre'));
        $this->categoria->setDescripcion($peticion->getParam('descripcion'));
        $this->categoria->setId($peticion->getParam('id'));
        return $this->categoria->modificarCategoria();
    }
}

