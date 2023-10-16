<?php
define('host', 'localhost');
define('db', 'portafolio');
define('password', '1234');
define('user', 'postgres');
include_once 'Persona.php';
include_once 'ConsultaBD.php';
class ConexionBD{
 protected $bdh;
 
 public function __construct(){
     try {
         $this->bdh=new PDO('pgsql:host='.host.'; dbname='.db, user, password);
     } catch (PDOException $e) {
         print 'ERROR'.$e->getMessage()."<br>";
     }
    }
    
    public function getBdh(){
        return $this->bdh;
    }
 
 }
 


?>