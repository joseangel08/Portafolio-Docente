import Swal from 'sweetalert2';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/model/Rol';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-roles-sistema',
  templateUrl: './administrar-roles-sistema.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarRolesSistemaComponent implements OnInit {
  private roles:Rol;
  buscar="";
  constructor(private servicio: DataService, private router:Router) { }

  obtenerRolesSistema(){
    this.servicio.obtenerRolesSistema().subscribe((roles:Rol)=>(this.roles=roles))
  }

  
  ngOnInit() {
     this.obtenerRolesSistema();
   }

   visualizarRol(rolSelect:Rol){
    this.servicio.rolSelect = Object.assign({}, rolSelect);
  }

  modificarRol(rolSelect:Rol){
    this.servicio.rolModificar = Object.assign({}, rolSelect);
  }

  desactivarRol(rol:Rol){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea inactivar usuario?',
      text: "El usuario se inactivará y no se mostrará en la vista!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo inactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.desactivarRol(rol).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Inactivado!',
              'El rol ha sido inactivado satisfactoriamente.',
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
          'Usted a cancelado la inactivación.',
          'error'
        )
      }
    }) 
  }

  activarRol(rol){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea activar el Rol?',
      text: "El Rol se activará.!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.activarRol(rol).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Activado!',
              'El Rol ha sido activado satisfactoriamente.',
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
