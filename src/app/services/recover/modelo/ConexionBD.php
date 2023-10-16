<?php
define('host', 'localhost');
define('db', 'portafolio');
define('password', '1234');
define('user', 'postgres');
class ConexionBD{
 protected $bdh;
 
 public function __construct(){
     try {
         $this->bdh=new PDO('pgsql:host='.host.'; dbname='.db, user, password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
     } catch (PDOException $e) {
         print 'ERROR'.$e->getMessage()."<br>";
     }
    }
    
    public function getBdh(){
        return $this->bdh;
    }
 
 }
 
 


?>