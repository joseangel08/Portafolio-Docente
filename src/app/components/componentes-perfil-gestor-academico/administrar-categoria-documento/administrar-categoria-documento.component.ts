import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-administrar-categoria-documento',
  templateUrl: './administrar-categoria-documento.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarCategoriaDocumentoComponent implements OnInit {
  categorias:any;

  constructor(private servicio: DataService) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.servicio.obtCategoriasDocumentos().subscribe(categorias=>{
      if(categorias!=null){
        this.categorias = categorias;
      }
    })
  }

  modificarCategoria(categoria){
    this.servicio.categoriaModificar= Object.assign({}, categoria);
  }

  visualizarCategoria(categoria){
    this.servicio.categoriaModificar= Object.assign({}, categoria);
  }
}
