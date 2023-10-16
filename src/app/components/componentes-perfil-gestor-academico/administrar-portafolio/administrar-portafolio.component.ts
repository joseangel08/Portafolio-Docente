import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { VisualizarPdfComponent } from '../../componentes-globales/componentes-dinamicos/visualizar-pdf/visualizar-pdf.component';
import { DynamicHostDirective } from '../../componentes-globales/directive/dynamic-host.directive';

@Component({
  selector: 'app-administrar-portafolio',
  templateUrl: './administrar-portafolio.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarPortafolioComponent implements OnInit {
  @Input() path:any;
  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective;  
  periodo:any;
  documentacion_general:any;
  documentacion_actividad:any;
  documento:any;
  categorias:any;
  portafolio:any;
  docente:any;

  constructor(config:NgbAccordionConfig, private modalService: NgbModal, private servicio: DataService, private compResolFactory: ComponentFactoryResolver, private router: Router, private autService:AuthService) {
    config.closeOthers = true;
   }

  ngOnInit() {
    this.obtenerDatosDocente();
    this.obtenerCategorias();
    this.visualizarActividadesAsignadas();
    this.obtenerDocumentacionGeneral();
    this.obtenerDocumentacionActividades();
  }

  obtenerDatosDocente(){
    let portafolio = JSON.parse(localStorage.getItem('portDocSelect'));
    this.servicio.obtenerDatosDocenteId(portafolio.id_docente).subscribe((datosUsuario:any)=>{
      if(datosUsuario!=null){       
        this.docente = datosUsuario;
      }
    });
  }

  obtenerCategorias(){
    this.servicio.obtCategoriasDocumentos().subscribe((categorias:any)=>{
      if(categorias!=null){
        this.categorias=categorias;
      }else{
        this.categorias = null; 
      }
    });
  }

  visualizarActividadesAsignadas(){
    let portafolio = JSON.parse(localStorage.getItem('portDocSelect'));
    this.servicio.obtUsActAsigPerActualUsuario(portafolio.id_docente,portafolio.id_periodo_academico).subscribe((actividades:any)=>{
      if(actividades!=null){
        this.servicio.actividadesAsignadas = Object.assign(actividades);
      }else{
        this.servicio.actividadesAsignadas = null;
      }
    })
  }

   
  obtenerDocumentacionGeneral(){
    var usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.periodo = JSON.parse(localStorage.getItem("currentPeriodo"));
    var portafolio = JSON.parse(localStorage.getItem("portDocSelect"));
    this.servicio.obtDocuGeneral(Number(portafolio.id_portafolio)).subscribe((documentacion:any)=>{
      if(documentacion!=null){
        this.documentacion_general=documentacion;
      }else{
        this.servicio.usuarioDatos = null; 
      }
    });
  }

  obtenerDocumentacionActividades(){
    let portafolio = JSON.parse(localStorage.getItem('portDocSelect'));
    this.servicio.obtDocuAct(portafolio.id_portafolio).subscribe((documentacion:any)=>{
      if(documentacion!=null){
        this.documentacion_actividad=documentacion;
      }else{
        this.documentacion_actividad= null; 
      }
    });
  }

  visualizar(documento){
    this.servicio.docGeneral =documento.path_ubicacion;
  }

  visualizarPdf(documento): void{
    const comp = this.compResolFactory.resolveComponentFactory(VisualizarPdfComponent);
    this.dynamicHost.viewContainerRef.createComponent(comp);
    this.servicio.docGeneral =documento.path_ubicacion;
  }

  validarDocGeneral(documento){
    this.autService.setDocumento(documento);
    this.router.navigateByUrl(('/validarDocGeneral'));
  }

  validarDocActividad(documento){
    this.autService.setDocumento(documento);
    this.router.navigateByUrl(('/validarDocActividad'));
  }

}
