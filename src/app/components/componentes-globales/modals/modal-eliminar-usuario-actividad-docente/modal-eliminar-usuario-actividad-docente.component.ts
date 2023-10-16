import { Rol } from './../../../../model/Rol';
import { ActividadDocenteUsuario } from './../../../../model/ActividadDocenteUsuario';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UsuarioTabla } from './../../../../model/UsuarioTabla';
import { Component, OnInit } from '@angular/core';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-modal-eliminar-usuario-actividad-docente',
  templateUrl: './modal-eliminar-usuario-actividad-docente.component.html',
  styleUrls: ['./modal-eliminar-usuario-actividad-docente.component.css']
})
export class ModalEliminarUsuarioActividadDocenteComponent implements OnInit {
  private usuarios:UsuarioTabla;
  buscar="";
  private actDoc;
  public periodo_academico:PeriodoAcademico;
  usuarioActivo : UsuarioTabla;
  constructor(private servicio: DataService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.obtenerUsuariosSistema();
    this.obtenerPeriodoAcademico();
   this.obtenerDatosUsuario();
   //this.obtenerRolesSistema();
   this.obtenerRolesUsuario();
   //this.obtenerActDocUsuarios();

  }

  obtenerUsuariosSistema(){
    this.servicio.obtenerUsuariosSistema().subscribe((usuarios:UsuarioTabla)=>(this.usuarios=usuarios))
  }


  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
  }
 
  obtenerRolesSistema(){
    this.servicio.obtenerRolesSistema().subscribe((roles:Rol)=>(this.actDoc=roles))
  }
 
  /*obtenerActDocUsuarios(){
   this.servicio.obtenerActDocUsuarios().subscribe(actDoc=>(this.actDoc=actDoc))
 }*/
 
  obtenerRolesUsuario(){
    var id:Number;
    id = Number(this.servicio.usuarioAsignarRol.id);
    //id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:any)=>{
      //(this.roles=roles)
    });
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
  }
 
 
  obtenerPeriodoAcademico(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>(this.periodo_academico=periodo));
   }

   eliminarUsuarioAD(actividad){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })    
    swalWithBootstrapButtons.fire({
      title: 'Desea eliminar el usuario seleccionado?',
      text: "El usuario de la Actvidad Docente se eliminará de la Base de Datos.!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.eliminarUsuarioAD(actividad).subscribe(data=>{
          if(data.verificador==true){
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'El usuario se eliminó correctamente.!',
              showConfirmButton: false,
              timer: 3000
            })
          }else{
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'No se puede eliminar el usuario.!'
            });
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Usted a cancelado la eliminación.',
          'error'
        )
      }
    }) 
   }
}
