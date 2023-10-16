import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carrera } from 'src/app/model/Carrera';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-carrera',
  templateUrl: './modal-crear-carrera.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalCrearCarreraComponent implements OnInit {
  public carrera = new Carrera();

  constructor(private servicio:DataService) { }

  ngOnInit() {
  }

  guardarCarrera(usuarioForm:NgForm){ 
    return this.servicio.guardarCarrera(this.carrera).subscribe(
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
      title: 'La Carrera fue creada correctamente.!',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error al almacenar la carrera.!',
      text: mensaje,
      showConfirmButton: true
    });
  }

}
