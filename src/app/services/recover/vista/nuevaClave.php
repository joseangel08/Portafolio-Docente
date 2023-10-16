<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Repositorio Digital del Portafolio Docente
        <?php echo $title; ?>
    </title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href="../../../css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="../../../css/login.css" rel="stylesheet">

</head>

<body>

    <div class="wrapper">
        <div id="formContent">
            <!-- Tabs Titles -->

            <div>
                <h4>Repositorio Digital de Portafolio Docente</b>
                </h4>
            </div>

            <!-- Icon -->
            <div>
                <img src="../../../css/imagenes/lock.png" id="icon" alt="User Icon" />
            </div>

            <!-- Login Form -->
            <form method="POST" action="../controlador/controladorCambioPassword.php">
                <input type="hidden" id="txtIdUsuario" name="txtIdUsuario" placeholder="Código del Usuario" value="<?php $id=$_GET['id']; echo $id;?>">
                <input type="password" id="txtContrasena" name="txtContrasena" placeholder="Nueva Clave">
                <input type="password" id="txtRepetirContrasena" name="txtRepetirContrasena" placeholder="Repetir Clave">
                
                <div class="loginButton">
                    <input id="btnGuardar" name="btnGuardar" type="submit" value="Cambiar Clave" onclick="return comparePassword();">
                </div>
                
            </form>

            <!-- Remind Passowrd -->
            <div id="formFooter">
                <a class="underlineHover" href="http://localhost:4200/">Volver a iniciar sesión</a>
            </div>

        </div>
    </div>

    <script>
         function comparePassword(){
             
                var contrasena = document.getElementById('txtContrasena').value;
                var repetirContrasena = document.getElementById('txtRepetirContrasena').value;
	
                if(contrasena != repetirContrasena){
                    alert('Las contrase�as no coinciden.');
                    return false;
                }else{
                    return true;
                }

            }

    </script>

    <script src="../../../css//jquery.min.js"></script>
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