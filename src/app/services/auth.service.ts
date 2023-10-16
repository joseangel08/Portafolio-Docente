import { Usuario } from './../model/Usuario';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  headers : HttpHeaders = new HttpHeaders({"Content-Type":"application/json"});

  /*loginUsuario(usuario:string, clave:string):Observable<any>{
    return this.http.post<Usuario>('/PortafolioDocente/src/app/server/public/api/login', {usuario, clave}, {headers:this.headers}).pipe(map(data=>data));
  }*/

  loginUsuario(usuario:Usuario):Observable<any>{
    let json = JSON.stringify(usuario);
    return this.http.post<Usuario>('/PortafolioDocente/src/app/server/public/api/login',json, {headers:this.headers}).pipe(map(data=>data));
  }

  obtenerPeriodoAcademico():Observable<any>{
    var f = new Date();
    //var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    let json = JSON.stringify({fecha});
   return this.http.post('/PortafolioDocente/src/app/server/public/api/obtenerPeriodoAcademicoActual',json, {headers:this.headers}).pipe(map(data=>data));
   }

     //Obtener documento de Actividades docente
  obtPortafolioPeriodo(id_docente:Number, id_periodo_academico):Observable<any>{
    let json = JSON.stringify({id_docente, id_periodo_academico});
    return this.http.post('/PortafolioDocente/src/app/server/public/api/obtPortPeriodo',json,{headers:this.headers});
  }

  setUsuario(user:Usuario):void{
    let usuario = JSON.stringify(user);
    localStorage.setItem("currentUser", usuario);
  }

  setPortafolio(portafolio):void{
    let port= JSON.stringify(portafolio);
    localStorage.setItem("portDocente", port);
  }

  setPortDocSelect(portafolio):void{
    let port= JSON.stringify(portafolio);
    localStorage.setItem("portDocSelect", port);
  }

  setDocumentoVisualizar(documento):void{
    let port= JSON.stringify(documento);
    localStorage.setItem("docViewer", port);
  }

  setPeriodo(periodo):void{
    localStorage.setItem("currentPeriodo", JSON.stringify(periodo));
  }

  setToken(token):void{
    localStorage.setItem("accessToken", token);
  }

  setDocentSelec(docente):void{
    let doc= JSON.stringify(docente);
    localStorage.setItem("docSelec", doc);
  }

  setTokenPeriodo(tokenPeriodo):void{
    localStorage.setItem("tokenPeriodo", JSON.stringify(tokenPeriodo));
  }

  setTokenPort(tokenPort):void{
    localStorage.setItem("tokenPort", JSON.stringify(tokenPort));
  }

  setDocumento(documento):void{
    let doc= JSON.stringify(documento);
    localStorage.setItem("documentSelec", doc);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  getTokenPeriodo(){
    return localStorage.getItem("tokenPeriodo");
  }

  getTokenPort(){
    return localStorage.getItem("tokenPort");
  }

  getUsuarioLogeado():Usuario{
    let usuario = localStorage.getItem("currentUser");
    if(isNullOrUndefined(usuario)){
      let user:Usuario = JSON.parse(usuario);
      return user;
    }else{
      return null;
    }
  }

  getPeriodoActual():any{
    let periodo = localStorage.getItem("currentPeriodo");
    if(isNullOrUndefined(periodo)){
      let per:any = JSON.parse(periodo);
      return per;
    }else{
      return null;
    }
  }

  getPortDocSelect():any{
    let portafolio = localStorage.getItem("portDocSelect");
    if(isNullOrUndefined(portafolio)){
      let port:any = JSON.parse(portafolio);
      return port;
    }else{
      return null;
    }
  }

  getDocViewer():any{
    let doc = localStorage.getItem("docViewer");
    if(isNullOrUndefined(doc)){
      let port:any = JSON.parse(doc);
      return port;
    }else{
      return null;
    }
  }

  getPortafolioDocente():any{
    let portafolio = localStorage.getItem("portDocente");
    if(isNullOrUndefined(portafolio)){
      let port:any = JSON.parse(portafolio);
      return port;
    }else{
      return null;
    }

  }

  getDocumento():any{
    let documento = localStorage.getItem("documentSelec");
    if(isNullOrUndefined(documento)){
      let port:any = JSON.parse(documento);
      return port;
    }else{
      return null;
    }
  }

  getDocSelec():any{
    let portafolio = localStorage.getItem("docSelec");
    if(isNullOrUndefined(portafolio)){
      let port:any = JSON.parse(portafolio);
      return port;
    }else{
      return null;
    }

  }

  cerrarSession(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tokenPeriodo');
    localStorage.removeItem('currentPeriodo');
    localStorage.removeItem('portDocente');
    localStorage.removeItem('tokenPort');
    localStorage.removeItem('portDocSelect');
    localStorage.removeItem('documentSelec');
  }
}
