import Swal from 'sweetalert2';
import { Rol } from 'src/app/model/Rol';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-modificar-rol',
  templateUrl: './modal-modificar-rol.component.html',
  styleUrls: ['../modal-visualizar-usuarios/modal-visualizar-usuarios.component.css']
})
export class ModalModificarRolComponent implements OnInit {
  private rol:Rol;
  constructor(private servicio: DataService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  modificarRol(usuarioForm:NgForm){ 
    return this.servicio.actualizarRol(this.servicio.rolModificar).subscribe(
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

cancelar(){
  location.reload();
}

mensajeGuardar(mensaje:string){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000
    })
  }

mensajeNoGuardar(mensaje){
  Swal.fire({
    type: 'error',
    title: 'Error en la modificacion del Rol.!',
    text: mensaje,
    showConfirmButton: true
  })
}


}
