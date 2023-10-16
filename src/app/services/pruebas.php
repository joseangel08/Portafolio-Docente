<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
require ("src/Exception.php");
require ("src/PHPMailer.php");
require ("src/SMTP.php");
//Load Composer's autoloader 

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings                   //Enable verbose debug output
    $mail->isSMTP();    
    //Send using SMTP
    $mail->CharSet="UTF-8";
    $mail->Host = "smtp.mail.yahoo.com";
    $mail->SMTPDebug = 1;
    $mail->Port = 465 ; //465 or 587
    $mail->SMTPAuth = true;
    $mail->IsHTML(true);
    
    //Authentication
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = "joan.lj1991@yahoo.es";                   //SMTP username
    $mail->Password   = 'wbquvcwgtxmndkkg';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
    //Recipients
    $mail->setFrom('joan.lj1991@yahoo.es', 'Mailer');
    $mail->addAddress('jalojaj@unl.edu.ec', 'Joe User');     //Add a recipient
    
    
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}