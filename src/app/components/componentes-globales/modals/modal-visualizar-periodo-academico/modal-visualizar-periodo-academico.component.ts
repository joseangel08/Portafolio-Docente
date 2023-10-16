import { AuthService } from './../../../../services/auth.service';
import { DataService } from './../../../../services/data.service';
import { PeriodoAcademico } from './../../../../model/PeriodoAcademico';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-visualizar-periodo-academico',
  templateUrl: './modal-visualizar-periodo-academico.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarPeriodoAcademicoComponent implements OnInit {
  private periodoAcademico:PeriodoAcademico;
  periodo : any=null;
  constructor(private authService:AuthService, private servicio: DataService, private location:Location) { }

  ngOnInit() {
    this.obtenerDatosPeriodo();
  }

  obtenerDatosPeriodo(){
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
      if(per==null){
        this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
      }else{
        this.periodo=per;
      }
  }

}
