import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-visualizar-carrera',
  templateUrl: './modal-visualizar-carrera.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarCarreraComponent implements OnInit {

  constructor(private servicio:DataService) { }

  ngOnInit() {
  }

}
