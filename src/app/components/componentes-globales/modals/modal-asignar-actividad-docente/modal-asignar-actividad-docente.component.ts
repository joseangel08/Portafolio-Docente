import { Rol } from './../../../../model/Rol';
import { AuthService } from './../../../../services/auth.service';
import { ActividadDocenteUsuario } from './../../../../model/ActividadDocenteUsuario';
import { ActividadDocente } from './../../../../model/ActividadDocente';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';

@Component({
  selector: 'app-modal-asignar-actividad-docente',
  templateUrl: './modal-asignar-actividad-docente.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalAsignarActividadDocenteComponent implements OnInit {
  private usuarios:any;
  buscar="";
  private actDoc;
  public periodo_academico:PeriodoAcademico=new PeriodoAcademico;
  public periodo_gracia:any;
  usuarioActivo : UsuarioTabla;
  periodo : any=null;
  constructor(private servicio: DataService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.periodo=JSON.parse(localStorage.getItem("currentPeriodo")); 
    this.obtenerUsuariosSistema();
    this.obtenerPeriodoAcademico();
   this.obtenerDatosUsuario();
   //this.obtenerRolesSistema();
   this.obtenerRolesUsuario();
   //this.obtenerActDocUsuarios();

  }

  obtenerUsuariosSistema(){
    this.servicio.obtenerUsuariosSistema().subscribe((usuarios)=>(this.usuarios=usuarios))
  }

  asignarActividadDocente(actividad, usuario){
    let ac = new ActividadDocenteUsuario();
    ac.id_docente=usuario.id_docente;
    ac.id_actividad_docente=actividad.id;
    ac.id_periodo_academico=this.periodo_academico.id;
    ac.path_directorio=this.periodo_academico.path_dir_periodo;
    let verificador=false;
    this.servicio.actividadSeleccionadaVisualizar.forEach(function (elemento, indice, array) {
      if((elemento.id_usuario==ac.id_docente)&&(elemento.id_periodo_academico==ac.id_periodo_academico)){
        verificador = true;
      }
    });
    return this.servicio.validarExistport(ac.id_docente, ac.id_periodo_academico).subscribe(
      data=>{
        if(data==null){
          this.mensajeNoAsignar('El docente seleccionado, aun no tiene activo su portafolio docente.!');
        }else{
          if(verificador==false){
            return this.servicio.asignarActividadDocente(ac).subscribe(
              data=>{
                let resp = data.verificador;
                if(resp==true){
                  this.mensajeAsignar(data.mensaje);
                  setTimeout(()=>{
                    location.reload();  
                  },2000);  
                }else{
                  this.mensajeNoAsignar(data.mensaje);
                }
            },
            error =>{console.log(error);
            }
            ); 
          }else{          
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'El usuario ya está ya está asignado a la Actividad Docente en el mismo Periodo Académico.!'
            });
          }  
        }

      }); 
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

  
  mensajeAsignar(mensaje){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: "Transaccion exitosa.!",
      text: mensaje,
      showConfirmButton: true,
      timer: 3000
    })
    
  }

  mensajeNoAsignar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error al asisgnar Tarea!',
      text: mensaje
    });
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
 

  /*
  obtenerActDocUsuarios(){
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
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>(this.periodo_academico=periodo));
   }

   obtenerPeriodoAcademicoGracia(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoGracia(fecha).subscribe((periodo)=>{
      this.periodo_gracia=periodo;
    });
   }




}
