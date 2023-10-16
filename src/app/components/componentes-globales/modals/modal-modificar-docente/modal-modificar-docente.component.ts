import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/model/Carrera';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';
import { Rol } from 'src/app/model/Rol';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { Verificador } from 'src/app/model/Verificador';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-modificar-docente',
  templateUrl: './modal-modificar-docente.component.html',
  styleUrls: ['./modal-modificar-docente.component.css']
})
export class ModalModificarDocenteComponent implements OnInit {
  public usuario: UsuarioTabla;
  private rol:Rol;
  public carrera:Carrera;
  public verificador:Verificador;
  usuarioActivo : UsuarioTabla;
  roles : PeriodoAcademico_Roles_Usuario [];
  constructor(private authService:AuthService, private servicio: DataService, private router: Router) { }

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>{
      this.usuarioActivo=usuarios;
    });
  }

  modificarUsuario(usuarioForm:NgForm){
    var resp=null;
    var resp1=null;
      if(usuarioForm.valid){
        return this.servicio.actualizarDatosDocente(this.servicio.usuarioModificar).subscribe(
          data2=>{
            if(data2.verificador==true){
              this.mensajeGuardar(data2.mensaje);
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
