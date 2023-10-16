import { Rol } from './../../../../model/Rol';
import { DataService } from './../../../../services/data.service';
import { AuthService } from './../../../../services/auth.service';
import { UsuarioTabla } from './../../../../model/UsuarioTabla';
import { Component, OnInit } from '@angular/core';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';

@Component({
  selector: 'app-modal-visualizar-historial-roles',
  templateUrl: './modal-visualizar-historial-roles.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarHistorialRolesComponent implements OnInit {
  //private roles:Rol;
  private roles;
  public periodo_academico:PeriodoAcademico;
  buscar="";
  usuarioActivo : UsuarioTabla;


  constructor(private authService:AuthService, private servicio: DataService) { }

  ngOnInit() {
    this.obtenerPeriodoAcademico();
    this.obtenerDatosUsuario();
    //this.obtenerRolesSistema();
    this.obtenerRolesUsuario();

  }

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
  }

  obtenerRolesSistema(){
    this.servicio.obtenerRolesSistema().subscribe((roles:Rol)=>(this.roles=roles))
  }

  obtenerRolesUsuario(){
    var id:Number;
    id = Number(this.servicio.usuarioAsignarRol.id);
    //id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:any)=>{
      //(this.roles=roles)
    });
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
  }

  insertarRol(rol:Rol){
    this.servicio.insertarRoles(rol);
  }

  obtenerPeriodoAcademico(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>(this.periodo_academico=periodo));
   }

   visualizarHistorialRoles(){
     console.log("HOlaaaa");
   }


}
