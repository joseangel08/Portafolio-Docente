import { PeriodoAcademico } from './../../../model/PeriodoAcademico';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';

@Component({
  selector: 'app-administrar-periodos-academicos',
  templateUrl: './administrar-periodos-academicos.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarPeriodosAcademicosComponent implements OnInit {

  constructor(private servicio: DataService, private router:Router) { }
  private periodosAcademicos:PeriodoAcademico;
  rolesUsuario : any;
  verifDirec:Boolean;
  buscar="";
  obtenerPeriodosAcademicos(){
    this.servicio.obtenerPeriodosAcademicos().subscribe((periodosAcademicos:PeriodoAcademico)=>(this.periodosAcademicos=periodosAcademicos));
  }

  ngOnInit() {
    this.obtenerPeriodosAcademicos();
    this.obtenerRolesUsuario();
  }

  obtenerRolesUsuario(){
    var id:Number;
    id = Number(localStorage.getItem('accessToken'));
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>{
      if(roles!=null){
        this.rolesUsuario=roles;
        this.rolesUsuario.forEach(rol => {
          if(rol.rol=="Administrador"){
            this.verifDirec=false;
          }else{
            this.verifDirec=true;
          }
        });
      }else{
        this.rolesUsuario=null;
      }
    });
  }

  visualizarPeriodoAcademico(periodoAcademicoSelect:PeriodoAcademico){
    this.servicio.periodoAcademicoSelect= Object.assign({}, periodoAcademicoSelect);
  }

  modificarPeriodoAcademico(periodoAcademicoModificar:PeriodoAcademico){
    this.servicio.periodoAcademicoModificar = Object.assign({}, periodoAcademicoModificar);
  }

  desactivarPeriodoAcademico(periodoAcademico){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea inactivar el Periodo Academico?',
      text: "El Periodo Academico se Desactivará!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo Desactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.desactivarPeriodoAcademico(periodoAcademico).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Inactivado!',
              'El Período Académico ha sido desactivado satisfactoriamente.',
              'success'
            )
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

  activarPeriodoAcademico(periodoAcademico){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea activar el Periodo Academico?',
      text: "El Periodo Academico se Activará!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo Activar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.activarPeriodoAcademico(periodoAcademico).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Inactivado!',
              'El Período Académico ha sido Activado satisfactoriamente.',
              'success'
            )
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
          'Usted a cancelado la Activación.',
          'error'
        )
      }
    }) 
  }
}
