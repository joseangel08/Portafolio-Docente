import { PeriodoAcademico_Roles_Usuario } from './../../../model/PeriodoAcademico_Roles_Usuario';
import { DataService } from 'src/app/services/data.service';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autService:AuthService, private dataService:DataService) { }
  usuario : UsuarioTabla;
  roles : PeriodoAcademico_Roles_Usuario [];
  suscripcion: Subscription;
  periodo:any;

  ngOnInit() {
    this.obtenerDatosUsuario();
    this.obtenerRolesUsuario();
    //this.obtenerPortafolio();
  }

  obtenerDatosPeriodo(){
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
      if(per==null){
        this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
      }else{
        this.periodo=per;
      }
  }

 /* obtenerPortafolio(){
  var usuario = JSON.parse(localStorage.getItem("currentUser"));
  var periodo = JSON.parse(localStorage.getItem("tokenPeriodo"));
    this.autService.obtPortafolioPeriodo(usuario.id, periodo).subscribe((portafolio:any)=>{
      if(portafolio!=null){
        this.autService.setPortafolio(portafolio);
      }else{
        this.autService.setPortafolio(portafolio);
      }
    });
  }*/

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.autService.getToken());
    this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuario=usuarios));
  }

  obtenerRolesUsuario(){
    var id:Number;
    id = Number(this.autService.getToken());
    this.dataService.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>{
      if(roles!=null){
        this.roles=roles;
        this.dataService.rolesLogin=Object.assign(roles);
      }
    });
  }
}
