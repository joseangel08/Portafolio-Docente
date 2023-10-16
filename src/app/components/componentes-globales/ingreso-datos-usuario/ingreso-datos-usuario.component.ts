import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ingreso-datos-usuario',
  templateUrl: './ingreso-datos-usuario.component.html',
  styleUrls: ['../../../css/EstilosPerfiles.css']
})
export class IngresoDatosUsuarioComponent implements OnInit {
  nombres="";
  apellidos="";
  cedula="";
  telefono="";
  celular="";
  correo="";
  direccion="";
  psw1="";
  psw2="";
  public error=false;
  constructor() { }

  ngOnInit() {
  }

  guardarDatos(){
    if(this.nombres.length==0){
      this.error=true;
    }
  }

}
