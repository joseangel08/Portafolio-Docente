<?php
include_once 'ConexionBD.php';
class Directorios{
    public function crearDirectorioSemestre($directorio_semestre){
        if (file_exists($directorio_semestre)) {
            return FALSE;
        }else{
            mkdir($directorio_semestre, 0777, true);
            return TRUE;
        }
    }
    
    public function crearDirectorioDocenteActividad($directorio_docente){
        if (file_exists($directorio_docente)) {
            return FALSE;
        }else{
            mkdir($directorio_docente, 0777, true);
            return TRUE;
        }
    }
}