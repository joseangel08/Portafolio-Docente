<!DOCTYPE html>
<html>

<head>
    <meta http-equiv=”Content-Type” content=”text/html; charset=ISO-8859-1″/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Portafolio Docente
    </title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href="../../css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="../../css/login.css" rel="stylesheet">

</head>

<body>

    <div class="wrapper">
        <div id="formContent">
            <!-- Tabs Titles -->

            <div>
                <h4>
                    <b>Recuperar Contraseña</b>
                </h4>
            </div>

            <!-- Icon -->
            <div>
                <img src="../../css/email.png" id="icon" alt="User Icon" />
            </div>

            <!-- Login Form -->
            <form method="POST" action="controlador/autoload.php">
                <input type="email" id="txtCorreoElectronico" name="txtCorreoElectronico" placeholder="Correo Electrónico">
                
                <div class="loginButton">
                    <input type="submit" value="Enviar Contraseña">
                </div>
                
            </form>

            <!-- Remind Passowrd -->
            <div id="formFooter">
                <a class="underlineHover" href="http://localhost:4200/">Volver a iniciar sesión</a>
            </div>

        </div>
    </div>

    <script src="../../../css/jquery.min.js"></script>
    <script src="../../../css/bootstrap.min.js"></script>

    <?php if(isset($mensaje)){ ?>

        <script>
            
            window.onload = function(){
                alert('<?php echo $mensaje; ?>');
            }
        
        </script>

    <?php } ?>
</body>

</html>