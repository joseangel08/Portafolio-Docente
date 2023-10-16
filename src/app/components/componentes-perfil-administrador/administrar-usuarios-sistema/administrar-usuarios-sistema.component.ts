import { PeriodoAcademico_Roles_Usuario } from './../../../model/PeriodoAcademico_Roles_Usuario';
import { PeriodoAcademicoUsuario } from './../../../model/PeriodoAcademicoUsuario';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/Persona';
import { UsuarioTabla } from 'src/app/model/UsuarioTabla';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2'; 
import { Rol } from 'src/app/model/Rol';

@Component({
  selector: 'app-administrar-usuarios-sistema',
  templateUrl: './administrar-usuarios-sistema.component.html',
  styleUrls: ['../../componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component.css']
})
export class AdministrarUsuariosSistemaComponent implements OnInit {
  public datosPersona  = new Persona();
  public datosUsuario  = new UsuarioTabla();
  public isError = false;
  public roles = new Rol();
  rolesUsuario : any;
  public resultadoRoles:Array<any>
  private usuarios:UsuarioTabla;
  private rolPeriodo = new PeriodoAcademicoUsuario();
  title = 'sweetAlert';
  buscar="";
  verifDirec:Boolean;
  constructor(private servicio: DataService, private router:Router) { }

  obtenerUsuariosSistema(){
    this.servicio.obtenerUsuariosSistema().subscribe((usuarios:UsuarioTabla)=>(this.usuarios=usuarios))
  }

  
  ngOnInit() {
     this.obtenerUsuariosSistema();
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
        this.roles=null;
      }
    });
  }

  //Metodo para validar cedula
  validarCedula():boolean{
    var cedula = this.datosPersona.cedula;
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
         alert( "La cedula ES valida!!!" );
         return  true;
      } else{
         alert( "La cedula NO es valida!!!" );
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

  visualizarUsuario(usuarioSelect:UsuarioTabla){
    this.servicio.usuarioSelect = Object.assign({}, usuarioSelect);
    this.servicio.obtenerRolesUsuarios(this.servicio.usuarioSelect.id).subscribe(
      data=>{
        if(data!=null){
          this.servicio.rolesUsuario = Object.assign(data);
        }else{
          let rol:any = [];
          rol.id = null;
          rol.periodo_academico = 'Usuario sin roles.Por favor remítase al encargado.';
          rol.rol = "null";
          let  a:PeriodoAcademico_Roles_Usuario[]= [rol];
          this.servicio.rolesUsuario = Object.assign(a);
          


          //this.servicio.rolesUsuario = Object.assign(rolesUsuario);
        }
        
    },
    error =>{console.log(error);
    }
    );
    
  }

  /*modificarUsuario(usuarioSelect:UsuarioTabla){
    this.servicio.usuarioModificar = Object.assign({}, usuarioSelect);
  }*/

  modificarUsuario(usuarioSelect:UsuarioTabla){
    this.servicio.usuarioModificar = Object.assign({}, usuarioSelect);
  }

  activarUsuario(usuario){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea activar el usuario?',
      text: "El Usuario se inactivará.!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo inactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.activarUsuario(usuario).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Activado!',
              'El usuario ha sido activado satisfactoriamente.',
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

  desactivarUsuario(usuario){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Desea inactivar usuario?',
      text: "El usuario se inactivará y no se mostrará en la vista!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo inactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.desactivarUsuario(usuario).subscribe(
          data=>{
            let resp = data.verificador;
            swalWithBootstrapButtons.fire(
              'Inactivado!',
              'El usuario ha sido inactivado satisfactoriamente.',
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

  //PRUEBAS

}
