<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions

class RecuperacionClave{
    public function enviarMensaje($correo, $nombre, $codigo){
        $plantilla = file_get_contents(APP.'recover/PlantillaRecuperacion.php');
        $plantilla = str_replace("{{name}}", $nombre, $plantilla);
        $mail = new PHPMailer(true);
        try {
            //Server settings
            $mail->SMTPDebug = 2;                                       // Enable verbose debug output
            $mail->isSMTP();                                            // Set mailer to use SMTP
            $mail->Host       = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'joan.lj1991@gmail.com';                     // SMTP username
            $mail->Password   = 'Jhoan1606';                               // SMTP password
            $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to
            
            //Recipients
            $mail->setFrom('joan.lj1991@gmail.com', 'ADMINISTRACION');
            $mail->addAddress('joan.lj1991@gmail.com', 'Estimado Usuario');     // Add a recipient
            
            /* Attachments
             $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
             $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name*/
            
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Recuperar Clave';
            $mail->Body    = 'Puttooo Marrano. <b>in bold!</b>';
            $mail->AltBody = 'Es una prueba......';
            
            $mail->send();
            echo 'El mensaje se envio correctamente...';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
        
    }
}
