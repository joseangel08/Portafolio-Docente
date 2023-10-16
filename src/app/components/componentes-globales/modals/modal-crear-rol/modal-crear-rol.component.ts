import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/model/Rol';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-crear-rol',
  templateUrl: './modal-crear-rol.component.html',
  styleUrls: ['../modal-visualizar-usuarios/modal-visualizar-usuarios.component.css']
})
export class ModalCrearRolComponent implements OnInit {
  private rol=new Rol();

  constructor(private servicio: DataService, private location:Location) { }
s
  ngOnInit() {
  }

  guardarRol(usuarioForm:NgForm){    

    if(usuarioForm.valid){
      this.servicio.guardarRol(this.rol).subscribe(
        data=>{
          let resp = data.verificador;
          if(resp==true){
            this.mensajeGuardar();
            setTimeout(()=>{
              location.reload();  
            },2000);  
          }else{
            this.mensajeNoGuardar();    
          }
      },
      error =>{console.log(error);
      }
      ); 
    }else{
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'El formulario tiene campos boligatorios vacios.!',
        showConfirmButton: true
      })
    }
    
    }

  mensajeGuardar(){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'El rol ha sido creado correctamente',
      showConfirmButton: true
    });
    
  }

  mensajeNoGuardar(){
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: 'El rol ya existe en la base de datos.!'
    });
  }

}
