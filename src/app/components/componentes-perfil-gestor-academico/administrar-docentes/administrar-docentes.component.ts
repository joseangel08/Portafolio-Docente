import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { Rol } from 'src/app/model/Rol';
import { Verificador } from 'src/app/model/Verificador';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Carrera } from 'src/app/model/Carrera';

@Component({
  selector: 'app-administrar-docentes',
  templateUrl: './administrar-docentes.component.html',
  styleUrls: ['./administrar-docentes.component.css']
})
export class AdministrarDocentesComponent implements OnInit {
  public usuario: UsuarioTabla;
  private rol:Rol;
  public carrera:Carrera;
  public verificador:Verificador;
  usuarioActivo : UsuarioTabla;
  roles : PeriodoAcademico_Roles_Usuario [];
  constructor(private authService:AuthService, private servicio: DataService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerRoles();
    this.obtenerCarreras();
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
  }

  obtenerRoles(){
   // this.servicio.obtenerRolesSistema().subscribe((rol:Rol)=>(this.rol=rol));
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>(this.roles=roles));
  }

  obtenerCarreras(){
    this.servicio.obtenerCarreras().subscribe((carrera:Carrera)=>(this.carrera=carrera));
  }


  modificarUsuario(usuarioForm:NgForm){
    var resp=null;
    var resp1=null;
      if(usuarioForm.valid){
        this.servicio.obtenerUsuarioCedula(this.servicio.usuarioModificar).subscribe(
          data=>{
            if(data!=null){
              if((data.id!=this.servicio.usuarioModificar.id)&&(data.id!=null)){
                this.mensajeGuardar("La cedula ya se encuentra registrada en la BD.!");
              }else{
                this.servicio.obtenerUsuarioCorreo(this.servicio.usuarioModificar).subscribe(
                  data1=>{
                    if(data1!=null){
                      if(data1.id!=this.servicio.usuarioModificar.id){
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
                             this.mensajeNoGuardar();
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
                           this.mensajeNoGuardar();
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
                           this.mensajeNoGuardar();
                          }
                      },
                      error =>{console.log(error);
                      }
                      );
                    }
                  }
                }
              );
            }
          }
        ); 
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

  mensajeGuardar(mensaje:string){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000
    })
  }

  mensajeNoGuardar(){
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: 'El usuario no se pudo guardar en la BD.!'
    })
  }

}
