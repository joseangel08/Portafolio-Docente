import { Router } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { ActividadDocente } from './../../../model/ActividadDocente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividades-docentes-docente',
  templateUrl: './actividades-docentes-docente.component.html',
  styleUrls: ['./actividades-docentes-docente.component.css']
})
export class ActividadesDocentesDocenteComponent implements OnInit {
  private actividadesDocentes:ActividadDocente;
  buscar="";
  constructor(private servicio: DataService, private router:Router) { }

  ngOnInit() {
    this.obtenerActividadesDocentes();
  }

  obtenerActividadesDocentes(){
    this.servicio.obtenerActividadesDocentes().subscribe((actividadesDocentes:ActividadDocente)=>(this.actividadesDocentes=actividadesDocentes));
  }

  visualizarActividadDocente(actividadDocente:ActividadDocente){
    this.servicio.actividadDocenteSelect= Object.assign({}, actividadDocente);
  }

  modificarActividadDocente(actividadDocente:ActividadDocente){
    this.servicio.actividadDocenteModificar= Object.assign({}, actividadDocente);
  }

 asignarActividadDocente(actividadDocente:ActividadDocente){
    this.servicio.actividadDocenteAsignar= Object.assign({}, actividadDocente);
  }


}
