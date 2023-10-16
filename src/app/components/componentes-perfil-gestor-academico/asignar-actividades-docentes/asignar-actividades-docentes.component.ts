import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ActividadDocente } from './../../../model/ActividadDocente';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PeriodoAcademico } from 'src/app/model/PeriodoAcademico';

@Component({
  selector: 'app-asignar-actividades-docentes',
  templateUrl: './asignar-actividades-docentes.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AsignarActividadesDocentesComponent implements OnInit {
  private actividadesDocentes:ActividadDocente;
  public periodo_academico:PeriodoAcademico;
  public periodo_gracia:any;
  buscar="";
  periodo : any=null;
  constructor(private servicio: DataService, private router:Router) { }

  ngOnInit() {
    this.periodo=JSON.parse(localStorage.getItem("currentPeriodo")); 
    this.obtenerActividadesDocentes();
    this.obtenerPeriodoAcademico();
    this.obtenerPeriodoAcademicoGracia();
  }

  obtenerActividadesDocentes(){
    this.servicio.obtenerActividadesDocentes().subscribe((actividadesDocentes:ActividadDocente)=>(this.actividadesDocentes=actividadesDocentes));
  }

  obtenerPeriodoAcademico(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoActual(fecha).subscribe((periodo:PeriodoAcademico)=>(this.periodo_academico=periodo));

   }

   obtenerPeriodoAcademicoGracia(){
    var f = new Date();
    var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + f.getMonth()+"-"+f.getDate();
    this.servicio.obtenerPeriodoAcademicoGracia(fecha).subscribe((periodo)=>{
      this.periodo_gracia=periodo;
    });
   }

 asignarActividadDocente(actividadDocente){
    this.servicio.actividadDocenteAsignar= Object.assign({}, actividadDocente);
    this.servicio.actividadSeleccionada = Object.assign({}, actividadDocente);
    this.servicio.obtenerActDocSelect(this.servicio.actividadSeleccionada.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(data);
        }else{
          let rol = {'periodo_academico':"La actividad docente no está asignada.", 'fecha_inicio':'Ninguno', 'fecha_fin':'Ninguno', 'nombre':'Ninguno'};
          var array = [];
          array.push(rol)
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(array);    
        }        
    },
    error =>{console.log(error);         
    }
    );
    this.servicio.obtenerActDocSelect(this.servicio.actividadSeleccionada.id).subscribe(
      data=>{
        if(data!=null){
          //this.servicio.actividadSeleccionadaVisualizarPeriodoGracia =
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(data);
        }else{
          let rol = {'periodo_academico':"La actividad docente no está asignada.", 'fecha_inicio':'Ninguno', 'fecha_fin':'Ninguno', 'nombre':'Ninguno'};
          var array = [];
          array.push(rol)
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(array);    
        }        
    },
    error =>{console.log(error);         
    }
    );

    
  }

  //Visualiza la actividad docente que se selecciona
  visualizarActDocSelect(actividadDocenteSelect:any){
    this.servicio.actividadSeleccionada = Object.assign({}, actividadDocenteSelect);
    this.servicio.obtUsActAsigPerActual(actividadDocenteSelect.id, this.periodo.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(data);
        }else{
          this.servicio.actividadSeleccionadaVisualizar = null;
        }        
    },
    error =>{console.log(error);
    }
    );
    
    //Primero se evalua que haya un periodo academico con fecha de gracia, luego se busca los usuarios de la actividad docente
    if(this.periodo_gracia!=null){
      this.servicio.obtUsActAsigPerActual(actividadDocenteSelect.id, this.periodo_gracia.id).subscribe(
        data=>{
          if(data!=null){
            this.servicio.actividadSeleccionadaVisualizarPeriodoGracia = Object.assign(data);
          }      
      },
      error =>{console.log(error);
      }
      );
    }
  }

  eliminarUsuarioAD(actividadDocente){
    this.servicio.actividadDocenteAsignar= Object.assign({}, actividadDocente);
    this.servicio.actividadSeleccionada = Object.assign({}, actividadDocente);
    this.servicio.obtenerActDocSelect(this.servicio.actividadSeleccionada.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(data);
        }else{
          let rol = {'periodo_academico':"La actividad docente no está asignada.", 'fecha_inicio':'Ninguno', 'fecha_fin':'Ninguno', 'nombre':'Ninguno'};
          var array = [];
          array.push(rol)
          this.servicio.actividadSeleccionadaVisualizar = Object.assign(array);    
        }        
    },
    error =>{console.log(error);
    }
    );


  }

}
