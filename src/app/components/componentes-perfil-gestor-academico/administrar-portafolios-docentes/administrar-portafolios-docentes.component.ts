import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-administrar-portafolios-docentes',
  templateUrl: './administrar-portafolios-docentes.component.html',
  styleUrls: ['./administrar-portafolios-docentes.component.css','../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarPortafoliosDocentesComponent implements OnInit {
  buscar="";
  private portafolios:any;

  constructor(private servicio: DataService, private router: Router, private authservice:AuthService) { }

  ngOnInit() {
    this.obtenerPortafolios();
  }

  obtenerPortafolios(){
    this.servicio.obtenerPortafoliosDocentes().subscribe((portafolios)=>{
      if(portafolios!=null){
        this.portafolios=portafolios;
      }else{
        this.portafolios=null;
      }
    })
  }

  administrarPortafolio(portafolio){
    this.authservice.setPortDocSelect(portafolio);
    this.router.navigateByUrl(('/adminPortDoc'));
  }

}
