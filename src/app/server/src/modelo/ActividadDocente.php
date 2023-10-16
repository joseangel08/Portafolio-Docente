<?php
class ActividadDocente extends ConexionBD{
    private $id;
    private $nombre;
    private $descripcion;
    private $codigo;
    private $estado;
    
    public function setId($id){
        $this->id = $id;
    }
    
    
    public function setNombre($nombre){
        $this->nombre = $nombre;
    }
    
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }
    
    public function setCodigo($codigo){
        $this->codigo = $codigo;
    }
    
    public function setEstado($estado){
        $this->estado = $estado;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getNombre(){
        return $this->nombre;
    }
    
    public function getDescripcion(){
        return $this->descripcion;
    }
    
    public function getCodigo(){
        return $this->codigo;
    }
    
    public function getEstado(){
        return $this->codigo;
    }
    
    //Crear actividad docente
    public function guardarActividadDocente(){
        $ver=null;
        $verificador=$this->buscarActividad();
        if($verificador){
            $ver = ['verificador' => false, 'mensaje'=>"El codigo o el nombre de la Actividad Docente ya se encuentra en la Base de Datos."];
        }else{
            $datos=$this->bdh->prepare("INSERT INTO actividad_docente (nombre, descripcion, codigo, estado) VALUES (:nombre, :descripcion, :codigo, :estado)");
            $datos->bindParam(':nombre', $this->nombre);
            $datos->bindParam(':descripcion', $this->descripcion);
            $datos->bindParam(':codigo', $this->codigo);
            $datos->bindParam(':estado', $this->estado);
            if($datos->execute()==1){
                $ver = ['verificador' => true, 'mensaje'=>"La Actividad Docente se creo correctamente.!"];
            }else{
                $ver = ['verificador' => false, 'mensaje'=>"La Actividad Docente no se pudo modificar.!"];
            }            
        }
        return $ver;
    }
    
    //Modificar actividad docente
    public function modificarActividadDocente(){
        $ver=null;
        $val=$this->buscarActividad();
        if(($val!=null)&&($val->id!=$this->id)){
            return ['verificador' => false, 'mensaje'=>"El codigo o el nombre de la Actividad Docente ya se encuentra en la Base de Datos.!"];
        }else{
            if($this->verificarAsignacion()==true){
                return ['verificador' => false, 'mensaje'=>"La Actividad Docente ya esta asignada, no se puede modificar.!"];
            }else{
                $datos=$this->bdh->prepare("UPDATE actividad_docente SET nombre=:nombre, descripcion=:descripcion, codigo=:codigo, estado=:estado WHERE id = :id");
                $datos->bindParam(':id', $this->id);
                $datos->bindParam(':nombre', $this->nombre);
                $datos->bindParam(':descripcion', $this->descripcion);
                $datos->bindParam(':codigo', $this->codigo);
                $datos->bindParam(':estado', $this->estado);
                if($datos->execute()==1){
                    $ver = ['verificador' => true, 'mensaje'=>"La Actividad Docente se modifico correctamente.!"];
                }else{
                    $ver = ['verificador' => false, 'mensaje'=>"La Actividad Docente no se pudo modificar.!"];
                }
            }
        }
        return $ver;
    }
    
    //Verificar si ha sido asignada
    public function verificarAsignacion(){
        $verificador=false;
        $consulta = $this->bdh->prepare("SELECT * FROM actividad_docente_portafolio WHERE id_actividad_docente = :id");
        $consulta->execute([":id"=>$this->id]);
        if($consulta->rowCount()>0){
            $verificador=true;
        }
        return $verificador;
    }
    
    //Buscar Actividad Docente
    public function buscarActividad(){
        $descripcion=trim($this->nombre);
        $codigo=trim($this->codigo);
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT * FROM actividad_docente WHERE upper(nombre) = upper(:nombre) OR upper(codigo) = upper(:codigo)");
        $consulta->bindParam(':nombre', $descripcion);
        $consulta->bindParam(':codigo', $codigo);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }
        return $resultado;
    }
    
    //Asignar actividad docente
    public function asignarActividadDocente($id_actividad_docente, $id_periodo_academico, $id_docente){
        $portafolio = new PortafolioDocente();
        $port = $portafolio->buscarPortafolioDocente($id_docente);
        $datos=$this->bdh->prepare("INSERT INTO actividad_docente_portafolio (id_actividad_docente, id_portafolio_docente, path_dir_act_docente)
        VALUES (:id_actividad_docente, :id_portafolio_docente, :path_dir_act_docente)");
        $datos->bindParam(':id_actividad_docente', $id_actividad_docente);
        $datos->bindParam(':id_portafolio_docente', $port->id);
        //$path_periodo = $this->buscarPeriodo($id_periodo_academico);
        $cod_act = $this->buscarActividadDocente($id_actividad_docente);
        if($port->path_dir_portafolio!=null&&$cod_act!=null){
            $path = $port->path_dir_portafolio."/".$cod_act->codigo;
            $datos->bindParam(':path_dir_act_docente', $path);
            $dir = new Directorios();
            if($dir->crearDirectorioDocenteActividad($path)){
                if ($datos->execute()==1){
                    return ['verificador' => true, 'mensaje' => "La actividad docente ha sido asignada correctamente."];
                }else{
                    return ['verificador' => false, 'mensaje' => "No se pudo asignar la actividad docente."];
                }
            }else{
                return ['verificador' => false, 'mensaje' => "No se pudo crear el directorio. La actividad ya se encuentra asignada."];
            }
            
        }
    }
    
    //Buscar Usuario por id
    public function buscarUsuarioActividad($id_usuario){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT nombre, apellido FROM docente
WHERE id=:id_usuario");
        $consulta->bindParam(':id_usuario', $id_usuario);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;    
    }
    
    //Buscar periodo
    public function buscarPeriodo($id_periodo_academico){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT path_dir_periodo FROM periodo_academico
WHERE id=:id_periodo");
        $consulta->bindParam(':id_periodo', $id_periodo_academico);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Buscar actividad docente
    public function buscarActividadDocente($id_actividad_docente){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT codigo FROM actividad_docente
WHERE id=:id_actividad");
        $consulta->bindParam(':id_actividad', $id_actividad_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    public function obtActivDocSelec(){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT actividad_docente_portafolio.id_portafolio_docente, portafolio_docente.id_docente,
docente.nombre, docente.apellido, periodo_academico.descripcion AS "periodo_academico" from actividad_docente_portafolio 
INNER JOIN portafolio_docente ON portafolio_docente.id =actividad_docente_portafolio.id_portafolio_docente 
INNER JOIN docente ON portafolio_docente.id_docente = docente.id
INNER JOIN periodo_academico ON portafolio_docente.id_periodo_academico = periodo_academico.id
WHERE actividad_docente_portafolio.id_actividad_docente=:id');
        $consulta->bindParam(':id', $this->id);
        if($consulta->execute()==1){
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
        $consulta = $this->bdh->prepare('SELECT actividad_docente_portafolio.id_portafolio_docente, actividad_docente_portafolio.id_actividad_docente 
AS "id_actividad", portafolio_docente.id_docente,
docente.nombre, docente.apellido, periodo_academico.descripcion AS "periodo_academico", 
actividad_docente.nombre AS "nombre_actividad", actividad_docente.descripcion, actividad_docente.codigo from actividad_docente_portafolio 
INNER JOIN portafolio_docente ON portafolio_docente.id =actividad_docente_portafolio.id_portafolio_docente 
INNER JOIN docente ON portafolio_docente.id_docente = docente.id
INNER JOIN actividad_docente ON actividad_docente.id=actividad_docente_portafolio.id_actividad_docente
INNER JOIN periodo_academico ON portafolio_docente.id_periodo_academico = periodo_academico.id
WHERE (docente.id=:id_usuario and periodo_academico.id =:id_periodo_academico)');
        $consulta->bindParam(':id_usuario', $id_usuario);
        $consulta->bindParam(':id_periodo_academico', $id_periodo_academico);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Obtiene los actividades docentes asignadas de un usuario o docente
    public function obtActDoc($id_docente){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT periodo_academico.descripcion, portafolio_docente.id_periodo_academico, 
actividad_docente.nombre AS "nombre_actividad", actividad_docente.descripcion AS "descipcion_actividad", actividad_docente.codigo FROM actividad_docente_portafolio
INNER JOIN portafolio_docente ON portafolio_docente.id = actividad_docente_portafolio.id_portafolio_docente
INNER JOIN actividad_docente ON actividad_docente.id = actividad_docente_portafolio.id_actividad_docente
INNER JOIN periodo_academico ON periodo_academico.id = portafolio_docente.id_periodo_academico
WHERE portafolio_docente.id_docente=:id_docente');
        $consulta->bindParam(':id_docente', $id_docente);
        if($consulta->execute()==1){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
}

