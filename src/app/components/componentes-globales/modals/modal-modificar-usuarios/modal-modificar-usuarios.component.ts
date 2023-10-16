import { PeriodoAcademico_Roles_Usuario } from './../../../../model/PeriodoAcademico_Roles_Usuario';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { Carrera } from '../../../../model/Carrera';
import { DataService } from '../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { Rol } from 'src/app/model/Rol';
import { Verificador } from 'src/app/model/Verificador';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-modificar-usuarios',
  templateUrl: './modal-modificar-usuarios.component.html',
  styleUrls: ['./modal-modificar-usuarios.component.css']
})
export class ModalModificarUsuariosComponent implements OnInit {
  public usuario: UsuarioTabla;
  private rol:Rol;
  public carrera:Carrera;
  public verificador:Verificador;
  usuarioActivo : UsuarioTabla;
  roles : PeriodoAcademico_Roles_Usuario [];
  public opcion:string;

  constructor(private authService:AuthService, private servicio: DataService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.opcion="cedula";
    this.obtenerRoles();
    this.obtenerCarreras();
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
  }

  obtenerRoles(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>(this.roles=roles));
  }

  obtenerCarreras(){
    this.servicio.obtenerCarreras().subscribe((carrera:Carrera)=>(this.carrera=carrera));
  }



  modificarUsuario(usuarioForm:NgForm){
      if(usuarioForm.valid){
        if(this.opcion=="cedula"){
          if(this.validarCedula()==true){
            this.modificarUsuarioDNIPas();
          }else{
            this.mensajeCedula();
          }
        }else{
          this.modificarUsuarioDNIPas();
        }
      }else{
        Swal.fire({
          position: 'center',
          type: 'error',
          title: 'El formulario tiene campos obligatorios vacíos. Verifique!',
          showConfirmButton: false,
          timer: 3000
        })
      } 
  }

  modificarUsuarioDNIPas(){
    this.servicio.obtenerUsuarioCedula(this.servicio.usuarioModificar).subscribe(
      data=>{
        if(data!=null){
          if((data.id!=this.servicio.usuarioModificar.id)&&(data.id!=null)){
            this.mensajeNoGuardar("La cedula o pasaporte ya se encuentra registrada en la BD.!");
          }else{
            this.servicio.obtenerUsuarioCorreo(this.servicio.usuarioModificar).subscribe(
              data1=>{
                if(data1!=null){
                  if(data1.id_usuario!=this.servicio.usuarioModificar.id){
                    this.mensajeGuardar("El correo ya se encuentra registrado en la BD......!");
                  }else{
                    return this.servicio.actualizarUsuario(this.servicio.usuarioModificar).subscribe(
                      data2=>{
                        if(data2.verificador==true){
                          this.mensajeGuardar("El usuario se modificó correctamente.!");
                          setTimeout(()=>{
                            location.reload();  
                          },3000);  
                        }else{    
                          this.mensajeNoGuardar("No se pudo modificar el usuario.!");
                        }
                    },
                    error =>{console.log(error);
                    }
                    );
                  }
                }else{
                  return this.servicio.actualizarUsuario(this.servicio.usuarioModificar).subscribe(
                    data2=>{
                      if(data2.verificador==true){
                        this.mensajeGuardar("El usuario se modificó correctamente.!");
                        setTimeout(()=>{
                          location.reload();  
                        },3000);  
                      }else{
                        this.mensajeNoGuardar("No se pudo modificar el usuario.!");
                      }
                  },
                  error =>{console.log(error);
                  }
                  );
                }
              }
            );
          }
        }else{
          this.servicio.obtenerUsuarioCorreo(this.servicio.usuarioModificar).subscribe(
            data1=>{
              if(data1!=null){
                if((data1.id!=this.servicio.usuarioModificar.id_persona)&&(data1.id!=null)){
                  this.mensajeGuardar("El correo ya se encuentra registrado en la BD.!");
                }else{
                  return this.servicio.actualizarUsuario(this.servicio.usuarioModificar).subscribe(
                    data2=>{
                      if(data2.verificador==true){
                        this.mensajeGuardar("El usuario se modificó correctamente.!");
                        setTimeout(()=>{
                          location.reload();  
                        },3000);  
                      }else{
                        this.mensajeNoGuardar("No se pudo modificar el usuario.!");
                      }
                  },
                  error =>{console.log(error);
                  }
                  );
                }
              }else{
                return this.servicio.actualizarUsuario(this.servicio.usuarioModificar).subscribe(
                  data2=>{
                    if(data2.verificador==true){
                      this.mensajeGuardar("El usuario se modificó correctamente.!");
                      setTimeout(()=>{
                        location.reload();  
                      },3000);  
                    }else{
                      this.mensajeNoGuardar("No se pudo modificar el usuario.!");
                    }
                },
                error =>{console.log(error);
                }
                );
              }
            }
          );
        }
      }
    ); 
  }

  mensajeGuardar(mensaje:string){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000
    })
  }

  mensajeNoGuardar(mensaje:string){
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: mensaje,
      showConfirmButton: true
    })
  }

  //Metodo para validar cedula
  validarCedula():boolean{
    var cedula = this.servicio.usuarioModificar.cedula;
    var ced = cedula;
    var cadena = ced.length;
    var i;
    if ( cadena == 10 ){
      var total = 0;
      var digito = parseInt(ced[9])*1;
      for( i=0; i < (cadena-1); i++ ) {
        var mult = 0; 
        if ( ( i%2 ) != 0 ) { 
          total = total + (parseInt (ced[i]) * 1 ); 
        } else { 
          mult = parseInt(ced[i]) * 2; 
        if ( mult > 9 )
          total = total + ( mult - 9 );
        else
          total = total + mult;
        }
      }
      var decena = total / 10;
      decena = Math.floor( decena );
      decena = ( decena + 1 ) * 10;
      var final = ( decena - total );
      if ( ( final == 10 && digito == 0 ) || ( final == digito ) ) {
         return  true;
      } else{
         return false;
      }
    }

  }

  mensajeCedula(){
    Swal.fire({
      position: 'center',
      type: 'error',
      title: 'La cédula ingresada es incorrecta.',
      showConfirmButton: true
    })
  }

}
