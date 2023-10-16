import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-modal-modificar-actividad-docente',
  templateUrl: './modal-modificar-actividad-docente.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalModificarActividadDocenteComponent implements OnInit {

  constructor(private servicio: DataService, private router: Router) { }

  ngOnInit() {
  }

  modificarActividadDocente(periodoAcademicoForm:NgForm){
    if(periodoAcademicoForm.valid){
      return this.servicio.actualizarActividadDocente(this.servicio.actividadDocenteModificar).subscribe(
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
    }else{
      Swal.fire({
        type: 'error',
        title: 'El formulario tiene campos vacíos.!',
        text: "Por favor, vuelva a revisar el formulario",
        showConfirmButton:true
      });
    }  
  }

  mensajeGuardar(mensaje){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'La Actividad Docente fue creada correctamente.!',
      text:mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Hubo problemas para crear la Actividad Docente',
      text: mensaje,
      showConfirmButton:true
    });
  }


}
