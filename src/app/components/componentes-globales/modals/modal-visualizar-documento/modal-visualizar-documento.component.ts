import { Component, ElementRef, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import { DataService } from 'src/app/services/data.service';
import { VisualizarPdfComponent } from '../../componentes-dinamicos/visualizar-pdf/visualizar-pdf.component';
import { DynamicHostDirective } from '../../directive/dynamic-host.directive';


@Component({
  selector: 'app-modal-visualizar-documento',
  templateUrl: './modal-visualizar-documento.component.html',
  styleUrls: ['./modal-visualizar-documento.component.css']
})
export class ModalVisualizarDocumentoComponent implements OnInit {
  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective; 
  constructor(private servicio: DataService, private compResolFactory: ComponentFactoryResolver) { }
  public path="";


  ngOnInit() {
    const comp = this.compResolFactory.resolveComponentFactory(VisualizarPdfComponent);
    this.dynamicHost.viewContainerRef.createComponent(comp);
  }
  cerrarPdf(){
    localStorage.removeItem('docViewer');
  }


}
