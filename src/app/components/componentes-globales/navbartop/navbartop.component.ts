import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';

@Component({
  selector: 'app-navbartop',
  templateUrl: './navbartop.component.html',
  styleUrls: ['./navbartop.component.css']
})
export class NavbartopComponent implements OnInit {

  constructor(private autService:AuthService, private dataService:DataService) {
   }
  usuario : UsuarioTabla;
  periodo : any;

  ngOnInit() {
    this.obtenerDatosPeriodo();
    this.obtenerDatosUsuario();
  }


  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.autService.getToken());
    this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuario=usuarios));
  }

  obtenerDatosPeriodo(){
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
      if(per==null){
        this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"","null":"null","path_dir_periodo":"null"}');
      }else{
        this.periodo=per;
      }
  }

  salir():void{
    this.autService.cerrarSession();
  }
  


}
