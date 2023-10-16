<?php
class Rol extends ConexionBD{
    private $id;
    private $nombreRol;
    private $estado;
    
    public function setId($id){
        $this->id=$id;
    }
    
    public function setNombreRol($nombreRol){
        $this->nombreRol=$nombreRol;
    }
    public function setEstado($estado){
        $this->estado=$estado;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getNombreRol(){
        return $this->nombreRol;
    }
    
    public function geEstado(){
        return $this->estado;
    }
    
    //Buscar Rol
    public function buscarRol(){
        $nombre_rol=trim($this->nombreRol);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT * FROM rol WHERE upper(nombre_rol) = upper(:nombre_rol)");
        $consulta->execute([":nombre_rol"=>$nombre_rol]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }
        return $resultado;
    }
    
    //Guardar Rol
    public function guardarRol(){
        $ver=null;
        $verificador=$this->buscarRol();
        if($verificador!=null){
            return $ver = ['verificador' => false];
        }else{
            $datos=$this->bdh->prepare("INSERT INTO rol (nombre_rol, estado) VALUES (:nombre_rol, :estado)");
            $datos->bindParam(':nombre_rol', $this->nombreRol);
            $datos->bindParam('estado', $this->estado);
            if($datos->execute()==1){
                return $ver = ['verificador' => true];
            }else{
                return $ver = ['verificador' => false];
            }
        }
        return $ver;
    }    
    
    //Obtener Roles
    public function obtenerRoles(){
        $stmt = $this->bdh->query("SELECT * FROM rol");
        $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $roles;
    }
    
    //Actualizar Roles
    public function actualizarRoles(){
        $val=$this->buscarRol();
        if(($val!=null)&&($val->id!=$this->id)){
            return ['verificador' => false, 'mensaje'=>"El rol ya se encuentra en la Base de Datos.!"];
        }else{
            if($this->verificarAsignacion()==true){
                return ['verificador' => false, 'mensaje'=>"El rol ya esta asignada, no se puede modificar.!"];
            }else{
                $datos=$this->bdh->prepare("UPDATE rol SET nombre_rol =:nombre_rol, estado =:estado WHERE id =:id");
                $datos->bindParam(':nombre_rol', $this->nombreRol);
                $datos->bindParam(':estado', $this->estado);
                $datos->bindParam(':id', $this->id);
                if($datos->execute()==1){
                    return ['verificador' => true, 'mensaje'=>"El Rol se modifico correctamente.!"];
                }else{
                    return ['verificador' => false, 'mensaje'=>"El Rol no se pudo modificar.!"];
                }
            }
        }
    }
    
    //Verificar si el rol ha sido asignado
    public function verificarAsignacion(){
        $verificador=false;
        $consulta = $this->bdh->prepare("SELECT * FROM periodo_academico_roles_usuario WHERE id_rol= :id");
        $consulta->execute([":id"=>$this->id]);
        if($consulta->rowCount()>0){
            $verificador=true;
        }
        return $verificador;
    }
    
    //Activa - Inactivar Roles
    public function activarDesactivarRol(){
        $datos=$this->bdh->prepare("UPDATE rol SET estado =:estado WHERE id =:id");
        $datos->bindParam(':id', $this->id);
        $datos->bindParam(':estado', $this->estado);
        if($datos->execute()==1){
            return ['verificador' => true];
        }else{
            return ['verificador' => false];
        }
    }
    
    //Asignar roles nuevos a usuario
    public function asignarRolUsuario($id_periodo_academico, $id_usuario, $id_rol){
        $datos=$this->bdh->prepare("INSERT INTO periodo_academico_roles_usuario (id_periodo_academico, id_usuario, id_rol) VALUES (:id_periodo_academico, :id_usuario, :id_rol)");
        $datos->bindParam(':id_periodo_academico', $id_periodo_academico);
        $datos->bindParam(':id_usuario', $id_usuario);
        $datos->bindParam(':id_rol', $id_rol);
        if($datos->execute()==1){
            return ['verificador' => true];
        }else{
            return ['verificador' => false];
        }
    }
    
    public function obtenerRolesUsuarios($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT periodo_academico_roles_usuario.id, periodo_academico_roles_usuario.id_rol, periodo_academico_roles_usuario.id_periodo_academico, rol.nombre_rol AS "rol", periodo_academico.descripcion AS "periodo_academico" FROM rol INNER JOIN periodo_academico_roles_usuario
ON rol.id = periodo_academico_roles_usuario.id_rol INNER JOIN periodo_academico ON periodo_academico.id = periodo_academico_roles_usuario.id_periodo_academico
WHERE periodo_academico_roles_usuario.id_usuario=:id');
        $consulta->execute([":id"=>$id]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    } 
    
}

