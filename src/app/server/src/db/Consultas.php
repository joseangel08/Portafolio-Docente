<?php
include_once 'ConexionBD.php';
include_once 'Directorios.php';
class Consultas extends ConexionBD{
	public function obtenerdocentes(){
	    $stmt = $this->bdh->query("SELECT * FROM docente");
	    $usuarios = $stmt->fetch(PDO::FETCH_OBJ);
        echo json_encode($usuarios);
        return $usuarios;
    }
    
    public function obtenerDatosUsuarios(){
        $stmt = $this->bdh->query('SELECT docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.clave, usuario.id_docente, usuario.estado, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN usuario ON docente.id = usuario.id_docente');
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
     public function obtenerDatosUsuariosId($id){
        $stmt = $this->bdh->prepare('SELECT docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.estado, usuario.clave, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN usuario ON docente.id = usuario.id_docente WHERE usuario.id=:id');
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $usuarios;
    }
    
    public function obtenerDatosUsuarioLogin($id){
        $stmt = $this->bdh->prepare('SELECT docente.cedula, docente.pasaporte, docente.nombre, docente.apellido, docente.correo, docente.telefono,
docente.celular, docente.direccion, usuario.id, usuario.usuario, usuario.estado, usuario.clave, carrera.nombre AS "carrera"
FROM carrera INNER JOIN docente ON carrera.id = docente.id_carrera INNER JOIN usuario ON docente.id = usuario.id_docente WHERE usuario.id=:id');
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        $usuarios = $stmt->fetch(PDO::FETCH_OBJ);
        return $usuarios;
    }
    public function guardarRol($nombre_rol, $estado){
        $respuesta = null;
        $contador=0;
        $ver=null;
        $verificador=$this->buscarRol($nombre_rol);
        if($verificador){
            return $ver = ['verificador' => false];
        }else{
            $datos=$this->bdh->prepare("INSERT INTO rol (nombre_rol, estado) VALUES (:nombre_rol, :estado)");
            $datos->bindParam(':nombre_rol', $nombre_rol);
            $datos->bindParam('estado', $estado);
            if($datos->execute()==1){
                return $ver = ['verificador' => true];
            }else{
                return $ver = ['verificador' => false];
            }
        }
        return $ver;
    }
    
    public function obtenerRoles(){
        $stmt = $this->bdh->query("SELECT * FROM rol");
        $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $roles;
    }
    
    public function obtenerCarreras(){
        $stmt = $this->bdh->query("SELECT * FROM carrera");
        $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $roles;
    }
    
    
    public function buscarRol($nombre_rol){
        $nombre_rol=trim($nombre_rol);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT * FROM rol WHERE upper(nombre_rol) = upper(:nombre_rol)");
        $consulta->execute([":nombre_rol"=>$nombre_rol]);        
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    public function verificarRol($nombre_rol){
        $nombre_rol=trim($nombre_rol);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT * FROM rol WHERE upper(nombre_rol) = upper(:nombre_rol)");
        $consulta->execute([":nombre_rol"=>$nombre_rol]);
        if($consulta->rowCount()>0){
            return $ver = ['verificador' => true, 'mensaje' => "El rol ya existe en la Base de Datos"];
        }else{
            return $ver = ['verificador' => false, 'mensaje' => "El rol no existe en la Base de Datos"];
        }
    }
       
    //Metodo para logear usuario
    public function login($usuario, $clave){
        $resultado=null;        
        //$consulta = $this->bdh->prepare("SELECT id, usuario, clave, id_docente, id_rol, estado FROM usuario WHERE upper(usuario)=upper(:usuario) AND clave=:clave");
        $consulta = $this->bdh->prepare("SELECT id, usuario, clave, id_docente, estado FROM usuario WHERE upper(usuario)=upper(:usuario) AND clave=:clave");
        $consulta->execute([":usuario"=>$usuario, ":clave"=>$clave]);
        
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }            
        $db = null;
        return $resultado;
    }
    
    //Metodo para obtener usuario por usuario
    public function obtUserUs($usuario){
        $resultado=null;        
        $consulta = $this->bdh->prepare("SELECT id, usuario, clave, id_docente, id_rol, estado FROM usuario WHERE usuario=:usuario");
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
        
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo FROM docente WHERE upper(correo) = upper(:correo)");
        $consulta->execute([":correo"=>$correo]);        
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    //Metodo para obtener usuario por correo
    public function obtUserCorreo($correo){
        $correo=trim($correo);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo FROM docente WHERE correo = :correo");
        $consulta->execute([":correo"=>$correo]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    //Metodo para obtener usuario por cedula
    public function obtUserCedula($cedula){
        $cedula=trim($cedula);
        $resultado=null;        
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo, id_carrera FROM docente WHERE cedula=:cedula");        
        $consulta->execute([":cedula"=>$cedula]);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    //Metodo para obtener usuario por pasaporte
    public function obtUsePasaporte($pasaporte){
        $cedula=trim($pasaporte);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, cedula, pasaporte, nombre, apellido, correo, id_carrera FROM docente WHERE pasaporte=:pasaporte");
        $consulta->execute([":pasaporte"=>$pasaporte]);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    //Metodo para almacenar cada solicitud de cambio de clave
    public function saveRecuperarClave($codigo, $fecha_cambio, $id_docente){
        $consulta = $this->bdh->prepare("SELECT * FROM recuperacion_claves WHERE id_docente=:id_docente");
        $consulta->bindParam(":id_docente", $id_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            //$sql = "UPDATE recuperacion_claves SET (codigo =:codigo, fecha_cambio =:fecha_cambio) WHERE id_docente =:id_docente)";
            $sql = "UPDATE recuperacion_claves SET codigo =:codigo, fecha_cambio =:fecha_cambio WHERE id_docente =:id_docente";
            $query = $this->bdh->prepare($sql);
            $query->bindParam(":codigo", $codigo);
            $query->bindParam(":fecha_cambio", $fecha_cambio);
            $query->bindParam(":id_docente", $id_docente);
        }else{
            $sql = "INSERT INTO recuperacion_claves(codigo, fecha_cambio, id_docente) VALUES (?,?,?)";
            //$parameters = array(':codigo ' => $codigo,':fecha_cambio' => $fechaCambio, ':id_docente ' => $id_docente);
            $query = $this->bdh->prepare($sql);
            $query->bindParam(1, $codigo);     
            $query->bindParam(2, $fecha_cambio);
            $query->bindParam(3, $id_docente);
        }
        return $query->execute();
    } 
    
    public function getUserWithCode($p_codigo){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, codigo, fecha_cambio, id_docente FROM recuperacion_claves WHERE codigo = :p_codigo");
        $consulta->execute([":p_codigo"=>$p_codigo]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }
        $db = null;
        return $resultado;
    }
    
    public function updatePasswordFromRecover($id_docente, $clave){
        //$sql = "UPDATE recuperacion_claves SET (codigo =:codigo, fecha_cambio =:fecha_cambio) WHERE id_docente =:id_docente)";
        $sql = "UPDATE usuario SET clave =:clave WHERE id_docente =:id_docente";
        $query = $this->bdh->prepare($sql);
        $query->bindParam(":id_docente", $id_docente);
        $query->bindParam(":clave", $clave);
        return $query->execute();
    }
    
    //public function guardarUsuario($cedula, $pasaporte, $nombre, $apellido, $correo, $id_carrera, $telefono, $celular, $direccion, $clave, $roles, $estado){
    public function guardarUsuario($cedula, $pasaporte, $nombre, $apellido, $correo, $id_carrera, $telefono, $celular, $direccion, $clave, $estado){
        $contador=0;
        $ver = null;
        $sql = null;
        $correo=str_replace(' ', '', $correo);
        
        //$consulta = "INSERT INTO docente (nombre,apellido,cedula, correo) VALUES (:nombre, :apellido, :cedula, :correo)";
        $datos=$this->bdh->prepare("INSERT INTO docente (cedula, pasaporte, nombre, apellido, correo, id_carrera, telefono, celular, direccion) 
VALUES (:cedula, :pasaporte, :nombre, :apellido, :correo, :id_carrera, :telefono, :celular, :direccion)");
        $datos->bindParam(':cedula', $cedula);
        $datos->bindParam(':pasaporte', $pasaporte);
        $datos->bindParam(':nombre', $nombre);
        $datos->bindParam(':apellido', $apellido);
        $datos->bindParam(':correo', $correo);
        $datos->bindParam(':id_carrera', $id_carrera);
        $datos->bindParam(':telefono', $telefono);
        $datos->bindParam(':celular', $celular);
        $datos->bindParam(':direccion', $direccion);
        
        if($datos->execute()==1){
            $contador++;
        }
        if($cedula!=null){
            $sql="SELECT id FROM docente WHERE cedula=:cedula";
            $datos=$this->bdh->prepare($sql);
            $datos->bindParam(':cedula', $cedula);
            $datos->execute();
        }else{
            $sql="SELECT id FROM docente WHERE pasaporte=:pasaporte";
            $datos=$this->bdh->prepare($sql);
            $datos->bindParam(':pasaporte', $pasaporte);            
            $datos->execute();
        }
        $id = $datos->fetch(PDO::FETCH_OBJ);
        $id_docente=$id->id;
        $datos=$this->bdh->prepare("INSERT INTO usuario (usuario, clave, id_docente, estado) VALUES (:usuario, :clave, :id_docente, :estado)");
        $datos->bindParam(':usuario', $correo);
        $datos->bindParam(':clave', $clave);
        $datos->bindParam(':id_docente', $id_docente);
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
    }
    
    public function actualizarUsuario($id_usuario, $id_docente, $cedula, $pasaporte, $nombre, $apellido, $correo, $id_carrera, $telefono, $celular, $direccion, $estado){
        $contador=0;
        $ver = null;
        //$sql = "UPDATE recuperacion_claves SET codigo =:codigo, fecha_cambio =:fecha_cambio WHERE id_docente =:id_docente";
        $datos=$this->bdh->prepare("UPDATE docente SET cedula =:cedula, pasaporte =:pasaporte, nombre =:nombre, apellido =:apellido, correo =:correo, 
        id_carrera =:id_carrera, telefono =:telefono, celular =:celular, direccion =:direccion WHERE id =:id_docente");
        $datos->bindParam(':cedula', $cedula);
        $datos->bindParam(':pasaporte', $pasaporte);
        $datos->bindParam(':nombre', $nombre);
        $datos->bindParam(':apellido', $apellido);
        $datos->bindParam(':correo', $correo);
        $datos->bindParam(':id_carrera', $id_carrera);
        $datos->bindParam(':telefono', $telefono);
        $datos->bindParam(':celular', $celular);
        $datos->bindParam(':direccion', $direccion);
        $datos->bindParam(':id_docente', $id_docente);
        if($datos->execute()==1){
            $contador++;
        }
        $datos=$this->bdh->prepare("UPDATE usuario SET usuario =:usuario, estado =:estado WHERE id =:id_usuario");
        $datos->bindParam(':usuario', $correo);
        $datos->bindParam(':id_usuario', $id_usuario); 
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
    }
    
    public function actualizarRol($id, $nombre_rol, $estado){
        $contador=0;
        $ver = null;
        $datos=$this->bdh->prepare("UPDATE rol SET nombre_rol =:nombre_rol, estado =:estado WHERE id =:id");
        $datos->bindParam(':nombre_rol', $nombre_rol);
        $datos->bindParam(':estado', $estado);
        $datos->bindParam(':id', $id);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }   
    
    public function estadoUsuario($id_usuario, $estado){
        $datos=$this->bdh->prepare("UPDATE usuario SET estado =:estado WHERE id =:id_usuario");
        $datos->bindParam(':id_usuario', $id_usuario); 
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function estadoRol($id, $estado){
        $datos=$this->bdh->prepare("UPDATE rol SET estado =:estado WHERE id =:id");
        $datos->bindParam(':id', $id);
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function guardarPeriodoAcademico($fecha_inicio, $fecha_fin, $estado, $descripcion, $fecha_fin_maxima){
        //echo "Datos 2.....".$fecha_inicio.$fecha_fin.$estado.$descripcion.$fecha_fin_maxima;
        $datos=$this->bdh->prepare("INSERT INTO periodo_academico (fecha_inicio, fecha_fin, estado, descripcion, fecha_fin_maxima, path_dir_periodo) VALUES (:fecha_inicio, :fecha_fin,
:estado, :descripcion, :fecha_fin_maxima, :path)");
        $datos->bindParam(':fecha_inicio', $fecha_inicio);
        $datos->bindParam(':fecha_fin', $fecha_fin);
        $datos->bindParam(':estado', $estado);
        $datos->bindParam(':descripcion', $descripcion);
        $path = "../../../assets/docs/Portafolio UNL/".$descripcion;
        $datos->bindParam(':path', $path);
        $datos->bindParam(':fecha_fin_maxima', $fecha_fin_maxima);
        $dir = new Directorios();
        if($dir->crearDirectorioSemestre($path)==TRUE){
            if ($datos->execute()==1){
                return ['verificador' => true, 'mensaje' => "El periodo academico se creó correctamente."];
            }else{
                return ['verificador' => false, 'mensaje' => "No se pudo crear el período académico."];
            }
        }else{
            return ['verificador' => false, 'mensaje' => "No se pudo crear el directorio. El Periodo académico no se pudo crear."];
        }
    }
    
    public function obtenerPeriodosAcademicos(){
        $stmt = $this->bdh->query("SELECT * FROM periodo_academico");
        $periodosAcademicos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $periodosAcademicos;
    }
    
    public function obtenerPeriodoAcademicoFecha($fecha){
        $resultado=null;
        //$consulta = $this->bdh->prepare("SELECT * FROM periodo_academico WHERE fecha_fin = :fecha_fin");
        $consulta = $this->bdh->prepare("SELECT * FROM periodo_academico WHERE :fecha >= fecha_inicio AND :fecha <= fecha_fin AND estado='Activo'");
        $consulta->execute([":fecha"=>$fecha]);        
        if($consulta->rowCount()>0){   
            return $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{          
            return null;
        }
    }
    
    public function obtenerPeriodoAcademicoGracia($fecha){
        $resultado=null;
        //$consulta = $this->bdh->prepare("SELECT * FROM periodo_academico WHERE fecha_fin = :fecha_fin");
        $consulta = $this->bdh->prepare("SELECT * FROM periodo_academico WHERE :fecha >= fecha_fin AND :fecha <= fecha_fin_maxima");
        $consulta->execute([":fecha"=>$fecha]);
        if($consulta->rowCount()>0){
            return $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            return $resultado = null;
        }
        $db = null;
    }
    
    public function actualizarPeriodoAcademico($id, $descripcion, $fecha_inicio, $fecha_fin, $estado){
        $ver = null;
        $datos=$this->bdh->prepare("UPDATE periodo_academico SET descripcion =:descripcion, fecha_inicio =:fecha_inicio, fecha_fin =:fecha_fin, estado =:estado WHERE id =:id");
        $datos->bindParam(':id', $id);
        $datos->bindParam(':descripcion', $descripcion);
        $datos->bindParam(':fecha_inicio', $fecha_inicio);
        $datos->bindParam(':fecha_fin', $fecha_fin);
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function estadoPeriodoAcademico($id, $estado){
        $datos=$this->bdh->prepare("UPDATE periodo_academico SET estado =:estado WHERE id =:id");
        $datos->bindParam(':id', $id);
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function guardarActividadDocente($descripcion, $codigo, $estado){
        $ver=null;
        $datos=$this->bdh->prepare("INSERT INTO actividad_docente (descripcion, codigo, estado) VALUES (:descripcion, :codigo, :estado)");
        $datos->bindParam(':descripcion', $descripcion);
        $datos->bindParam(':codigo', $codigo);
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function obtenerActividadesDocentes(){
        $stmt = $this->bdh->query("SELECT * FROM actividad_docente");
        $actividades_docentes = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $actividades_docentes;
    }
    
    public function actualizarActividadesDocentes($id, $descripcion, $codigo){
        $ver = null;;
        //$sql = "UPDATE recuperacion_claves SET codigo =:codigo, fecha_cambio =:fecha_cambio WHERE id_docente =:id_docente";
        $datos=$this->bdh->prepare("UPDATE actividad_docente SET descripcion =:descripcion, codigo =:codigo WHERE id =:id");
        $datos->bindParam(':id', $id);
        $datos->bindParam(':descripcion', $descripcion);
        $datos->bindParam(':codigo', $codigo);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function estadoActividadDocente($id, $estado){
        $datos=$this->bdh->prepare("UPDATE actividad_docente SET estado =:estado WHERE id =:id");
        $datos->bindParam(':id', $id);
        $datos->bindParam(':estado', $estado);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
   
    /*
    public function asignarActividadDocente($id_actividad_docente, $id_periodo_academico, $id_usuario){
        $datos=$this->bdh->prepare("INSERT INTO actividad_docente_usuario (id_actividad_docente, id_periodo_academico, id_usuario) VALUES (:id_actividad_docente, :id_periodo_academico, :id_usuario)");
        $datos->bindParam(':id_actividad_docente', $id_actividad_docente);
        $datos->bindParam(':id_periodo_academico', $id_periodo_academico);
        $datos->bindParam(':id_usuario', $id_usuario);
        if($datos->execute()==1){
            return $ver = ['verificador' => true, 'mensaje'=> 'La actividad docente se asignado correctamente.!'];
        }else{
            return $ver = ['verificador' => false, 'mensaje'=> 'La actividad docente no se asigno.!'];
        }
    }*/
    
    //Metodos de Prueba
    public function guardarRolesUsuarios($rol, $id_usuario){
        $respuesta = null;
        $contador=0;
        $ver=null;
        $rol=json_encode($rol);
        //$rol= base64_encode($rol);
        $datos=$this->bdh->prepare("INSERT INTO prueba (roles, id_usuario) VALUES (:rol, :id_usuario)");
        $datos->bindParam(':rol', $rol);
        $datos->bindParam(':id_usuario', $id_usuario);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
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
        $db = null;
        return $resultado;
    }  
    
    //Metodo para obtener los roles del periodo actual
    public function obtenerRolesUsuariosPeriodoActual($id_periodo, $id_usuario){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT periodo_academico_roles_usuario.id, periodo_academico_roles_usuario.id_rol, periodo_academico_roles_usuario.id_periodo_academico, 
periodo_academico_roles_usuario.id_usuario, rol.nombre_rol AS "rol", periodo_academico.descripcion AS "periodo_academico" FROM rol INNER JOIN periodo_academico_roles_usuario
ON rol.id = periodo_academico_roles_usuario.id_rol INNER JOIN periodo_academico ON periodo_academico.id = periodo_academico_roles_usuario.id_periodo_academico
WHERE (periodo_academico_roles_usuario.id_periodo_academico=:id_periodo) and (periodo_academico_roles_usuario.id_usuario=:id_usuario)');
        $consulta->bindParam(':id_usuario', $id_usuario);
        $consulta->bindParam(':id_periodo', $id_periodo);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }  
    
    //Asignar roles nuevos a usuario
    public function asignarRolUsuario($id_periodo_academico, $id_usuario, $id_rol){
        $respuesta = null;
        $contador=0;
        $ver=null;
        //$rol=json_encode($rol);
        //$rol= base64_encode($rol);
        $datos=$this->bdh->prepare("INSERT INTO periodo_academico_roles_usuario (id_periodo_academico, id_usuario, id_rol) VALUES (:id_periodo_academico, :id_usuario, :id_rol)");
        $datos->bindParam(':id_periodo_academico', $id_periodo_academico);
        $datos->bindParam(':id_usuario', $id_usuario);
        $datos->bindParam(':id_rol', $id_rol);
        if($datos->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    //Obtener roles desde la tabla periodo_academico_roles_usuario para evaluar el momento de guardar
    public function obtenerRolesUsuariosPeriodos($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT id_periodo_academico, id_usuario, id_rol FROM periodo_academico_roles_usuario 
WHERE id_usuario=:id');
        $consulta->execute([":id"=>$id]);
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    public function eliminarRol($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('DELETE FROM periodo_academico_roles_usuario where id =:id');
        $consulta->bindParam(':id', $id);
        if($consulta->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    
    //Obtener actividades docentes de los usuarios para visualizar
    public function obtenerActividadesDocentesUsuarios(){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT actividad_docente_usuario.id, actividad_docente_usuario.id_periodo_academico, actividad_docente_usuario.id_usuario, actividad_docente_usuario.id_actividad_docente,
periodo_academico.descripcion AS "periodo_academico",docente.nombre, docente.apellido, periodo_academico.fecha_inicio, 
periodo_academico.fecha_fin FROM periodo_academico INNER JOIN actividad_docente_usuario 
ON periodo_academico.id = actividad_docente_usuario.id_periodo_academico INNER JOIN usuario 
ON usuario.id =  actividad_docente_usuario.id_usuario INNER JOIN docente ON docente.id = usuario.id_docente');
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    public function obtenerActividadesDocentesSeleccionada($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT actividad_docente_usuario.id, actividad_docente_usuario.id_periodo_academico, 
actividad_docente_usuario.id_docente, actividad_docente_usuario.id_actividad_docente,
periodo_academico.descripcion AS "periodo_academico",docente.nombre, docente.apellido, 
periodo_academico.fecha_inicio, periodo_academico.fecha_fin FROM periodo_academico 
INNER JOIN actividad_docente_usuario ON periodo_academico.id = actividad_docente_usuario.id_periodo_academico 
INNER JOIN usuario ON usuario.id =  actividad_docente_usuario.id_docente 
INNER JOIN docente ON docente.id = usuario.id_docente 
WHERE actividad_docente_usuario.id_actividad_docente = :id');
        $consulta->bindParam(':id', $id);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
//Obtiene los usuarios de la actividad seleccionada en un determinado periodo academico
    public function obtUsActAsigPerActual($id_actividad_docente, $id_periodo_academico){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT actividad_docente_portafolio.id_portafolio_docente, portafolio_docente.id_docente,
docente.nombre, docente.apellido, periodo_academico.descripcion AS "periodo_academico" from actividad_docente_portafolio 
INNER JOIN portafolio_docente ON portafolio_docente.id =actividad_docente_portafolio.id_portafolio_docente 
INNER JOIN docente ON portafolio_docente.id_docente = docente.id
INNER JOIN periodo_academico ON portafolio_docente.id_periodo_academico = periodo_academico.id
WHERE actividad_docente_portafolio.id_actividad_docente=:id_actividad_docente AND portafolio_docente.id_periodo_academico =:id_periodo_academico');
        $consulta->bindParam(':id_actividad_docente', $id_actividad_docente);
        $consulta->bindParam(':id_periodo_academico', $id_periodo_academico);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    
    //Obtiene los actividades docentes asignadas de un usuario en un per�odo acad�mico
    public function obtUsActAsigPerActualUsuario($id_usuario, $id_periodo_academico){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT actividad_docente_usuario.id, actividad_docente_usuario.id_periodo_academico, actividad_docente_usuario.id_usuario,
actividad_docente_usuario.id_actividad_docente, periodo_academico.descripcion AS "periodo_academico", docente.nombre,
docente.apellido, actividad_docente.descripcion AS "descripcion_actividad", actividad_docente.codigo AS "codigo_actividad",
periodo_academico.fecha_inicio, periodo_academico.fecha_fin FROM periodo_academico
INNER JOIN actividad_docente_usuario ON periodo_academico.id = actividad_docente_usuario.id_periodo_academico
INNER JOIN usuario ON usuario.id =  actividad_docente_usuario.id_usuario
INNER JOIN actividad_docente ON actividad_docente.id =  actividad_docente_usuario.id_actividad_docente
INNER JOIN docente ON docente.id = usuario.id_docente
WHERE (actividad_docente_usuario.id_usuario = :id_usuario)and(actividad_docente_usuario.id_periodo_academico = :id_periodo_academico)');
        $consulta->bindParam(':id_usuario', $id_usuario);
        $consulta->bindParam(':id_periodo_academico', $id_periodo_academico);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
    public function buscarActividadDocente($id){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT * FROM actividad_docente WHERE id =:id");
        $consulta->bindParam(':id', $id);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    public function eliminarUsuarioAD($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('DELETE FROM actividad_docente_usuario where id =:id');
        $consulta->bindParam(':id', $id);
        if($consulta->execute()==1){
            return $ver = ['verificador' => true];
        }else{
            return $ver = ['verificador' => false];
        }
    }
    
    public function obtenerActividadesDocentesUsuarioSeleccionado($id){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT actividad_docente_usuario.id, actividad_docente_usuario.id_periodo_academico, actividad_docente_usuario.id_usuario, 
actividad_docente_usuario.id_actividad_docente, periodo_academico.descripcion AS "periodo_academico", docente.nombre, 
docente.apellido, actividad_docente.descripcion AS "descripcion_actividad", actividad_docente.codigo AS "codigo_actividad",
periodo_academico.fecha_inicio, periodo_academico.fecha_fin FROM periodo_academico 
INNER JOIN actividad_docente_usuario ON periodo_academico.id = actividad_docente_usuario.id_periodo_academico 
INNER JOIN usuario ON usuario.id =  actividad_docente_usuario.id_usuario 
INNER JOIN actividad_docente ON actividad_docente.id =  actividad_docente_usuario.id_actividad_docente 
INNER JOIN docente ON docente.id = usuario.id_docente 
WHERE actividad_docente_usuario.id_usuario = :id');
        $consulta->bindParam(':id', $id);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        $db = null;
        return $resultado;
    }
    
}
?>
