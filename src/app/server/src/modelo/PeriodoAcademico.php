<?php
class PeriodoAcademico extends ConexionBD{
    private $id;
    private $fecha_inicio;
    private $fecha_fin;
    private $estado;
    private $descripcion;
    private $fecha_fin_maxima;
    private $path_dir_periodo;
    
    public function setId($id){
        $this->id = $id;
    }
    
    public function setFecha_inicio($fecha_inicio){
        $this->fecha_inicio = $fecha_inicio;
    }
    
    public function setFecha_fin($fecha_fin){
        $this->fecha_fin = $fecha_fin;
    }
    
    public function setEstado($estado){
        $this->estado = $estado;
    }
    
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }
    
    public function setFecha_fin_maxima($fecha_fin_maxima){
        $this->fecha_fin_maxima = $fecha_fin_maxima;
    }
    
    public function setPath_dir_periodo($path_dir_periodo){
        $this->path_dir_periodo = $path_dir_periodo;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getFecha_inicio(){
        return $this->fecha_inicio;
    }
    
    public function getFecha_fin(){
        return $this->fecha_fin;
    }
    
    public function getEstado(){
        return $this->getEstado();
    }
    
    public function getDescripcion(){
        return $this->descripcion;
    }
    
    public function getFecha_fin_maxima(){
        return $this->fecha_fin_maxima;
    }
    
    public function getPath_dir_periodo(){
        return $this->path_dir_periodo;
    }
    
    
    //Crear Periodo Academico y su respectivo Directorio
    public function guardarPeriodoAcademico(){
        //echo "Datos 2.....".$fecha_inicio.$fecha_fin.$estado.$descripcion.$fecha_fin_maxima;
        $datos=$this->bdh->prepare("INSERT INTO periodo_academico (fecha_inicio, fecha_fin, estado, descripcion, fecha_fin_maxima, path_dir_periodo) VALUES (:fecha_inicio, :fecha_fin,
:estado, :descripcion, :fecha_fin_maxima, :path)");
        $datos->bindParam(':fecha_inicio', $this->fecha_inicio);
        $datos->bindParam(':fecha_fin', $this->fecha_fin);
        $datos->bindParam(':estado', $this->estado);
        $datos->bindParam(':descripcion', $this->descripcion);
        $path = "../../../assets/docs/Portafolio UNL/".$this->descripcion;
        $rep = strtolower($path);
        $borrar = array(" ");
        $path = str_replace($borrar, "-", $rep);
        $datos->bindParam(':path', $path);
        $datos->bindParam(':fecha_fin_maxima', $this->fecha_fin_maxima);
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
    
    //Obtener Directorio de Periodo Academico por ID
    public function obtenerPerAcadId($id){
        //$consulta = $this->bdh->prepare("SELECT * FROM periodo_academico WHERE fecha_fin = :fecha_fin");
        $consulta = $this->bdh->prepare("SELECT path_dir_periodo, fecha_inicio, fecha_fin_maxima, estado FROM periodo_academico WHERE id=:id");
        $consulta->execute([":id"=>$id]);
        if($consulta->rowCount()>0){
            return $consulta->fetch(PDO::FETCH_OBJ);
        }else{
            return ['verificador' => true, 'mensaje'=> 'No existe periodo academico actual.!'];
        }
    }
    
    
}

