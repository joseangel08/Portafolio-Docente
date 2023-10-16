<?php
class CategoriaDocumento extends ConexionBD{
    private $id;
    private $nombre;
    private $descripcion;
    
    public function setId($id){
        $this->id=$id;
    }
    
    public function setNombre($nombre){
        $this->nombre=$nombre;
    }
    
    public function setDescripcion($descripcion){
        $this->descripcion=$descripcion;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getDescripcion(){
        return $this->descripcion;
    }
    
    public function getNombre(){
        return $this->nombre;
    }
    
    //Obtiene Categorias de Documentos
    public function obtenerCategorias(){
        $resultado = null;
        $consulta = $this->bdh->prepare("SELECT * FROM categoria_documento");
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado=$consulta->fetchAll(PDO::FETCH_OBJ);
        }
        return $resultado;
    }
    
    //Guardar Categoria
    public function guardarCategoria(){
        $ver=null;
        $verificador=$this->buscarCategoria();
        if($verificador){
            return $ver = ['verificador' => false, 'mensaje'=>"La categoria ya se encuentra en la Base de Datos."];
        }else{
            $datos=$this->bdh->prepare("INSERT INTO categoria_documento(nombre, descripcion) VALUES (:nombre, :descripcion)");
            $datos->bindParam(':nombre', $this->nombre);
            $datos->bindParam(':descripcion', $this->descripcion);
            if($datos->execute()==1){
                return $ver = ['verificador' => true, 'mensaje'=>"La categoria se creo correctamente.!"];
            }else{
                return $ver = ['verificador' => false, 'mensaje'=>"La categoria no se pudo modificar.!"];
            }
        }
        return $ver;
    }
    
    //Modificar Categoria
    public function modificarCategoria(){
        $val=$this->buscarCategoria();
        if(($val!=null)&&($val->id!=$this->id)){
            return ['verificador' => false, 'mensaje'=>"La categoria ya se encuentra en la Base de Datos.!"];
        }else{
            if($this->verificarAsignacion()==true){
                return ['verificador' => false, 'mensaje'=>"La categoria ya esta asignada a un documento, no se puede modificar.!"];
            }else{
                $datos=$this->bdh->prepare("UPDATE categoria_documento SET nombre=:nombre, descripcion=:descripcion WHERE id = :id");
                $datos->bindParam(':nombre', $this->nombre);
                $datos->bindParam(':descripcion', $this->descripcion);
                $datos->bindParam(':id', $this->id);
                if($datos->execute()==1){
                    return ['verificador' => true, 'mensaje'=>"La categoria se modifico correctamente.!"];
                }else{
                    return ['verificador' => false, 'mensaje'=>"La categoria no se pudo modificar.!"];
                }
            }
            
        }
    }
    
    //Buscar existenca de carrera
    public function buscarCategoria(){
        $descripcion=trim($this->nombre);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT * FROM categoria_documento WHERE upper(nombre) = upper(:nombre)");
        $consulta->execute([":nombre"=>$descripcion]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }
        return $resultado;
    }
    
    //Verificar si ha sido asignada
    public function verificarAsignacion(){
        $verificador=false;
        $consulta = $this->bdh->prepare("SELECT * FROM documentacion_general WHERE id_categoria= :id");
        $consulta->execute([":id"=>$this->id]);
        if($consulta->rowCount()>0){
            $verificador=true;
        }
        return $verificador;
    }
}

