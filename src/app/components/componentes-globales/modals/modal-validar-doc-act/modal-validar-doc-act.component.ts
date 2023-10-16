import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-validar-doc-act',
  templateUrl: './modal-validar-doc-act.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalValidarDocActComponent implements OnInit {

  constructor(private servicio: DataService, private autService:AuthService, private router: Router) { }
  documento:any;

  ngOnInit() {
    this.documento=this.servicio.docActividad;
  }

  validarDocAct(documento){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })    
    swalWithBootstrapButtons.fire({
      title: 'Desea validar el documento?',
      text: "El documento se validará correctamente??",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo validar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.validarDocumentoActividad(documento.id_documento, documento.observacion).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Validado!',
              data.mensaje,
              'success'
            );
            setTimeout(()=>{
              location.reload();  
            },2000); 
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
          'Usted a cancelado la validación del documento.',
          'error'
        );
        setTimeout(()=>{
          location.reload();  
        },2000); 
      }
    })
    this.router.navigateByUrl(('/adminPortDoc'));
  }

}
