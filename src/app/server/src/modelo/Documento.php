<?php
class Documento extends ConexionBD{
    private $id;
    private $id_act_docente_port;
    private $nombre;
    private $fecha_ingreso;
    private $estado;
    private $comentario;
    private $observacion;
    private $path_ubicacion;
        
    public function setId($id){
        $this->id=$id;
    }
    
    public function setId_act_docente_port($id_act_docente_port){
        $this->id_act_docente_port=$id_act_docente_port;
    }
    
    public function setNombre($nombre){
        $this->nombre=$nombre;
    }
    
    public function setFecha_ingreso($fecha_ingreso){
        $this->fecha_ingreso=$fecha_ingreso;
    }
    
    public function setEstado($estado){
        $this->estado=$estado;
    }
    
    public function setComentario($comentario){
        $this->comentario=$comentario;
    }
    
    public function setObservacion($observacion){
        $this->observacion=$observacion;
    }
    
    public function setPath_ubicacion($path_ubicacion){
        $this->path_ubicacion=$path_ubicacion;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getId_act_docente_port(){
        return $this->id_act_docente_port;
    }
 
    public function getNombre(){
        return $this->nombre;
    }
    
    public function getFechaIngreso(){
        return $this->fecha_ingreso;
    }
    
    public function getEstado(){
        return $this->estado;
    }
    
    public function getComentario(){
        return $this->comentario;
    }
    
    public function getObservacion(){
        return $this->observacion;
    }
    
    public function getPath_ubicacion(){
        return $this->path_ubicacion;
    }
    
    public function cargarDocumento(){
        
    }
    
    //Guardar Documento
    public function guardarDocumento($file){
        if (empty($file['archivo'])) {
            throw new Exception('Expected a newfile');
        }else{
            $archivo = $file['archivo'];
            if ($archivo->getError() === UPLOAD_ERR_OK) {
                $borrar = array(" ");
                $uploadFileName = str_replace($borrar, "", date(time()).$archivo->getClientFilename());
                $archivo->moveTo($this->path_ubicacion."/"."./$uploadFileName");
                $path = $this->path_ubicacion."/".$uploadFileName;
                $consulta=$this->bdh->prepare("INSERT INTO documento(id_act_doc_port, nombre,
fecha_ingreso, estado, comentario, observacion, path_ubicacion) VALUES (:id_act_doc_port, :nombre,
:fecha_ingreso, :estado, :comentario, :observacion, :path_ubicacion)");
                $consulta->bindParam(':id_act_doc_port', $this->id_act_docente_port);
                $consulta->bindParam(':nombre', $this->nombre);
                $consulta->bindParam(':fecha_ingreso', $this->fecha_ingreso);
                $consulta->bindParam(':estado', $this->estado);
                $consulta->bindParam(':comentario', $this->comentario);
                $consulta->bindParam(':observacion', $this->observacion);
                $consulta->bindParam(':path_ubicacion', $path);
                if($consulta->execute()==1){
                    return ['verificador' => true, 'mensaje'=>'El documento se guardó correctamente.!'];
                }else{
                    return ['verificador' => false, 'mensaje'=>'No se pudo guardar la información del documento.!'];
                }
            }else{
                return ['verificador' => false, 'mensaje'=>'No se pudo guardar el documento.!'];
            }
        }
    }
    
    //Guardar documento general
    public function obtenerDocumentoActividad(){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT path_ubicacion FROM documento WHERE id_act_doc_port=:id_act_doc_port");
        $consulta->execute([":id_act_doc_port"=>$this->id_act_docente_port]);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Validar Documento de Actividad
    public function validarDocumentacion(){
        $datos=$this->bdh->prepare("UPDATE documento SET estado =:estado, observacion=:observacion WHERE id =:id");
        $estado = "Validado";
        $datos->bindParam(':estado', $estado);        
        $datos->bindParam(':id', $this->id);
        $datos->bindParam(':observacion', $this->observacion);
        if($datos->execute()==1){
            return ['verificador' => true, 'mensaje'=>'Se ha validado el documento correctamente.!'];
        }else{
            return ['verificador' => false, 'mensaje'=>'No se ha podido validar el documento.!'];
        }
    } 
    
    //No Validar Documento de Actividad
    public function noValidarDocumentacion(){
        $datos=$this->bdh->prepare("UPDATE documento SET estado =:estado, observacion=:observacion WHERE id =:id");
        $estado = "No Validado";
        $datos->bindParam(':estado', $estado);
        $datos->bindParam(':id', $this->id);
        $datos->bindParam(':observacion', $this->observacion);
        if($datos->execute()==1){
            return ['verificador' => true, 'mensaje'=>'No se ha validado el documento.!'];
        }else{
            return ['verificador' => false, 'mensaje'=>'No se pudo realizar la accion.!'];
        }
    } 
    
    //No Validar Documento de Actividad
    public function eliminarDocumento(){
        If (unlink($this->path_ubicacion)) {
            $datos=$this->bdh->prepare("DELETE FROM documento WHERE id =:id");
            $datos->bindParam(':id', $this->id);
            if($datos->execute()==1){
                return ['verificador' => true, 'mensaje'=>'El documento fue borrado correctamente.!'];
            }else{
                return ['verificador' => false, 'mensaje'=>'No se pudo borrar el documento de la base de datos.!'];
            }
        } else {
            return ['verificador' => false, 'mensaje'=>'No se pudo borrar el documento del directorio.!'];
        }
        
    } 
}
