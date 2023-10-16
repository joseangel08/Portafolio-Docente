import { Rol } from './../../../../model/Rol';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from './../../../../services/auth.service';
import { UsuarioTabla } from './../../../../model/UsuarioTabla';
import { Component, OnInit } from '@angular/core';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';

@Component({
  selector: 'app-modal-visualizar-actividad-docente-asignada',
  templateUrl: './modal-visualizar-actividad-docente-asignada.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarActividadDocenteAsignadaComponent implements OnInit {
 //private roles:Rol;
 private actDoc;
 public periodo_academico:PeriodoAcademico;
 public periodo_gracia:any;
 buscar="";
 usuarioActivo : UsuarioTabla;
 periodo : any=null;


 constructor(private authService:AuthService, private servicio: DataService) { }

 ngOnInit() {
  this.periodo=JSON.parse(localStorage.getItem("currentPeriodo"));
   this.obtenerPeriodoAcademico();
   this.obtenerDatosUsuario();
   this.obtenerPeriodoAcademicoGracia();
   //this.obtenerActDocUsuarios();

 }

 obtenerDatosUsuario(){
   var id:Number;
   id = Number(this.authService.getToken());
   this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
 }

 obtenerRolesSistema(){
   this.servicio.obtenerRolesSistema().subscribe((roles:Rol)=>(this.actDoc=roles))
 }


 obtenerPeriodoAcademico(){
   var f = new Date();
   var dia = f.getDate()+1;
   var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
   this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>(this.periodo_academico=periodo));
  }

  obtenerPeriodoAcademicoGracia(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoGracia(fecha).subscribe((periodo)=>{
      this.periodo_gracia=periodo;
    });
   }

   obtenerHistorialUsuariosAsignados(){
    this.servicio.obtenerActDocSelect(this.servicio.actividadSeleccionada.id).subscribe((usuarios)=>{
      this.servicio.historialUsuariosActividad=usuarios;
    });
   }

}
