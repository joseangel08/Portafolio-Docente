import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-modificar-categoria',
  templateUrl: './modal-modificar-categoria.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalModificarCategoriaComponent implements OnInit {

  constructor(private servicio:DataService) { }

  ngOnInit() {
  }

  guardarCategoria(categoriaForm:NgForm){ 
    if(categoriaForm.valid){
      return this.servicio.modificarCategoria(this.servicio.categoriaModificar).subscribe(
            data=>{
              if(data.verificador==true){
                this.mensajeGuardar(data.mensaje);
                setTimeout(()=>{
                  location.reload();  
                },2000);  
              }else{
                this.mensajeNoGuardar(data.mensaje);    
              }
          },
          error =>{console.log(error);
          }
          ); 
     }
    }

  mensajeGuardar(mensaje){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Transacion Exitosa.!',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error en la transaccion.!',
      text: mensaje,
      showConfirmButton: true
    });
  }


}
