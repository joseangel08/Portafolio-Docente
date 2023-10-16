import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  constructor(private autService:AuthService, private dataService:DataService) { }
  usuario : UsuarioTabla;

  ngOnInit() {
    this.obtenerDatosUsuario();
  }


  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.autService.getToken());
    this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuario=usuarios));
  }

}
