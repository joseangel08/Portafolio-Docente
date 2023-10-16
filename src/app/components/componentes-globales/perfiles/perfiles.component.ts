import { DataService } from '../../../services/data.service';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { Usuario } from '../../../model/Usuario';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class PerfilesComponent implements OnInit {

  constructor(private autService:AuthService, private dataService:DataService) { }
  usuario : UsuarioTabla;
  periodo :  any;

  ngOnInit() {
    this.obtenerDatosUsuario();
  }


  obtenerDatosUsuario(){
    var id = Number(localStorage.getItem("accessToken"))
    this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuario=usuarios));
  }



}
