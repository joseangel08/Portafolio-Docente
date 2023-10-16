import { AuthService } from './../../../../services/auth.service';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-visualizar-actividades-asignadas',
  templateUrl: './modal-visualizar-actividades-asignadas.component.html',
  styleUrls: ['./modal-visualizar-actividades-asignadas.component.css']
})
export class ModalVisualizarActividadesAsignadasComponent implements OnInit {
  constructor(private servicio:DataService) { }

  ngOnInit() {
    
  }

}
