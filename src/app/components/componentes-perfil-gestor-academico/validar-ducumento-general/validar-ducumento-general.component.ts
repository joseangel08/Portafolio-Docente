import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import WebViewer from '@pdftron/webviewer';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-validar-ducumento-general',
  templateUrl: './validar-ducumento-general.component.html',
  styleUrls: ['./validar-ducumento-general.component.css']
})
export class ValidarDucumentoGeneralComponent implements OnInit {
  @ViewChild('viewer') viewerRef:ElementRef;
  ngAfterViewInit():void{   
    WebViewer({
      path:'../../../../../assets/lib',
      initialDoc:(JSON.parse(localStorage.getItem("documentSelec"))).path_ubicacion
    }, this.viewerRef.nativeElement).then((data)=>{

    })
  }
  public documentacion="";
  roles : any;


  constructor(private servicio: DataService, private autService:AuthService, private router: Router) { }

  ngOnInit() {
    this.documentacion=JSON.parse(localStorage.getItem("documentSelec"));
  }

  regresar(){
    this.router.navigateByUrl(('/adminPortDoc'));
  }

  validarDocumento(documento){
    this.servicio.docActividad=this.documentacion;
  }

  noValidarDocumento(documento){
    this.servicio.docActividad=this.documentacion;
  }
  
  

}
