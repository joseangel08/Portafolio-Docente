<?php
class Rol{
    private $nombreRol;
    
    private function setNombreRol($nombreRol){
        $this->nombreRol=$nombreRol;
    }
    
    private function getRol(){
        return $this->nombreRol;
    }
}
?>