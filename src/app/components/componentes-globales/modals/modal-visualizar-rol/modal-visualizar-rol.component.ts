import { Rol } from '../../../../model/Rol';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-visualizar-rol',
  templateUrl: './modal-visualizar-rol.component.html',
  styleUrls: ['../modal-visualizar-usuarios/modal-visualizar-usuarios.component.css']
})
export class ModalVisualizarRolComponent implements OnInit {
  private rol:Rol;

  constructor(private servicio: DataService, private location:Location) { }

  ngOnInit() {
  }

}
