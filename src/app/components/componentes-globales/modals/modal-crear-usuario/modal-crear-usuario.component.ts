import { PeriodoAcademico_Roles_Usuario } from './../../../../model/PeriodoAcademico_Roles_Usuario';
import { Persona } from './../../../../model/Persona';
import { AuthService } from '../../../../services/auth.service';
import Swal  from 'sweetalert2';
import { Carrera } from '../../../../model/Carrera';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/model/Rol';
import { Location } from '@angular/common';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { viewEngine_ChangeDetectorRef_interface } from '@angular/core/src/render3/view_ref';
import { Verificador } from 'src/app/model/Verificador';
@Component({
  selector: 'app-modal-crear-usuario',
  templateUrl: './modal-crear-usuario.component.html',
  styleUrls: ['./modal-crear-usuario.component.css']
})
export class ModalCrearUsuarioComponent implements OnInit {
  private rol:Rol;
  public isError = false;
  public usuario=new UsuarioTabla();
  public carrera:Carrera;
  public verificador:Verificador;
  usuarioActivo : UsuarioTabla;
  ciPasap="";
  public opcion:string;
  roles : PeriodoAcademico_Roles_Usuario [];
  periodo : any;

  constructor(private authService:AuthService, private servicio: DataService, private location:Location) { 
  }

  ngOnInit() {
    this.obtenerRolesUsuario();
    this.obtenerRoles();
    this.obtenerCarrerasActivas();
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla)=>(this.usuarioActivo=usuarios));
    //this.dataService.obtenerDatosUsuarioId(id).subscribe((usuarios:UsuarioTabla[])=>(this.usuario=usuarios));
    var per = JSON.parse(localStorage.getItem("currentPeriodo"));
    if(per==null){
      this.periodo=JSON.parse('{"id":null,"fecha_inicio":"null","fecha_fin":"null","estado":"null","descripcion":"No existe ningun periodo academico activo y/o creado","null":"null","path_dir_periodo":"null"}');
    }else{
      this.periodo=per;
    }
  }

  obtenerRolesUsuario(){
    var id:Number;
    id = Number(this.authService.getToken());
    this.servicio.obtenerRolesUsuario(id).subscribe((roles:PeriodoAcademico_Roles_Usuario[])=>{
      if(roles!=null){
        this.roles=roles
      }else{
        this.roles=null;
      }
    });
  }

  obtenerRoles(){
    this.servicio.obtenerRolesSistema().subscribe((rol:Rol)=>(this.rol=rol));
  }

  obtenerCarrerasActivas(){
    this.servicio.obtenerCarrerasAsignar().subscribe((carrera:Carrera)=>(this.carrera=carrera));
  }


  quitarRol(rol:Rol){
    this.servicio.quitarRol(rol);
  }

  guardarUsuario(usuarioForm:NgForm){  
    if(usuarioForm.valid){
      if(this.opcion=="cedula"){
        this.usuario.cedula=this.ciPasap;
        if(this.validarCedula()==true){
          this.guardarUsuariosDNIPas();
        }else{
          this.mensajeCedula();
        }
      }else{
        this.usuario.pasaporte=this.ciPasap;
        this.guardarUsuariosDNIPas();
      }
    }else{
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'El formulario tiene campos obligatorios vacíos.',
        showConfirmButton: false,
        timer: 3000
      })
    }
    
    }

  guardarUsuariosDNIPas(){
    var respuesta:Persona=new Persona;
    this.servicio.obtenerUsuarioCedula(this.usuario).subscribe(
      data=>{
        respuesta=data;
        if(respuesta!=null){
          this.mensajeGuardar("La cedula o pasaporte se encuentra registrada en la BD.!");
        }else{
          this.servicio.obtenerUsuarioCorreo(this.usuario).subscribe(
            data1=>{
              if(data1!=null){
                this.mensajeNoGuardar("El correo ya se encuentra registrado en la BD.!");
              }else{
                return this.servicio.guardarUsuario(this.usuario).subscribe(
                  data2=>{
                    let resp = data2.verificador;
                    if(resp==true){
                      this.mensajeGuardar("Usuario almacenado correctamente.");
                      setTimeout(()=>{
                        location.reload();  
                      },2000);  
                    }else{
                      this.mensajeNoGuardar('El usuario ya existe en la BD.!');    
                    }
                },
                error =>{console.log(error);
                }
                );
              }
            }
          ) 
        }
        
    },
    error =>{console.log(error);
    }
    );
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

  mensajeCedula(){
    Swal.fire({
      position: 'center',
      type: 'error',
      title: 'La cédula ingresada es incorrecta.',
      showConfirmButton: true
    })
  }

  mensajeNoGuardar(mensaje:string){
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: mensaje,
      showConfirmButton: true
    })
  }

  //Metodo para validar cedula
  validarCedula():boolean{
    var cedula = this.usuario.cedula;
    var ced = cedula;
    var cadena = ced.length;
    var i;
    if ( cadena == 10 ){
      var total = 0;
      var digito = parseInt(ced[9])*1;
      for( i=0; i < (cadena-1); i++ ) {
        var mult = 0; 
        if ( ( i%2 ) != 0 ) { 
          total = total + (parseInt (ced[i]) * 1 ); 
        } else { 
          mult = parseInt(ced[i]) * 2; 
        if ( mult > 9 )
          total = total + ( mult - 9 );
        else
          total = total + mult;
        }
      }
      var decena = total / 10;
      decena = Math.floor( decena );
      decena = ( decena + 1 ) * 10;
      var final = ( decena - total );
      if ( ( final == 10 && digito == 0 ) || ( final == digito ) ) {
         return  true;
      } else{
         return false;
      }
    }

  }

  

  error(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
