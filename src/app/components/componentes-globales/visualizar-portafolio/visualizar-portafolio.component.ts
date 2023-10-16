import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-visualizar-portafolio',
  templateUrl: './visualizar-portafolio.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class VisualizarPortafolioComponent implements OnInit {

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
