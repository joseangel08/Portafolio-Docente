import { Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { VisualizarPdfComponent} from '../componentes-dinamicos/visualizar-pdf/visualizar-pdf.component'
import { DynamicHostDirective } from '../directive/dynamic-host.directive';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  public previsualizacion:string;
  public archivos:any = [];
  private fileTmp:any;

  mostrar: Boolean = false;
  mensaje: String = 'Hola, feo';
  mensaje_enlace: String = 'Mostrar';

  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective;

  constructor(private compResolFactory: ComponentFactoryResolver, private sanitizer:DomSanitizer, private servicio:DataService) {}
  ngOnInit() {}

  capturarFile(event):any{
    const archivoCapturado =  event.target.files[0];
    this.extraerBase64(archivoCapturado).then((archivo : any)=>{
      this.previsualizacion = archivo.base;
    });
    this.archivos.push(archivoCapturado);
  }

  getFile($event:any):void{
    const [file] =  $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }

  sendFile():void{
    const formData = new FormData();
    formData.append('FILES', this.fileTmp.fileRaw, this.fileTmp.fileName);
    formData.append('id', '1');
    this.servicio.guardarArchivo(formData);
  }

  extraerBase64 = async ($event:any)=>new Promise((resolve, reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustHtml(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve ({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          blob:$event, image,
          base:null
        })
      }
      
    }catch(e){
      return null;
    }
  })


  crearCompDoc(): void{
    const comp = this.compResolFactory.resolveComponentFactory(VisualizarPdfComponent);
    this.dynamicHost.viewContainerRef.createComponent(comp);
  }

  subirArchivo():void{
    const formData = new FormData();
    this.archivos.array.forEach(archivo => {
      formData.append('FILES', archivo)
    });
    formData.append('id_actividad','1');
  }

}
