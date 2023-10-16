import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../model/Usuario';
import Swal  from 'sweetalert2';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../css/Estilos.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice:AuthService, private router:Router) {
  }
  usuario='';
  clave='';
  public error = false;
  public tamCad=0;
  public tamUs=0;
  public tamClav=0;
  public validador=false;
  public numErr=0;
  public usuarioCorrecto=true;
  public usuarioLogin=new Usuario();

  ngOnInit() {
  }


  login(formLogin:NgForm){
    if(formLogin.valid){
      return this.authservice.loginUsuario(this.usuarioLogin).subscribe((data:Usuario)=>{
          if(data!=null){
            this.authservice.setUsuario(data);
            let token_usuario = data.id;
            let token_periodo = 0;
            let token_portafolio = 0;
            this.authservice.setToken(token_usuario);
            this.authservice.obtenerPeriodoAcademico().subscribe((periodo:any)=>{
              if(periodo!=null){
                this.authservice.setPeriodo(periodo); //Si almacena valor en navegador
                token_periodo= periodo.id;
                this.authservice.setTokenPeriodo(token_periodo);
                let user:any = JSON.parse(localStorage.getItem('currentUser'));
                this.authservice.obtPortafolioPeriodo(user.id_docente,token_periodo).subscribe((portafolio:any)=>{
                  if(portafolio!=null){
                    this.authservice.setPortafolio(portafolio);
                    token_portafolio=portafolio.id;
                    this.authservice.setTokenPort(token_portafolio);
                  }
                })
              }else{
                this.authservice.setPeriodo(null); //Si almacena valor en navegador
                let tokenPeriodo = 1;
                this.authservice.setTokenPeriodo(tokenPeriodo);      
              }
            });
            this.router.navigate(["/perfil"]);
          }else{
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Usuario o clave incorrecta',
              showConfirmButton: true
            })
            this.usuarioCorrecto=false;
            this.numErr=this.numErr+1;
            setTimeout(()=>{
              this.usuarioCorrecto=true;
            },4000);
          }
      },
      error =>{console.log(error);
        }
        );
    }else{
      this.error=false;
      this.tamClav=0;
      this.tamUs=0;
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Existen campos vacíos. Verifique.',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}