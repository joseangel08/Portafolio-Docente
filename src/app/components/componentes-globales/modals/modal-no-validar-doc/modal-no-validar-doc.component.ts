import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-no-validar-doc',
  templateUrl: './modal-no-validar-doc.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalNoValidarDocComponent implements OnInit {

  constructor(private servicio: DataService, private autService:AuthService, private router: Router) { }
  documento:any;

  ngOnInit() {
    this.documento = this.servicio.docGeneral;
  }

  validarDocAct(form:NgForm, documento){
    if(form.valid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })    
      swalWithBootstrapButtons.fire({
        title: 'Desea NO validar el documento?',
        text: "El documento NO se validará??",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, deseo NO validar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.servicio.noValidarDocGeneral(documento.id_documento, documento.observacion).subscribe(
            data=>{
              let resp = data.verificador;
              swalWithBootstrapButtons.fire(
                'No Validado!',
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
            'Usted a cancelado la invalidación del documento.',
            'error'
          );
          setTimeout(()=>{
            location.reload();  
          },2000); 
        }
      })
      this.router.navigateByUrl(('/validarDocActividad'));
    }else{
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Debe ingresar una observacion para la correccion del documento.',
        showConfirmButton:true
      })
    }
    
  }

}