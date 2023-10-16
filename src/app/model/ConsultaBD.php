<?php 
include_once 'ConexionBD.php';

class ConsultaBD extends ConexionBD{
    private $n;
    public function insertarPersona($nombre, $apellido, $correo ){
        $sql="INSERT INTO persona (nombre, apellido, correo) VALUES (?,?,?)";
        $stmt=$this->bdh->prepare($sql);
        $stmt->bindValue(1, $nombre, PDO::PARAM_STR);
        $stmt->bindValue(2, $apellido, PDO::PARAM_STR);
        $stmt->bindValue(3, $correo, PDO::PARAM_STR);
        if($stmt->execute()){
            echo 'hola'.$stmt->errorCode();
            echo 'Datos Almacenados';
        }else{
            echo 'hola'.$stmt->errorCode();
            echo 'Datos no almacenados';
        }
        $stmt=null;
    }
    
    public function login($usuario, $clave){
        $resultado=null;
        try {
            $consulta = $this->bdh->prepare("SELECT id, usuario, clave, id_persona, id_rol FROM usuario WHERE usuario=:usuario AND clave=:clave");
            $consulta->bindParam("usuario", $usuario,PDO::PARAM_STR) ;
            $consulta->bindParam("clave", $clave,PDO::PARAM_STR) ;
            $res = $consulta->execute();
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
            $db = null;
            
        } catch (Exception $e) {
        }
        return $resultado;
        
    }
    
    public function obtenerPersonas(){
        /*$sql="SELECT * FROM persona";
         foreach ($this->bdh->query($sql)as $row){
         $this->n[]=$row;
         }
         return $this->n;
         $this->bdh=null;*/
        $resultado = $this->bdh->query('SELECT * FROM persona');
        $usuarios = $resultado->fetchAll(PDO::FETCH_OBJ);
        return json_encode($usuarios);
    }
}
?>