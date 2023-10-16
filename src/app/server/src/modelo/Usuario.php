<?php
class Usuario extends ConexionBD{
    private $id;
    private $usuario;
    private $clave;
    private $estado;
    private $id_docente;
    
    public function setId($id){
        $this->id=$id;
    }
    
    public function setUsuario($usuario){
        $this->usuario=$usuario;
    }
    
    public function setClave($clave){
        $this->clave=$clave;
    }
    
    public function setEstado($estado){
        $this->estado=$estado;
    }
    
    public function setId_docente($id_docente){
        $this->id_docente=$id_docente;
    }

    public function getId(){
        return $this->id;
    }
    
    public function getUsuario(){
        return $this->usuario;
    }
    
    public function getClave(){
        return $this->clave;
    }
    
    public function getEstado(){
        return $this->estado;
    }
    
    public function getId_docente(){
        return $this->id_docente;
    }
    
    //Obtener Datos de los Usuarios
    public function obtenerDatosUsuarios(){
        $stmt = $this->bdh->query('SELECT docente.id AS "id_docente", docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.clave, usuario.id_docente, usuario.estado, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN usuario ON docente.id = usuario.id_docente');
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
    //Obtener Datos de los Usuarios por Id
    public function obtenerDatosUsuariosId(){        
        $stmt = $this->bdh->prepare('SELECT docente.id AS "id_docente", docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.estado, usuario.clave, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN
usuario ON docente.id = usuario.id_docente WHERE usuario.id=:id');
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
    //Obtener Datos de los Usuarios por IdPersona
    public function obtenerDatosDocenteId(){
        $stmt = $this->bdh->prepare('SELECT docente.id AS "id_docente", docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.estado, usuario.clave, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN
usuario ON docente.id = usuario.id_docente WHERE docente.id=:id');
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
    //Obtener Datos de los Usuarios luego de loguearse
    public function obtenerDatosUsuarioLogin(){
        $stmt = $this->bdh->prepare('SELECT docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.estado, usuario.clave, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN usuario ON docente.id = usuario.id_docente WHERE usuario.id=:id');
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        $usuarios = $stmt->fetch(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
    
    //Login de usuarios
    public function login(){        
        $resultado=null;
        //$consulta = $this->bdh->prepare("SELECT id, usuario, clave, id_docente, id_rol, estado FROM usuario WHERE upper(usuario)=upper(:usuario) AND clave=:clave");
        $consulta = $this->bdh->prepare("SELECT id, usuario, clave, id_docente, estado FROM usuario WHERE upper(usuario)=upper(:usuario) AND clave=:clave");
        $consulta->execute([":usuario"=>$this->usuario, ":clave"=>$this->clave]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
}

