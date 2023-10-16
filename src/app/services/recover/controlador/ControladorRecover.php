<?php
//namespace Portafolio\Recover;

//use Portafolio\Recuperar\Controlador;
require ("../../src/Exception.php");
require ("../../src/PHPMailer.php");
require ("../../src/SMTP.php");
include_once '../modelo/Consultas.php';
include_once 'Controlador.php';

class ControladorRecover extends Controlador{
    public function index(){
        $this->render('login/index', 'Iniciar Sesi�n', null, false);
    }
    
    public function register(){
        $this->render('login/register', 'Registrar Usuario', null, false);
    }
    public function template(){
        $this->render('login/template', 'Registrar Usuario', null, false);
    }
    
    public function recover(){
        $this->render('login/recover', 'Recuperar Contrase�a', null, false);
    }
    
    //Metodo para generar el codigo de recuperacion
    public function createRandomCode(){
        $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
        srand((double)microtime()*1000000);
        $i = 0;
        $pass = '' ;        
        while ($i <= 7) {
            $num = rand() % 33;
            $tmp = substr($chars, $num, 1);
            $pass = $pass . $tmp;
            $i++;
        }        
        return time().$pass;
    }    
    //Metodo para preparar el mensaje para enviar
    public function emailRecuperacion($correo, $nombre, $codigo){
        //Obtiene la plantilla para enviar el mensaje de resuperacion clave
        //$template = file_get_contents(APP.'view/login/template.php');
        $template = file_get_contents('http://localhost/PortafolioDocente/src/app/services/recover/vista/plantillaRecuperacion.php');
        //Se cambia el nombre del usuario en la plantilla
        $template = str_replace("{{name}}", $nombre, $template);
        //Se configura los valores para los enlaces del boton y el link (los valores se concatenan con el codigo unico)
        //$template = str_replace("{{action_url_2}}", '<b>http:'.URL.'login/newPassword/'.$codigo.'</b>', $template);
        $template = str_replace("{{action_url_2}}", '<b>http://localhost/PortafolioDocente/src/app/services/recover/controlador/newPasswordControler.php?codigo='.$codigo.'</b>', $template);
        $template = str_replace("{{action_url_1}}", 'http://localhost/PortafolioDocente/src/app/services/recover/controlador/newPasswordControler.php?codigo='.$codigo, $template);
        $template = str_replace("{{year}}", date('Y'), $template);      
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->CharSet = "UTF-8";        
        try {
            $mail->isSMTP();
            $mail->CharSet="UTF-8";
            $mail->Host = "smtp.mail.yahoo.com";
            $mail->SMTPDebug = 0;
            $mail->Port = 465 ; //465 or 587
            $mail->SMTPAuth = true;
            
            $mail->Username = 'joan.lj1991@yahoo.es';   //username
            $mail->Password = 'wbquvcwgtxmndkkg';   //password
            $mail->SMTPSecure = 'ssl';                  //smtp port            
            $mail->setFrom('joan.lj1991@yahoo.es', 'Portafolio Docente');
            $mail->addAddress($correo, $nombre);            
            $mail->isHTML(true);            
            $mail->Subject = 'Recuperación de contraseña - Portafolio Docente';
            $mail->Body    = $template;            
            if (!$mail->send()) {
                return false;
            } else {
                return true;
            }
        } catch (Exception $e) {
            return false;
            // echo 'Message could not be sent.';
            // echo 'Mailer Error: ' . $mail->ErrorInfo;
        }
    }
    
    //Metodo para enviar el correo
    public function enviarEmailRecuperacion(){
        if ($_POST["txtCorreoElectronico"]!='') { 
            $correo = $_POST['txtCorreoElectronico'];
            $codigo = $this->createRandomCode();
            $fechaRecuperacion = date("Y-m-d H:i:s", strtotime('+24 hours'));
            $usuario = new Consultas();
            $user = $usuario->obtUserEmail($correo);            
            if ($user==null) {
                $mensaje = 'El correo electrónico no se encuentra registrado en el sistema.';
                header('Location:http://localhost/PortafolioDocente/src/app/services/recover/vista/errorEnviar.php');
            } else {
                $respuesta = $usuario->saveRecuperarClave($codigo, $fechaRecuperacion, $user->id);                
                if ($respuesta) {
                    $this->emailRecuperacion($correo, $user->nombre, $codigo);
                    header('Location:http://localhost/PortafolioDocente/src/app/services/recover/vista/envioExitoso.php');
                } else {
                    header('Location:http://localhost/PortafolioDocente/src/app/services/recover/vista/noEnviar.php');
                }
            }
        } else {
            $mensaje = 'El campo de correo electrónico es requerido.';
            $this->render('http://localhost/PortafolioDocente/src/app/services/recover/recover', 'Recuperar Contraseña', array('mensaje' => $mensaje), false);
        }
    }
    
    
    
    public function newPassword($code = null){
        if (isset($code)) {
            // Instance new Model (Song)
            $userModel = new Consultas();
            // do deleteSong() in model/model.php
            $user = $userModel->getUserWithCode($code);
            
            if ($user == null) {
                $mensaje = 'El código de recuperacion de contrasena no es válido. Por favor intenta de nuevo.';
                $this->render('login/recover', 'Recuperar Contraseña', array('mensaje' => $mensaje), false);
            } else {
                echo json_encode($user);
                $current = date("Y-m-d H:i:s");                
                if (strtotime($current) > strtotime($user->fecha_cambio)) {
                    $mensaje = 'El código de recuperación de contraseña ha expirado. Por favor intenta de nuevo.';
                } else {
                    $id=$user->id;
                    header('Location:http://localhost/PortafolioDocente/src/app/services/recover/vista/nuevaClave.php?id='.$id);
                }
            }
        } else {
            header('location: ' . URL);
        }
    }
    
    public function updatePasswordWithCode($idUsuario, $contrasena, $repetirContrasena){
        if ($contrasena != $repetirContrasena) {                
            $user = new stdClass();
            $user->idUsuario = $idUsuario;    
            header('Location: http:www.google.com');
            $mensaje = 'Las contraseñas no coinciden. Por favor, verifique la información.'.$idUsuario;
            
            return;                
        } else {
            $userModel = new Consultas();            
            //$contrasena = password_hash($contrasena, PASSWORD_BCRYPT);
            $resultado = $userModel->updatePasswordFromRecover($idUsuario, $contrasena);
            if ($resultado != false) {                    
                $mensaje = 'Su contraseña ha sido cambiada con éxito.';
                header('Location: http://localhost:4200/');
                return;
                
            } else {
                $user = new stdClass();
                $user->idUsuario = $idUsuario;
                header('Location: http://www.youtube.com');
                return;
            }
        }
        
    }
}
?>
