import { DataService } from 'src/app/services/data.service';
import { AuthService } from './../../../../services/auth.service';
import { PeriodoAcademico_Roles_Usuario } from './../../../../model/PeriodoAcademico_Roles_Usuario';
import { UsuarioTabla } from './../../../../model/UsuarioTabla';
import { Rol } from './../../../../model/Rol';
import { Component, OnInit } from '@angular/core';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-modal-eliminar-roles-usuario',
  templateUrl: './modal-eliminar-roles-usuario.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalEliminarRolesUsuarioComponent implements OnInit {
  private roles:Rol;
  public periodo_academico:PeriodoAcademico=new PeriodoAcademico;
  public rolesAsignados =[];
  buscar="";
  usuarioActivo : UsuarioTabla;
  verificador_rol="";
  rolesUsuario:PeriodoAcademico_Roles_Usuario[];
  rolesPeriodos:PeriodoAcademico_Roles_Usuario[];
  periodo : any=null;


  constructor(private authService:AuthService, private servicio: DataService) { }

  ngOnInit() {
    this.obtenerPeriodoAcademico();
    this.obtenerDatosUsuario();
    this.obtenerRolesSistema();
    this.obtenerRolesUsuariosSeleccionado();
    this.obtenerRolesUsuarioActivo();
  }


  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    this.periodo=JSON.parse(localStorage.getItem("currentPeriodo"));  
    if(this.periodo==null){
      this.periodo=this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
    }
  }

  obtenerRolesSistema(){   
    this.servicio.obtenerRolesSistema().subscribe((roles:Rol)=>(this.roles=roles))
  }

  
  obtenerRolesUsuarioActivo(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>(this.rolesUsuario=roles));
  }

  eliminarRol(rol:Rol){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea eliminar el rol seleccionado?',
      text: "El usuario se eliminará de la Base de Datos.!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.eliminarRol(rol).subscribe(data=>{
          if(data.verificador==true){
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'El rol se eliminó correctamente.!',
              showConfirmButton: false,
              timer: 3000
            })
          }else{
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'El rol ya está asignado al usuario.!'
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

  obtenerPeriodoAcademico(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>(this.periodo_academico=periodo));
   }

   obtenerRolesUsuariosSeleccionado(){
    var id:Number;
   // id = Number(this.authService.getToken());
  //  this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
    this.servicio.obtenerRolesUsuarios(this.servicio.usuarioAsignarRol.id).subscribe(
      data=>{
        if(data!=null){
          this.rolesAsignados = Object.assign(data);
          console.log("tU DATAAAa mijin"+data);
        }else{
          let rol = new PeriodoAcademico_Roles_Usuario();
          rol.id = null;
          rol.id_periodo_academico = null;
          rol.id_usuario = null;
          rol.id_rol = null;
          let  a:any[]= [rol];
          this.servicio.rolesUsuario = Object.assign(a);    
        }
        
    },
    error =>{console.log(error);
    }
    );
    this.rolesAsignados = this.servicio.rolesUsuario;
  }

}
