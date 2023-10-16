import { ActividadDocente } from './../../../model/ActividadDocente';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-actividades-docentes',
  templateUrl: './administrar-actividades-docentes.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarActividadesDocentesComponent implements OnInit {
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

activarActividadDocente(actividadDocente){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Desea inactivar la Actividad Docente?',
    text: "La Actividad Docente se inactivará y no se mostrará en la vista!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, deseo inactivar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.servicio.activarActividadDocente(actividadDocente).subscribe(
        data=>{
          let resp = data.verificador;
          swalWithBootstrapButtons.fire(
            'Activado!',
            'La Actividad Docente ha sido activada satisfactoriamente.',
            'success'
          );
      },
      error =>{console.log(error);
      }
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Usted a cancelado la activación.',
        'error'
      )
    }
  }) 
}

desactivarActividadDocente(actividadDocente){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Desea inactivar la Actividad Docente?',
    text: "La Actividad Docente se inactivará y no se mostrará en la vista!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, deseo inactivar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.servicio.desactivarActividadDocente(actividadDocente).subscribe(
        data=>{
          let resp = data.verificador;
          swalWithBootstrapButtons.fire(
            'Inactivado!',
            'La Actividad Docente ha sido inactivada satisfactoriamente.',
            'success'
          );
      },
      error =>{console.log(error);
      }
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Usted a cancelado la inactivación.',
        'error'
      )
    }
  }) 
}

}
