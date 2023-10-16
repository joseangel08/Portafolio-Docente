import { AuthService } from './../../../../services/auth.service';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-seleccionar-periodo-academico',
  templateUrl: './modal-seleccionar-periodo-academico.component.html',
  styleUrls: ['./modal-seleccionar-periodo-academico.component.css']
})
export class ModalSeleccionarPeriodoAcademicoComponent implements OnInit {
  periodosAcademicos:any[];

  constructor(private servicio:DataService, private auth:AuthService, private location:Location) { }

  ngOnInit() {
    this.obtenerPeriodos();
  }

  obtenerPeriodos(){
    this.servicio.obtenerPeriodosAcademicos().subscribe((data:any[])=>{
      this.periodosAcademicos=data;
    });
  }

  seleccionarPeriodo(periodo){
    this.auth.setPeriodo(periodo);
    this.auth.setTokenPeriodo(periodo.id);
    setTimeout(()=>{
      location.reload();  
    },2000);    
  }


}
