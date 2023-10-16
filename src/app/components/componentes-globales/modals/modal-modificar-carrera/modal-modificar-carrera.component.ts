import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carrera } from 'src/app/model/Carrera';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-modificar-carrera',
  templateUrl: './modal-modificar-carrera.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalModificarCarreraComponent implements OnInit {
  public carrera = new Carrera();

  constructor(private servicio:DataService) { }

  ngOnInit() {
  }

  guardarCarrera(carreraForm:NgForm){  
    return this.servicio.modificarCarrera(this.servicio.carreraModificar).subscribe(
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
      title: 'La Carrera fue modificada correctamente.!',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error al modificar la carrera.!',
      text: mensaje,
      showConfirmButton: true
    });
  }


}
