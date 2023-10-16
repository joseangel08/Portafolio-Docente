import Swal from 'sweetalert2';
import { DataService } from './../../../services/data.service';
import { PeriodoAcademicoUsuario } from './../../../model/PeriodoAcademicoUsuario';
import { Rol } from './../../../model/Rol';
import { UsuarioTabla } from './../../../model/UsuarioTabla';
import { Persona } from './../../../model/Persona';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';

@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AsignarRolesComponent implements OnInit {
  public datosPersona  = new Persona();
  public datosUsuario  = new UsuarioTabla();
  public isError = false;
  public roles = new Rol();
  public resultadoRoles:Array<any>
  private usuarios:UsuarioTabla;
  private rolPeriodo = new PeriodoAcademicoUsuario();
  title = 'sweetAlert';
  buscar="";
  public periodo_academico:PeriodoAcademico;
  periodo : any=null;
  constructor(private servicio: DataService, private router:Router) { }

  obtenerUsuariosSistema(){
    this.servicio.obtenerUsuariosSistema().subscribe((usuarios:UsuarioTabla)=>(this.usuarios=usuarios));
  }

  
  ngOnInit() {
    this.periodo=JSON.parse(localStorage.getItem("currentPeriodo")); 
     this.obtenerUsuariosSistema();
     this.obtenerPeriodoAcademico();
   }

   obtenerPeriodoAcademico(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>{
      this.periodo_academico=periodo;
      if(this.periodo_academico!=null){
        this.servicio.periodoActual=Object.assign(periodo);  
      }else{
        this.servicio.periodoActual=Object.assign(this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}'))
      }
    });
   }

 
  eliminarRol(usuarioSelect:UsuarioTabla){
    this.servicio.usuarioAsignarRol = Object.assign({}, usuarioSelect);
    //this.servicio.usuarioSelect = Object.assign({}, usuarioSelect);
    //this.servicio.rolesUsuario = Object.assign(this.servicio.obtenerRolesUsuarios(this.servicio.usuarioSelect.id));
    this.servicio.obtenerRolesUsuarios(this.servicio.usuarioAsignarRol.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.rolesUsuarioAsignar = Object.assign(data);
        }else{
          let rol = {'periodo_academico':"EL USUARIO NO TIENE ROLES ASIGNADOS.", 'rol':'nINGUNO'};
          var array = [];
          array.push(rol)
          this.servicio.rolesUsuarioAsignar = Object.assign(array);    
        }
    },
    error =>{console.log(error);
    }
    );


  }

  asignarRol(usuarioSelect:UsuarioTabla){
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
          this.servicio.rolesUsuarioAsignar = Object.assign(data);
          var auxRoles = [];
          var auxPeriodo = this.servicio.periodoActual;
          this.servicio.rolesUsuarioAsignar.forEach(function (elemento, indice, array) {
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
          this.servicio.rolesUsuarioAsignar=auxRoles;
        }else{
          let rol = {'periodo_academico':"EL USUARIO NO TIENE ROLES ASIGNADOS. REMÍTASE AL ADMINISTRADOR.", 'rol':'NINGUNO ASIGNADO'};
          var array = [];
          array.push(rol)
          this.servicio.rolesUsuarioAsignar = Object.assign(array);    
        }
        
    },
    error =>{console.log(error);
    }
    );


  }

  }
