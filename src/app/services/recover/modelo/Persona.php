<?php
class Persona {
    private $id;
    private $nombre;
    private $apellido;
    private $correo;
    private $usuario;
    private $id_carrera;
    
    public function __construct(){
    }
    
    public function setId($id){
        $this->nombre=$id;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function setNombre($nombre){
        $this->nombre=$nombre;
    }
    
    public function getNombre(){
        return $this->nombre;
    }
    
    public function setApellido($apellido){
        $this->apellido=$apellido;
    }
    
    public function getApellido(){
        return $this->apellido;
    }
    
    public function setCorreo($correo){
        $this->correo=$correo;
    }
    
    public function getCorreo(){
        return $this->correo;
    }
    
    public function setUsuario($usuario){
        $this->usuario=$usuario;
    }
    
    public function getUsuario(){
        return $this->usuario;
    }
    
    public function setId_persona($id_persona){
        $this->nombre=$id_persona;
    }
    
    public function getId_persona(){
        return $this->id_persona;
    }
}
?>  