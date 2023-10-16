<?php

class PortafolioDocente extends ConexionBD{
    private $id;
    private $fecha_creacion;
    private $fecha_fin;
    private $estado;
    private $id_periodo_academico;
    private $id_docente;
    private $path_dir_portafolio;
    
    public function setId($id){
        $this->id = $id;
    }
    
    public function setFecha_creacion($fecha_creacion){
        $this->fecha_creacion = $fecha_creacion;        
    }
    
    public function setFecha_fin($fecha_fin){
        $this->fecha_fin = $fecha_fin;
    }
    
    public function setEstado($estado){
        $this->estado = $estado;
    }
    
    public function setId_periodo_academico($id_periodo_academico){
        $this->id_periodo_academico = $id_periodo_academico;
    }
    
    public function setId_docente($id_docente){
        $this->id_docente = $id_docente;
    }
    
    public function setPath_dir_portafolio($path_dir_portafolio){
        $this->path_dir_portafolio = $path_dir_portafolio;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getFecha_creacion(){
        return $this->fecha_creacion;
    }
    
    public function getFecha_fin(){
        return $this->fecha_fin;
    }
    
    public function getEstado(){
        return $this->estado;
    }
    
    public function getId_periodo_academico(){
        return $this->id_periodo_academico;
    }
    
    public function getId_docente(){
        return $this->id_docente;
    }
    
    public function getPath_dir_portafolio(){
        return $this->path_dir_portafolio;
    }
    
    //Crear portafolio docente
    public function crearPortafolioDocente(){
        //$consulta = "INSERT INTO docente (nombre,apellido,cedula, correo) VALUES (:nombre, :apellido, :cedula, :correo)";
        $datos=$this->bdh->prepare("INSERT INTO portafolio_docente (fecha_creacion, fecha_fin, estado, id_periodo_academico, id_docente, path_dir_portafolio)
VALUES (:fecha_creacion, :fecha_fin, :estado, :id_periodo_academico, :id_docente, :path_dir_portafolio)");
        $datos->bindParam(':id_periodo_academico', $this->id_periodo_academico);
        $periodo = new PeriodoAcademico();
        $pat_periodo = $periodo->obtenerPerAcadId($this->id_periodo_academico);
        $datos->bindParam(':fecha_creacion', $pat_periodo->fecha_inicio);
        $datos->bindParam(':fecha_fin', $pat_periodo->fecha_fin_maxima);
        $datos->bindParam(':estado', $pat_periodo->estado);
        $docente = new Docente();
        $doc = $docente->obtNombreDocente($this->id_docente);
        $datos->bindParam(':id_docente', $doc->id_docente);
        $path_dir_portafolio = $pat_periodo->path_dir_periodo."/".$doc->nombre." ".$doc->apellido;
        $rep = strtolower($path_dir_portafolio);
        $borrar = array(" ");
        $path_dir_portafolio = str_replace($borrar, "-", $rep);
        $datos->bindParam(':path_dir_portafolio', $path_dir_portafolio);
        $dir = new Directorios();
        if($dir->crearDirectorioSemestre($path_dir_portafolio)==TRUE){
            if ($datos->execute()==1){
                return ['verificador' => true, 'mensaje' => "El periodo academico se creo correctamente."];
            }else{
                return ['verificador' => false, 'mensaje' => "No se pudo crear el período académico."];
            }
        }else{
            return ['verificador' => false, 'mensaje' => "No se pudo crear el directorio. El Periodo académico no se pudo crear."];
        }
    }
    //Buscar portafolio por id de docente
    public function buscarPortafolioDocente($id){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, fecha_creacion, fecha_fin, id_periodo_academico, id_docente, path_dir_portafolio 
FROM portafolio_docente WHERE id_docente=:id");
        $consulta->bindParam(':id', $id);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Buscar portafolio por id de docente
    public function obtenerPortIdDoc(){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, fecha_creacion, fecha_fin, id_periodo_academico, id_docente, path_dir_portafolio
FROM portafolio_docente WHERE id_docente=:id");
        $id = $this->getId_docente();
        $consulta->bindParam(':id', $id);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Buscar portafolio por id de docente
    public function obtenerPortPeriodo(){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, fecha_creacion, fecha_fin, id_periodo_academico, id_docente, path_dir_portafolio
FROM portafolio_docente WHERE id_periodo_academico=:id_periodo_academico and id_docente=:id_docente");
        $id_docente = $this->getId_docente();
        $id_periodo_academico = $this->getId_periodo_academico();
        $consulta->bindParam(':id_periodo_academico', $id_periodo_academico);
        $consulta->bindParam(':id_docente', $id_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Obtener documentación General de Docente
    public function obtenerDocuGeneral($id_portafolio){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT documentacion_general.id, documentacion_general.id_portafolio_docente, 
documentacion_general.id_categoria, documentacion_general.nombre, documentacion_general.fecha_ingreso, documentacion_general.estado,
documentacion_general.comentario, documentacion_general.observacion, documentacion_general.path_ubicacion
FROM documentacion_general
INNER JOIN portafolio_docente ON portafolio_docente.id=documentacion_general.id_portafolio_docente 
WHERE portafolio_docente.id=:id_portafolio");
        $consulta->bindParam(':id_portafolio', $id_portafolio);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Obtener documentación General de Docente
    public function obtenerIdPortActiv($id_actividad_docente, $id_portafolio_docente){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT id AS "id_act_doc_port" FROM actividad_docente_portafolio WHERE id_actividad_docente = :id_actividad_docente
 AND id_portafolio_docente = :id_portafolio_docente');
        $consulta->bindParam(':id_actividad_docente', $id_actividad_docente);
        $consulta->bindParam(':id_portafolio_docente', $id_portafolio_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Obtener Documentacion de Actividades Docentes
    public function obtenerDocumentosActividad($id_portafolio_docente){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT documento.id AS "id_documento", documento.id_act_doc_port, documento.nombre,
documento.fecha_ingreso, documento.estado, documento.comentario, documento.observacion, documento.path_ubicacion,
actividad_docente_portafolio.id_actividad_docente, actividad_docente_portafolio.id_portafolio_docente, 
actividad_docente.codigo
FROM actividad_docente_portafolio 
INNER JOIN actividad_docente ON actividad_docente_portafolio.id_actividad_docente = actividad_docente.id
INNER JOIN documento ON documento.id_act_doc_port = actividad_docente_portafolio.id
WHERE actividad_docente_portafolio.id_portafolio_docente= :id_portafolio_docente');
        $consulta->bindParam(':id_portafolio_docente', $id_portafolio_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    
    //Obtener Portafolios Docentes
    public function obtenerPortafoliosDocentes(){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT docente.id as "id_docente", docente.nombre, docente.apellido, docente.id_carrera, portafolio_docente.fecha_creacion, 
portafolio_docente.id AS "id_portafolio", portafolio_docente.id_periodo_academico, portafolio_docente.path_dir_portafolio, 
periodo_academico.descripcion AS "descripcion_periodo" FROM portafolio_docente
INNER JOIN docente ON portafolio_docente.id_docente = docente.id
INNER JOIN periodo_academico ON portafolio_docente.id_periodo_academico= periodo_academico.id');
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Obtener Portafolio del Docente por id de portafolio
    public function obtenerPortDocIdPort($id_portafolio_docente){
        $resultado=null;
        $consulta = $this->bdh->prepare('SELECT docente.id as "id_docente", docente.nombre, docente.apellido, docente.id_carrera, portafolio_docente.fecha_creacion,
portafolio_docente.id AS "id_portafolio", portafolio_docente.id_periodo_academico, portafolio_docente.path_dir_portafolio,
periodo_academico.descripcion AS "descripcion_periodo" FROM portafolio_docente
INNER JOIN docente ON portafolio_docente.id_docente = docente.id
INNER JOIN periodo_academico ON portafolio_docente.id_periodo_academico= periodo_academico.id
WHERE portafolio_docente.id =:id_portafolio_docente');
        $consulta->bindParam(':id_portafolio_docente', $id_portafolio_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetchAll(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
    //Validar si un portafolio existe o se ha habilitado al docente
    public function validarExistPort(){
        $resultado=null;
        $consulta = $this->bdh->prepare("SELECT id, fecha_creacion, fecha_fin, id_periodo_academico, id_docente, path_dir_portafolio
FROM portafolio_docente WHERE id_periodo_academico=:id_periodo_academico AND id_docente=:id_docente");
        $consulta->bindParam(':id_periodo_academico', $this->id_periodo_academico);
        $consulta->bindParam(':id_docente', $this->id_docente);
        $consulta->execute();
        if($consulta->rowCount()>0){
            $resultado = $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            $resultado=null;
        }
        return $resultado;
    }
    
}

