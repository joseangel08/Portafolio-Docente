<?php
class Docente extends ConexionBD{
    private $id;
    private $cedula;
    private $pasaporte;
    private $nombre;
    private $apellido;
    private $correo;
    private $id_carrera;
    private $telefono;
    private $celular;
    private $direccion;
    
    public function setId($id){
        $this->id=$id;
    }
    
    public function setCedula($cedula){
        $this->cedula=$cedula;
    }
    
    public function setPasaporte($pasaporte){
        $this->pasaporte=$pasaporte;
    }
    
    public function setNombre($nombre){
        $this->nombre=$nombre;
    }
    
    public function setApellido($apellido){
        $this->apellido=$apellido;
    }
    
    public function setCorreo($correo){
        $this->correo=$correo;
    }
    
    public function setId_carrera($id_carrera){
        $this->id_carrera=$id_carrera;
    }
    
    public function setTelefono($telefono){
        $this->telefono=$telefono;
    }
    
    public function setCelular($celular){
        $this->celular=$celular;
    }
    
    public function setDireccion($direccion){
        $this->direccion=$direccion;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getCedula(){
        return $this->cedula;
    }
    
    public function getPasaporte(){
        return $this->pasaporte;
    }
    
    public function getNombre(){
        return $this->nombre;
    }
    
    public function getApellido(){
        return $this->apellido;
    }
    
    public function getCorreo(){
        return $this->correo;
    }
    
    public function getId_carrera(){
        return $this->id_carrera;
    }
    
    public function getTelefono(){
        return $this->telefono;
    }
    
    public function getDireccion(){
        return $this->direccion;
    }
    
    //Obtener Datos de Docente
    public function obtenerDocentes(){
        $stmt = $this->bdh->query("SELECT * FROM docente");
        $usuarios = $stmt->fetch(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
    //Crear - Guardar Docentes
    public function guardarDocente($usuario){
        $contador=0;
        $sql = null;
        $id_docente=0;
        $this->correo=str_replace(' ', '', $this->correo);
        //$consulta = "INSERT INTO docente (nombre,apellido,cedula, correo) VALUES (:nombre, :apellido, :cedula, :correo)";
        $datos=$this->bdh->prepare("INSERT INTO docente (cedula, pasaporte, nombre, apellido, correo, id_carrera, telefono, celular, direccion)
VALUES (:cedula, :pasaporte, :nombre, :apellido, :correo, :id_carrera, :telefono, :celular, :direccion)");
        $datos->bindParam(':cedula', $this->cedula);
        $datos->bindParam(':pasaporte', $this->pasaporte);
        $datos->bindParam(':nombre', $this->nombre);
        $datos->bindParam(':apellido', $this->apellido);
        $datos->bindParam(':correo', $this->correo);
        $datos->bindParam(':id_carrera', $this->id_carrera);
        $datos->bindParam(':telefono', $this->telefono);
        $datos->bindParam(':celular', $this->celular);
        $datos->bindParam(':direccion', $this->direccion);        
        if($datos->execute()==1){
            $contador++;
        }
        $datos=null;
        if($this->cedula!=null){
            $datos=$this->bdh->prepare("SELECT id FROM docente WHERE cedula=:cedula");
            $datos->bindParam(':cedula', $this->cedula);
            $datos->execute();
            $id_docente=$datos->fetch(PDO::FETCH_OBJ)->id;
            $datos=null;
        }else{
            $datos=$this->bdh->prepare("SELECT id FROM docente WHERE pasaporte=:pasaporte");
            $datos->bindParam(':pasaporte', $this->pasaporte);
            $datos->execute();
            $id_docente=$datos->fetch(PDO::FETCH_OBJ)->id;
            $datos=null;
        }
        $clave = $usuario->getClave();
        $estado = $usuario->getEstado();
        $datos=$this->bdh->prepare("INSERT INTO usuario (usuario, clave, id_docente, estado) VALUES (:usuario, :clave, :id_docente, :estado)");
        $datos->bindParam(':usuario', $this->correo);
        $datos->bindParam(':clave', $clave);
        $datos->bindParam(':id_docente', $id_docente);
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            $contador++;
        }
        $datos=null;
        if($contador==2){
            return ['verificador' => true];
        }else{
            return ['verificador' => false];
        } 
    }
    
    //Modificar - Actulizar Docente y Usuario
    //Crear - Guardar Docentes
    public function actualizarDocente($usuario){
        $contador=0;
        $ver = null;
        if($this->id!=null&&$usuario->getId()!=null){
            //$sql = "UPDATE recuperacion_claves SET codigo =:codigo, fecha_cambio =:fecha_cambio WHERE id_docente =:id_docente";
            $datos=$this->bdh->prepare("UPDATE docente SET cedula =:cedula, pasaporte =:pasaporte, nombre =:nombre, apellido =:apellido, correo =:correo,
        id_carrera =:id_carrera, telefono =:telefono, celular =:celular, direccion =:direccion WHERE id =:id_docente");
            $datos->bindParam(':cedula', $this->cedula);
            $datos->bindParam(':pasaporte', $this->pasaporte);
            $datos->bindParam(':nombre', $this->nombre);
            $datos->bindParam(':apellido', $this->apellido);
            $datos->bindParam(':correo', $this->correo);
            $datos->bindParam(':id_carrera', $this->id_carrera);
            $datos->bindParam(':telefono', $this->telefono);
            $datos->bindParam(':celular', $this->celular);
            $datos->bindParam(':direccion', $this->direccion);
            $datos->bindParam(':id_docente', $this->id);
            if($datos->execute()==1){
                $contador++;
            }
            $datos=$this->bdh->prepare("UPDATE usuario SET usuario =:usuario, estado =:estado WHERE id =:id_usuario");
            $id_usuario = $usuario->getId();
            $usuario_docente = $usuario->getUsuario();
            $estado = $usuario->getEstado();
            $datos->bindParam(':id_usuario', $id_usuario);
            $datos->bindParam(':usuario', $usuario_docente);
            $datos->bindParam(':estado', $estado);
            if($datos->execute()==1){
                $contador++;
            }
            $datos=null;
            if($contador==2){
                return $ver = ['verificador' => true];
            }else{
                return $ver = ['verificador' => false];
            } 
        }else{
            return $ver = ['verificador' => false];
        }

    }
    
    //Modificar datos por parte de docente
    public function actualizarDatosDocente(){
        if($this->id!=null){
            //$sql = "UPDATE recuperacion_claves SET codigo =:codigo, fecha_cambio =:fecha_cambio WHERE id_docente =:id_docente";
            $datos=$this->bdh->prepare("UPDATE docente SET nombre =:nombre, apellido =:apellido,
telefono =:telefono, celular =:celular, direccion =:direccion WHERE id =:id_docente");
            $datos->bindParam(':nombre', $this->nombre);
            $datos->bindParam(':apellido', $this->apellido);
            $datos->bindParam(':telefono', $this->telefono);
            $datos->bindParam(':celular', $this->celular);
            $datos->bindParam(':direccion', $this->direccion);
            $datos->bindParam(':id_docente', $this->id);
            if($datos->execute()==1){
                return ['verificador' => true, 'mensaje' => "Sus datos fueron actualizados correctamente."];
            }else{
                return ['verificador' => true, 'mensaje' => "Hubo un error al modificar sus datos."];
            } 
        }
        
    }
    
    //Metodo para obtener datos docente por cedula
    public function obtDocCedula(){
        $cedula=trim($this->cedula);
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT docente.id AS "id_docente", docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, correo, docente.id_carrera, 
usuario.id FROM docente 
INNER JOIN usuario ON usuario.id_docente = docente.id
WHERE cedula=:cedula');
        $consulta->execute([":cedula"=>$cedula]);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Metodo para buscar usuario existente por cedula
    public function siExisteCedula(){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo, id_carrera FROM docente 
WHERE (cedula=:cedula and id!=:id) or (correo=UPPER(:correo) and id!=:id)");
        $consulta->bindParam(':cedula', $this->cedula);
        $consulta->bindParam(':id', $this->id);
        $consulta->bindParam(':correo', $this->correo);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Metodo para obtener datos de docente por pasaporte
    public function obtDocePasaporte(){
        $pasaporte=trim($this->pasaporte);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo, id_carrera FROM docente WHERE pasaporte=:pasaporte");
        $consulta->execute([":pasaporte"=>$pasaporte]);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Metodo para buscar usuario existente por pasaporte
    public function siExistePasaporte(){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo, id_carrera FROM docente (pasaporte=:pasaporte and correo=UPPER(:correo) and id!=:id)");
        $consulta->bindParam(':pasaporte', $this->pasaporte);
        $consulta->bindParam(':id', $this->id);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Metodo para obtener usuario por correo
    public function obtDoceCorreo(){
        $correo=trim($this->correo);
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT docente.id AS "id_docente", docente.nombre, docente.apellido, usuario.id AS "id_usuario" FROM usuario
            INNER JOIN docente ON usuario.id_docente =docente.id
            WHERE correo = :correo');
        $consulta->execute([":correo"=>$correo]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Metodo para obtener nombre docente
    public function obtNombreDocente($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT docente.id AS "id_docente", docente.nombre, docente.apellido, usuario.id AS "id_usuario" FROM usuario
INNER JOIN docente ON usuario.id_docente =docente.id
WHERE usuario.id=:id');
        $consulta->execute([":id"=>$id]);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
}