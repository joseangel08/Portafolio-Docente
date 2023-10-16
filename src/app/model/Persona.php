<?php
class Persona {
    private $nombre;
    private $apellido;
    private $correo;
    private $usuario;
    
    public function __construct(){
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
}
?>  