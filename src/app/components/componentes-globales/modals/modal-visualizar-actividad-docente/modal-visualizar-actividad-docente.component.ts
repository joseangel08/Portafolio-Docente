import { DataService } from 'src/app/services/data.service';
import { ActividadDocente } from './../../../../model/ActividadDocente';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-visualizar-actividad-docente',
  templateUrl: './modal-visualizar-actividad-docente.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarActividadDocenteComponent implements OnInit {
  private actividadDocente:ActividadDocente;

  constructor(private servicio: DataService, private location:Location) { }

  ngOnInit() {
  }

}
