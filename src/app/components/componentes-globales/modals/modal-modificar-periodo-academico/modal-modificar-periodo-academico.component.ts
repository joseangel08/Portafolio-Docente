import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';

@Component({
  selector: 'app-modal-modificar-periodo-academico',
  templateUrl: './modal-modificar-periodo-academico.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalModificarPeriodoAcademicoComponent implements OnInit {

  constructor(private servicio: DataService, private router: Router, private location: Location) { }
  private periodosAcademicos:PeriodoAcademico[];
  periodo : any=null;

  ngOnInit() {
    this.obtenerDatosPeriodo();
    this.obtenerPeriodosAcademicos();
  }

  obtenerPeriodosAcademicos(){
    this.servicio.obtenerPeriodosAcademicos().subscribe((periodosAcademicos:PeriodoAcademico[])=>(this.periodosAcademicos=periodosAcademicos));
  }

  modificarPeriodoAcademico(periodoAcademicoForm:NgForm){
    if(periodoAcademicoForm.valid){
      if(this.servicio.periodoAcademicoModificar.fecha_fin>this.servicio.periodoAcademicoModificar.fecha_inicio){
          var verificador = false;
          var auxPeriodo=this.servicio.periodoAcademicoModificar;
          this.periodosAcademicos.forEach(function (elemento, indice, array) {
            if((elemento.fecha_fin>=auxPeriodo.fecha_inicio)&&(elemento.id!=auxPeriodo.id)){
              verificador = true;
            }
          });
          if(verificador==false){
            return this.servicio.guardarPeriodoAcedmico(this.servicio.periodoAcademicoModificar).subscribe(
              data=>{
                let resp = data.verificador;
                if(resp==true){
                  this.mensajeGuardar();
                  setTimeout(()=>{
                    location.reload();  
                  },2000);  
                }else{
                  this.mensajeNoGuardar();    
                }
            },
            error =>{console.log(error);
            }
            );
          }else{
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'No se puede crear el periodo Académico. Ya existe uno que comprende las fechas especificadas!',
              showConfirmButton: true,
              timer: 2000
            });
          }         
      }else{
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: 'La fecha de fin, no puede ser menor que la fecha de inicio.!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }else{
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'El formulario tiene campos boligatorios vacios.!',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  mensajeGuardar(){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'El periodo académico ha sido modificado correctamente',
      showConfirmButton: false,
      timer: 4000
    })
  }

  mensajeNoGuardar(){
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: 'Hubo un error en la modificacion.!'
    })
  }

  obtenerDatosPeriodo(){
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
      if(per==null){
        this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
      }else{
        this.periodo=per;
      }
  }

}
