import { PeriodoAcademico_Roles_Usuario } from './../../../../model/PeriodoAcademico_Roles_Usuario';
import { Rol } from './../../../../model/Rol';
import { AuthService } from './../../../../services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UsuarioTabla } from './../../../../model/UsuarioTabla';
import { Component, OnInit } from '@angular/core';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-modal-visualizar-roles-usuario',
  templateUrl: './modal-visualizar-roles-usuario.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarRolesUsuarioComponent implements OnInit {
  //private roles:Rol;
  private roles;
  public periodo_academico:PeriodoAcademico;
  rolesUsuario:PeriodoAcademico_Roles_Usuario[];
  rolesPeriodos:PeriodoAcademico_Roles_Usuario[];
  buscar="";
  usuarioActivo : UsuarioTabla;
  periodo : any=null;

  constructor(private authService:AuthService, private servicio: DataService) { }

  ngOnInit() {
    this.obtenerPeriodoAcademico();
    this.obtenerDatosUsuario();
    this.obtenerRolesSistema();
    this.obtenerRolesUsuario();
    this.obtenerRolesUsuarioActivo()
  }

  obtenerRolesUsuarioActivo(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>(this.rolesUsuario=roles));
  }

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
    if(per!=null){
      this.periodo=JSON.parse(localStorage.getItem("currentPeriodo"));  
    }else{
      this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
    }
    
    
  }

  obtenerRolesSistema(){
    this.servicio.obtenerRolesSistema().subscribe((roles:Rol)=>(this.roles=roles))
  }

  obtenerRolesUsuario(){
    var id:Number;
    id = Number(this.servicio.usuarioAsignarRol.id);
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:any)=>{
    });
  }

  insertarRol(rol:Rol){
    this.servicio.insertarRoles(rol);
  }

  obtenerPeriodoAcademico(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1) +"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>{
      if(periodo!=null){
        this.periodo_academico=periodo;
      }else{
        this.periodo_academico=null;
      }       
    });
   }

   visualizarHistorialRoles(){
    this.servicio.obtenerRolesUsuarios(this.servicio.usuarioAsignarRol.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.rolesUsuarioHistorial = Object.assign(data);
        }else{
          let rol = {'periodo_academico':"EL USUARIO NO TIENE ROLES ASIGNADOS. REMÍTASE AL ADMINISTRADOR.", 'rol':'NINGUNO ASIGNADO'};
          var array = [];
          array.push(rol)
          this.servicio.rolesUsuarioHistorial = Object.assign(array);    
        }        
    },
    error =>{console.log(error);
    }
    );
  }

  asignarRol(rol:Rol){
    let rolUsuario:PeriodoAcademico_Roles_Usuario= new PeriodoAcademico_Roles_Usuario;
    if(this.periodo_academico!=null){
      rolUsuario.id_periodo_academico=this.periodo_academico.id;
      rolUsuario.id_usuario=this.servicio.usuarioAsignarRol.id;
      rolUsuario.id_rol=rol.id;
      this.servicio.obtenerRolesUsuariosPer(rolUsuario.id_usuario).subscribe((rolesPeriodos:PeriodoAcademico_Roles_Usuario[])=>{
        var val = false;
        this.rolesPeriodos=rolesPeriodos;
        if(rolesPeriodos!=null){
          for (let rol of rolesPeriodos){
            if(rolUsuario.id_periodo_academico==rol.id_periodo_academico&&rolUsuario.id_rol==rol.id_rol){
              val = true;
            }
          }
        }
        if(this.rolesPeriodos!= null && val==true){
          Swal.fire({
            type: 'error',
            title: 'No se puede asignar el Rol!',
            text: 'El Rol ya se encuentra asignado.!',
            showConfirmButton: true,
          });
        }else{ 
          var verificador = false;
          this.servicio.rolesUsuarioAsignar.forEach(function (elemento, indice, array) {
            if((elemento.id_rol==rol.id)&&(elemento.id_periodo_academico==rolUsuario.id_periodo_academico)){
              verificador = true;
            }
          });        
          if(verificador==false){
            this.servicio.asignarRolUsuario(rolUsuario).subscribe(data=>{
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'El rol se asignó correctamente',
                showConfirmButton: true,
                //timer: 3000
              })
              setTimeout(()=>{
                location.reload();  
              },2000);  
              });
          }else{          
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'El rol ya está asignado al usuario en este período académico.!'
            });
          }       
        }
      })
    }else{
      Swal.fire({
        type: 'error',
        title: 'No se puede asignar el Rol!',
        text: 'No existe un Periodo Academico Activo.!'
      });
    }
    
   
  }


}
