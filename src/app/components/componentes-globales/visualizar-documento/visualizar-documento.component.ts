import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer';

@Component({
  selector: 'app-visualizar-documento',
  templateUrl: './visualizar-documento.component.html',
  styleUrls: ['./visualizar-documento.component.css']
})
export class VisualizarDocumentoComponent implements AfterViewInit {
  @ViewChild('viewer') viewerRef:ElementRef;

  ngAfterViewInit():void{
    WebViewer({
      path:'../../../../../assets/lib',
      initialDoc:'../../../assets/docs/Portafolio UNL/Periodo Academico Agosto - Noviembre 2022/Jhoan David Loja Salazar/AD-01/Diploma.pdf'

    }, this.viewerRef.nativeElement)
  }

}
