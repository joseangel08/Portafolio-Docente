<?php

class Carrera extends ConexionBD{
    private $id;
    private $nombre;
    private $descripcion;
    private $estado;
    
    public function setId($id){
        $this->id=$id;
    }
    
    public function setNombre($nombre){
        $this->nombre=$nombre;
    }
    
    public function setDescripcion($descripcion){
        $this->descripcion=$descripcion;
    }
    
    public function setEstado($estado){
        $this->estado=$estado;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function getNombre() {
        return $this->nombre;
    }
    
    public function getDescripcion() {
        return $this->descripcion;
    }
    
    public function getEstado() {
        return $this->estado;
    }
    
    //Guardar Carrera
    public function guardarCarrera(){
        $ver=null;
        $verificador=$this->buscarCarrera();
        if($verificador){
            return $ver = ['verificador' => false, 'mensaje'=>"La carrera ya se encuentra en la Base de Datos."];
        }else{
            $datos=$this->bdh->prepare("INSERT INTO carrera (nombre, descripcion, estado) VALUES (:nombre, :descripcion, :estado)");
            $datos->bindParam(':nombre', $this->nombre);
            $datos->bindParam(':descripcion', $this->descripcion);
            $datos->bindParam(':estado', $this->estado);
            if($datos->execute()==1){
                return $ver = ['verificador' => true, 'mensaje'=>"La carrera se creo correctamente.!"];
            }else{
                return $ver = ['verificador' => false, 'mensaje'=>"La carrera no se pudo modificar.!"];
            }
        }
        return $ver;
    }
    
    //Modificar Carrera
    public function modificarCarrera(){
        $val=$this->buscarCarrera();
        if(($val!=null)&&($val->id!=$this->id)){
            return ['verificador' => false, 'mensaje'=>"La carrera ya se encuentra en la Base de Datos.!"];
        }else{
            if($this->verificarAsignacion()==true){
                return ['verificador' => false, 'mensaje'=>"La carrera ya esta asignada, no se puede modificar.!"];
            }else{
                $datos=$this->bdh->prepare("UPDATE carrera SET nombre=:nombre, descripcion=:descripcion, estado=:estado WHERE id = :id");
                $datos->bindParam(':nombre', $this->nombre);
                $datos->bindParam(':descripcion', $this->descripcion);
                $datos->bindParam(':estado', $this->estado);
                $datos->bindParam(':id', $this->id);
                if($datos->execute()==1){
                    return ['verificador' => true, 'mensaje'=>"La carrera se modifico correctamente.!"];
                }else{
                    return ['verificador' => false, 'mensaje'=>"La carrera no se pudo modificar.!"];
                }
            }
            
        } 
    }
    
    //Obtener Carreras
    public function obtenerCarreras(){
        $stmt = $this->bdh->query("SELECT * FROM carrera");
        $carreras = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $carreras;
    }
    
    //Obtener Carreras
    public function obtenerCarrerasActivas(){
        $stmt = $this->bdh->query("SELECT * FROM carrera WHERE estado='Activo'");
        $carreras = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $carreras;
    }
    
    //Buscar existenca de carrera
    public function buscarCarrera(){
        $nombre=trim($this->nombre);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, nombre, descripcion FROM carrera WHERE upper(nombre) = upper(:nombre)");
        $consulta->execute([":nombre"=>$nombre]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }
        return $resultado;
    }
    
    //Verificar si ha sido asignada
    public function verificarAsignacion(){
        $verificador=false;
        $consulta = $this->bdh->prepare("SELECT * FROM docente WHERE id_carrera = :id");
        $consulta->execute([":id"=>$this->id]);
        if($consulta->rowCount()>0){
            $verificador=true;
        }
        return $verificador;
    }
    
    //Activa - Inactivar Roles
    public function activarDesactivarCarrera(){
        $datos=$this->bdh->prepare("UPDATE carrera SET estado =:estado WHERE id =:id");
        $datos->bindParam(':id', $this->id);
        $datos->bindParam(':estado', $this->estado);
        if($datos->execute()==1){
            return ['verificador' => true];
        }else{
            return ['verificador' => false];
        }
    }
}

