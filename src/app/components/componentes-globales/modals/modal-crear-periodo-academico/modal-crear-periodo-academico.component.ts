import { AuthService } from './../../../../services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { PeriodoAcademico } from './../../../../model/PeriodoAcademico';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-crear-periodo-academico',
  templateUrl: './modal-crear-periodo-academico.component.html',
  styleUrls: ['../modal-crear-usuario/modal-crear-usuario.component.css']
})
export class ModalCrearPeriodoAcademicoComponent implements OnInit {

  constructor(private authService:AuthService, private servicio: DataService, private location:Location) { }

  private periodoAcademico=new PeriodoAcademico();
  private periodosAcademicos:PeriodoAcademico[];
  periodo : any=null;

  ngOnInit() {
    this.obtenerDatosPeriodo();
    this.obtenerPeriodosAcademicos();
  }

  obtenerPeriodosAcademicos(){
    this.servicio.obtenerPeriodosAcademicos().subscribe((periodosAcademicos:PeriodoAcademico[])=>(this.periodosAcademicos=periodosAcademicos));
  }

  guardarPeriodoAcedmico(usuarioForm:NgForm){  
    if(usuarioForm.valid){
      if(this.periodoAcademico.fecha_fin>this.periodoAcademico.fecha_inicio){
          var verificador = false;
          var auxPeriodo=this.periodoAcademico;
          this.periodosAcademicos.forEach(function (elemento, indice, array) {
            if((elemento.fecha_fin>=auxPeriodo.fecha_inicio)){
              verificador = true;
            }
          });
          if(verificador==false){
            return this.servicio.guardarPeriodoAcedmico(this.periodoAcademico).subscribe(
              data=>{
                console.log("La respues del servidor.."+JSON.stringify(data));                
                let resp = data.verificador;
                if(resp==true){
                  this.mensajeGuardar(data.mensaje);
                  setTimeout(()=>{
                    location.reload();  
                  },2000);  
                }else{
                  this.mensajeNoGuardar(data.mensaje);    
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

  mensajeGuardar(mensaje){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Transaccion Exitosa',
      text: mensaje,
      showConfirmButton: false,
      timer: 2000
    });
    
  }

  mensajeNoGuardar(mensaje){
    Swal.fire({
      type: 'error',
      title: 'Error en la transaccion',
      text: mensaje
    });
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
