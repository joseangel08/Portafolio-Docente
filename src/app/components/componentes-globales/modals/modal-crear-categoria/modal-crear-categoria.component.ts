import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from 'src/app/model/Categoria';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-categoria',
  templateUrl: './modal-crear-categoria.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalCrearCategoriaComponent implements OnInit {
  public categoria=new Categoria();

  constructor(private servicio:DataService) { }

  ngOnInit() {
  }

  guardarCategoria(usuarioForm:NgForm){ 
    return this.servicio.guardarCategoria(this.categoria).subscribe(
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

  mensajeGuardar(mensaje){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Transaccion Exitosa.!',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error en la Transaccion.!',
      text: mensaje,
      showConfirmButton: true
    });
  }

}
