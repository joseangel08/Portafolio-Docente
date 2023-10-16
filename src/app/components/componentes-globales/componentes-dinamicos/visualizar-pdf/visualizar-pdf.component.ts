import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import WebViewer from '@pdftron/webviewer';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-visualizar-pdf',
  templateUrl: './visualizar-pdf.component.html',
  styleUrls: ['./visualizar-pdf.component.css']
})
export class VisualizarPdfComponent implements OnInit {
  @ViewChild('viewer') viewerRef:ElementRef;
  ngAfterViewInit():void{   
    WebViewer({
      path:'../../../../../assets/lib',
      initialDoc:(JSON.parse(localStorage.getItem('docViewer'))).path_ubicacion
    }, this.viewerRef.nativeElement).then((data)=>{

    })
  }
  public path_ubicacion="";
  roles : any;


  constructor(private servicio: DataService, private autService:AuthService, private router: Router) { }

  ngOnInit() {
    this.path_ubicacion=this.servicio.docGeneral.path_ubicacion;
    this.obtenerRolesUsuario();
  }

  obtenerRolesUsuario(){
    var id:Number;
    id = Number(this.autService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>{
      this.roles=roles;
    });
  }

  regresar(){
    this.router.navigateByUrl(('/portDocente'));
  }

  validarDocumento(actividadDocente){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea inactivar la Actividad Docente?',
      text: "La Actividad Docente se inactivará y no se mostrará en la vista!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo inactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.activarActividadDocente(actividadDocente).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Activado!',
              'La Actividad Docente ha sido activada satisfactoriamente.',
              'success'
            );
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
          'Usted a cancelado la activación.',
          'error'
        )
      }
    }) 
  }
  

}
