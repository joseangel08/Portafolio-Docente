import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-visualizar-historial-actividades-asignadas',
  templateUrl: './modal-visualizar-historial-actividades-asignadas.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarHistorialActividadesAsignadasComponent implements OnInit {

  constructor(private servicio: DataService) { }

  ngOnInit() {
  }

}
