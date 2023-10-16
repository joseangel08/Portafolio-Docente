import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-visualizar-categoria',
  templateUrl: './modal-visualizar-categoria.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalVisualizarCategoriaComponent implements OnInit {

  constructor(private servicio:DataService) { }

  ngOnInit() {
  }

}
