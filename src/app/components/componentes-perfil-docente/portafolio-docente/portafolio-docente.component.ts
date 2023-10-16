import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { DataService } from 'src/app/services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicHostDirective } from '../../componentes-globales/directive/dynamic-host.directive';
import { VisualizarPdfComponent } from '../../componentes-globales/componentes-dinamicos/visualizar-pdf/visualizar-pdf.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portafolio-docente',
  templateUrl: './portafolio-docente.component.html',
  styleUrls: ['./portafolio-docente.component.css'],
  providers: [NgbAccordionConfig]
})

export class PortafolioDocenteComponent implements OnInit {
  @Input() path:any;
  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective;  
  periodo:any;
  documentacion_general:any;
  documentacion_actividad:any;
  documento:any;
  categorias:any;
  portafolio:any;

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
    var usuario = JSON.parse(localStorage.getItem("currentUser"));
    this.servicio.obtenerDatosUsuarioId(usuario.id).subscribe((datosUsuario:any)=>{
      if(datosUsuario!=null){
        this.servicio.usuarioDatos = Object.assign(datosUsuario);
        this.servicio.usuarioModificar = Object.assign(datosUsuario);
      }else{
        this.servicio.usuarioDatos = null; 
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
    var usuario = JSON.parse(localStorage.getItem("currentUser"));
    var periodo = JSON.parse(localStorage.getItem("currentPeriodo"));
    this.servicio.obtUsActAsigPerActualUsuario(usuario.id_docente, periodo.id).subscribe((actividades:any)=>{
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
    var id_portafolio = 
    this.servicio.obtDocuGeneral(Number(localStorage.getItem('tokenPort'))).subscribe((documentacion:any)=>{
      if(documentacion!=null){
        this.documentacion_general=documentacion;
      }else{
        this.documentacion_general = null; 
      }
    });
  }

  obtenerDocumentacionActividades(){
    var portafolio = JSON.parse(localStorage.getItem("portDocente"));
    if(portafolio!=null){
      this.servicio.obtDocuAct(portafolio.id).subscribe((documentacion:any)=>{
        if(documentacion!=null){
          
          this.documentacion_actividad=documentacion;
        }else{
          this.documentacion_actividad= null; 
        }
      });
    }
  }

  modificarUsuario(usuarioSelect:UsuarioTabla){
    this.servicio.usuarioModificar = Object.assign({}, usuarioSelect);
  }

  agregarDocumento(categoria){
    this.servicio.categoria = Object.assign({}, categoria);
  }

  agregarDocumentoActividad(id_actividad_docente:Number, id_portafolio_docente:Number, codigo:string){
    this.servicio.obtenerIdActDocPort(id_actividad_docente, id_portafolio_docente).subscribe(id=>{
      if(id!=null){
        this.servicio.codigoActividad = codigo;
        this.servicio.actividadDocentePortafolio = Object.assign({},id);
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

  abrirPdf(documento){
    this.servicio.docGeneral=documento;
    this.autService.setDocumentoVisualizar(this.servicio.docGeneral);
    this.router.navigateByUrl(('/visualizarPdf'));
  }

  eliminarDocumentoGeneral(documento){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar este documento?',
      text: "El documento se eliminará y no se podrá recuperar!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.eliminarDocumentoGeneral(documento).subscribe(
          data=>{
            if(data.verificador==true){
              this.mensajeGuardar(data.mensaje);
              setTimeout(()=>{
                location.reload();  
              },2000);
            }else{
              this.mensajeNoGuardar(data.mensaje);
              setTimeout(()=>{
                location.reload();  
              },2000);
            }
        },
        error =>{console.log(error);
        }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Usted a cancelado la inactivación.',
          'error'
        )
      }
    }) 
  }

  eliminarDocumento(documento){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que desea eliminar este documento?',
      text: "El documento se eliminará y no se podrá recuperar!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.eliminarDocumento(documento).subscribe(
          data=>{
            if(data.verificador==true){
              this.mensajeGuardar(data.mensaje);
            }else{
              this.mensajeNoGuardar(data.mensaje);
            }
        },
        error =>{console.log(error);
        }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Usted a cancelado la inactivación.',
          'error'
        )
      }
    }) 
  }

  mensajeGuardar(mensaje){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Operación exitosa.!',
      text:mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error en la operación.!',
      text: mensaje,
      showConfirmButton:true
    });
  }

}
