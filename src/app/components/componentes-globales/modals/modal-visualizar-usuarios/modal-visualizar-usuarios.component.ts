import { AuthService } from './../../../../services/auth.service';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';
import { PeriodoAcademico_Roles_Usuario } from './../../../../model/PeriodoAcademico_Roles_Usuario';
import { UsuarioTabla } from '../../../../model/UsuarioTabla';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal  from 'sweetalert2'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-visualizar-usuarios',
  templateUrl: './modal-visualizar-usuarios.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarUsuariosComponent implements OnInit {
  public usuario: UsuarioTabla;
  public roles:any[];
  public datosUsuario  = new UsuarioTabla();
  public isError = false;
  public resultadoRoles:Array<any>
  title = 'sweetAlert';
  buscar="";
  public periodo_academico:PeriodoAcademico;
  periodo : any=null;
  usuarioActivo : UsuarioTabla;
  constructor(private authService:AuthService, private servicio: DataService, private location:Location, private router:Router) {}

  ngOnInit() {
    this.obtenerDatosUsuario();
  }
  

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
    if(per!=null){
      this.periodo=JSON.parse(localStorage.getItem("currentPeriodo"));  
    }else{
      this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
    }
    
  }

  visualizarRolesUsuario(usuarioSelect:UsuarioTabla){
    this.servicio.usuarioAsignarRol = Object.assign({}, usuarioSelect);
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>{
      if(periodo!=null){
        this.periodo_academico=periodo;
        this.servicio.periodoActual=Object.assign(this.periodo_academico);
      }else{
        this.periodo_academico=null;
      }
      //Aqui se obtienen los roles del usuario del periodo actual
      if(this.periodo_academico!=null){
        this.servicio.obtenerRolesUsuarioPeriodoActual(usuarioSelect.id, this.periodo_academico.id).subscribe((roles)=>{
          if(periodo!=null){
            this.servicio.rolesActuales = Object.assign(roles);
          }else{
            var rol=JSON.parse('{"rol":"Sin roles asignados"}');
            this.servicio.rolesActuales = Object.assign(rol);
          }
        })
      }else{
        let rol:any = [];
          rol.id = null;
          rol.periodo_academico = 'Usuario sin roles.Por favor remítase al encargado.';
          rol.rol = "Sin roles asignados";
          let  a:PeriodoAcademico_Roles_Usuario[]= [rol];
          this.servicio.rolesActuales = Object.assign(a);
      }
    });
    this.servicio.obtenerRolesUsuarios(this.servicio.usuarioAsignarRol.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.rolesUsuario = Object.assign(data);
          var auxRoles = [];
          var auxPeriodo = this.servicio.periodoActual;
          this.servicio.rolesUsuario.forEach(function (elemento, indice, array) {
            if((elemento.id_periodo_academico==auxPeriodo.id)){
              auxRoles.push(elemento);
            }
          });
          if(auxRoles.length==0){
              let rol = {'periodo_academico':"EL USUARIO NO TIENE ROLES ASIGNADOS. REMÍTASE AL ADMINISTRADOR.", 'rol':'NINGUNA'};
              var array = [];
              array.push(rol)
              auxRoles = Object.assign(array);    
          }
          this.servicio.rolesActuales=auxRoles;
        }else{
          let rol = {'periodo_academico':"EL USUARIO NO TIENE ROLES ASIGNADOS. REMÍTASE AL ADMINISTRADOR.", 'rol':'NINGUNO ASIGNADO'};
          var array = [];
          array.push(rol)
          this.servicio.rolesUsuario = Object.assign(array);    
        }
        
    },
    error =>{console.log(error);
    }
    );


  }

  habilitarPortafolio(){
    var periodo = JSON.parse(localStorage.getItem("currentPeriodo"));
    if(periodo!=null){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Desea Habilitar el Portafolio Docente?',
        text: "Luego deHabilitarlo no se podra deshabilitar!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, deseo habilitar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.servicio.habilitarPortafolio(this.servicio.usuarioSelect.id,this.periodo.id).subscribe(
            data=>{
              if(data.verificador==true){
                swalWithBootstrapButtons.fire(
                  'Inactivado!',
                  'Se ha habilitado el portafolio docente del usuario.',
                  'success'
                )
              }else{
                swalWithBootstrapButtons.fire(
                  'Portafolio ya esta habilitado',
                  'No se pudo habilitar el portafolio.',
                  'error'
                )
              }
          },
          error =>{console.log(error);
          }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Usted a cancelado la Habilitacion.',
            'error'
          )
        }
      }) 
    }else{
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'No se puede habilitar el portafolio del docente seleccionado!',
        text: "No existe un periodo academico activo!",
        showConfirmButton: true
      })
    }
    
  }

  visualizarActividadesAsignadas(usuario){
    var periodo = JSON.parse(localStorage.getItem("currentPeriodo"));
    if(periodo!=null){
      this.servicio.obtActividadesDocente(usuario.id_docente).subscribe((actividades:any)=>{
        if(actividades!=null){
          this.servicio.actividadesAsignadas = Object.assign(actividades);
        }else{
          this.servicio.actividadesAsignadas = null;
        }
      })
    }else{
      this.servicio.actividadesAsignadas = null;
    }
  }
}
