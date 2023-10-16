<?php
include_once 'ConexionBD.php';
class Consultas extends ConexionBD{
    
    //Obtener usuario en tabla recuperacion clave
    public function getUserWithCode($p_codigo){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, codigo, fecha_cambio, id_usuario FROM recuperacion_claves WHERE codigo = :p_codigo");
        $consulta->execute([":p_codigo"=>$p_codigo]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }
        return $resultado;
    }
    
    //Metodo para obtener usuario por usuario
    public function obtUserUs($usuario){
        $resultado=null;        
        $consulta = $this->bdh->prepare("SELECT id, usuario, clave, estado, id_usuario FROM usuario WHERE usuario=:usuario");
        $consulta->execute([":usuario"=>$usuario]);
        
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado='No existe usuario. Usuario o clave incorrecto';
        }
        $db = null;
        return $resultado;
    }
    
    //Metodo para obtener usuario por correo
    public function obtUserEmail($correo){                  
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT docente.nombre, docente.apellido, docente.correo, usuario.id FROM usuario
INNER JOIN docente ON usuario.id_docente = docente.id WHERE docente.correo = :correo");
        $consulta->execute([":correo"=>$correo]);        
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    //Metodo para almacenar cada solicitud de cambio de clave
    public function saveRecuperarClave($codigo, $fecha_cambio, $id_usuario){
        $consulta = $this->bdh->prepare("SELECT * FROM recuperacion_claves WHERE id_usuario=:id_usuario");
        $consulta->bindParam(":id_usuario", $id_usuario);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $sql = "UPDATE recuperacion_claves SET codigo =:codigo, fecha_cambio =:fecha_cambio WHERE id_usuario =:id_usuario";
            $query = $this->bdh->prepare($sql);
            $query->bindParam(":codigo", $codigo);
            $query->bindParam(":fecha_cambio", $fecha_cambio);
            $query->bindParam(":id_usuario", $id_usuario);
        }else{
            $sql = "INSERT INTO recuperacion_claves(codigo, fecha_cambio, id_usuario) VALUES (?,?,?)";
            $query = $this->bdh->prepare($sql);
            $query->bindParam(1, $codigo);
            $query->bindParam(2, $fecha_cambio);
            $query->bindParam(3, $id_usuario);
        }
        return $query->execute();
    }
    
    //Actualizar password
    public function updatePasswordFromRecover($id, $clave){
        //$sql = "UPDATE recuperacion_claves SET (codigo =:codigo, fecha_cambio =:fecha_cambio) WHERE id_docente =:id_docente)";
        $sql = "UPDATE usuario SET clave =:clave WHERE id =:id";
        $query = $this->bdh->prepare($sql);
        $query->bindParam(":id", $id);
        $query->bindParam(":clave", $clave);
        return $query->execute();
    }
    
}


?>
