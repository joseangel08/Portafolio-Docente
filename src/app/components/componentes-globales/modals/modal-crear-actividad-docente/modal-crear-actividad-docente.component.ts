import { NgForm } from '@angular/forms';
import { ActividadDocente } from './../../../../model/ActividadDocente';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-actividad-docente',
  templateUrl: './modal-crear-actividad-docente.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalCrearActividadDocenteComponent implements OnInit {

  constructor(private servicio: DataService, private location:Location) { }

  private actividadDocente=new ActividadDocente();

  ngOnInit() {
  }

  guardarActividadDocente(usuarioForm:NgForm){  
    if(usuarioForm.valid){
      return this.servicio.guardarActividadDocente(this.actividadDocente).subscribe(
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
        position: 'center',
        type: 'error',
        title: 'Existen campos obligatorios vacios.',
        showConfirmButton:true
      })
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
