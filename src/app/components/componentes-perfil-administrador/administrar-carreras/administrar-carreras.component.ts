import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-carreras',
  templateUrl: './administrar-carreras.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarCarrerasComponent implements OnInit {
  carreras:any;
  buscar="";
  constructor(private servicio: DataService) { }

  ngOnInit() {
    this.obtenerCarrerasSistema();
  }

  obtenerCarrerasSistema(){
    this.servicio.obtenerCarreras().subscribe(carreras=>{
      if(carreras!=null){
        this.carreras = carreras;
      }
    })
  }
  

  modificarCarrera(carrera){
    this.servicio.carreraModificar = Object.assign({}, carrera);
  }

  visualizarCarrera(carrera){
    this.servicio.carreraModificar= Object.assign({}, carrera);
  }

  desactivarCarrera(carrera){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea inactivar la Carrera Seleccionada?',
      text: "La carrera se Desactivará!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo Desactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.desactivarCarrera(carrera).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Inactivado!',
              'El Período Académico ha sido desactivado satisfactoriamente.',
              'success'
            )
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
          'Usted a cancelado la desactivacion.',
          'error'
        )
      }
    }) 
  }

  activarCarrera(carrera){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea activar la Carrera?',
      text: "La Carrera se activará.!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.activarCarrera(carrera).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Activado!',
              'La carrera ha sido activado satisfactoriamente.',
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

}
