import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/model/Carrera';
import { PeriodoAcademico_Roles_Usuario } from 'src/app/model/PeriodoAcademico_Roles_Usuario';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { Verificador } from 'src/app/model/Verificador';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-cargar-documento',
  templateUrl: './modal-cargar-documento.component.html',
  styleUrls: ['./modal-cargar-documento.component.css']
})
export class ModalCargarDocumentoComponent implements OnInit {
  public usuario: UsuarioTabla;
  public carrera:Carrera;
  public verificador:Verificador;
  categoria:any;
  usuarioActivo : UsuarioTabla;
  portafolio:any;
  roles : PeriodoAcademico_Roles_Usuario [];
  informacionArchivo = {
    nombre_documento: null,
    nombre_archivo: null,
    comentario: null
  }

  private fileTemp:any;
  

  constructor(private authService:AuthService, private servicio: DataService, private router: Router) { }

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  getFile($event: any):void{
    const [file] = $event.target.files;
    this.fileTemp = {
      fileRaw:file,
      fileName:file.name
    }
  }

  guardarArchivo():void{
    const formData = new FormData();
    formData.append('archivo', this.fileTemp.fileRaw, this.fileTemp.fileName);
    formData.append('id_portafolio_docente', this.portafolio.id);
    formData.append('id_categoria', this.servicio.categoria.id);
    formData.append('nombre', this.informacionArchivo.nombre_documento);

    var f = new Date();
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    formData.append('fecha_ingreso', fecha);
    formData.append('estado', "No Validado");
    formData.append('comentario', this.informacionArchivo.comentario);
    formData.append('path_ubicacion', this.portafolio.path_dir_portafolio);
    this.servicio.guardarArchivo(formData).subscribe((verificador)=>{
      if(verificador!=null){
        if(verificador.verificador==true){
          this.mensajeGuardar(verificador.mensaje);
          setTimeout(()=>{
            location.reload();  
          },2000); 
        }else{
          this.mensajeNoGuardar();
        }
      }else{
        this.mensajeNoGuardar();
      }
    });
  }

  obtenerDatosUsuario(){
    var user = JSON.parse(localStorage.getItem("currentUser"));
    this.servicio.obtenerPortDocente(user.id_docente).subscribe((portafolio:any)=>{
      if(portafolio!=null){
        this.portafolio=portafolio;
      }
    });
    this.servicio.obtenerDatosUsuarioId(user.id).subscribe((usuarios:UsuarioTabla)=>{
      (this.usuarioActivo=usuarios);
    });
  }


  mensajeGuardar(mensaje:string){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000
    })
  }

  mensajeNoGuardar(){
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: 'No se pudo guardar su documento.!'
    })
  }


}
