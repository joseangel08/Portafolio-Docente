import { UsuarioTabla } from './../model/UsuarioTabla';
import { PeriodoAcademico_Roles_Usuario } from './../model/PeriodoAcademico_Roles_Usuario';
import { PeriodoAcademicoUsuario } from './../model/PeriodoAcademicoUsuario';
import { Rol } from './../model/Rol';
import { ActividadDocenteUsuario } from './../model/ActividadDocenteUsuario';
import { ActividadDocente } from './../model/ActividadDocente';
import { PeriodoAcademico } from './../model/PeriodoAcademico';
import { AuthService } from './auth.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from "rxjs";
import { tap } from 'rxjs/operators';
import { Persona } from '../model/Persona';
import { Usuario } from '../model/Usuario';
import { from } from 'rxjs';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';
import { Verificador } from '../model/Verificador';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() pdf: EventEmitter<any> = new EventEmitter()
  
  apiUrl = '/PortafolioDocente/src/app/server/public/api/obtenerUsuario';
  constructor(private _http: HttpClient, private auth: AuthService ) { }
  usuarios: Observable<any>;
  usuario: Observable<any>;
  public periodo_aca = new Subject<void>();
  public docenteModificar=null;
  public actividadesAsignadas:any[]=[];
  public rolesUsuario=[];
  public rolesUsuarioHistorial=[];
  public rolesUsuarioAsignar=[];
  public usuarioDatos=[];
  public categoria:any=[];
  public actividadDocente:any=[];
  public actividadDocentePortafolio:any;
  public codigoActividad:any="";
  public docGeneral:any=[];
  public docActividad:any=[];
  public id_docente_selec="";
  public portafolio_selec:any=[];
  public usuarioSelect:UsuarioTabla={
    id:null, cedula:'', pasaporte:'', nombre:'', apellido:'', correo:'', //id_rol:'', rol:'', 
    usuario:'', clave:'', id_persona:null, carrera:'', roles:null,
    id_carrera:null,  telefono:'', celular:'', direccion:'', estado:''};
  public usuarioModificar:UsuarioTabla={
    id:null, cedula:'', pasaporte:'', nombre:'', apellido:'', correo:'', //id_rol:'', rol:'', 
    usuario:'', clave:'', id_persona:null, carrera:'', roles:null,
    id_carrera:null,  telefono:'', celular:'', direccion:'', estado:''};
  public usuarioAsignarRol:UsuarioTabla={
    id:null, cedula:'', pasaporte:'', nombre:'', apellido:'', correo:'', //id_rol:'', rol:'', 
    usuario:'', clave:'', id_persona:null, carrera:'', roles:null,
    id_carrera:null, telefono:'', celular:'', direccion:'', estado:''};
  public usuarioDesactivar:UsuarioTabla={
    id:null, cedula:'', pasaporte:'', nombre:'', apellido:'', correo:'', //id_rol:'', rol:'', 
    usuario:'', clave:'', id_persona:null, carrera:'', roles:null,
    id_carrera:null, telefono:'', celular:'', direccion:'', estado:''};
  public rolSelect:Rol={
    id:null, nombre_rol:'', estado:''}  
  public rolModificar:Rol={
    id:null, nombre_rol:'', estado:''}
  public periodoAcademicoSelect:PeriodoAcademico={
    id:null, descripcion:'', fecha_inicio:null, fecha_fin:null, fecha_fin_maxima:null, estado:'', path_dir_periodo:''}
  public periodoAcademicoModificar:PeriodoAcademico={
      id:null, descripcion:'', fecha_inicio:null, fecha_fin:null, fecha_fin_maxima:null, estado:'', path_dir_periodo:''}
  public actividadDocenteSelect:ActividadDocente={
    id:null, codigo:'', nombre:null,  descripcion:null, estado:''}
  public actividadDocenteModificar:ActividadDocente={
    id:null, nombre:null, codigo:'', descripcion:null, estado:''}
  public actividadDocenteAsignar:ActividadDocente={
    id:null, nombre:null, codigo:'', descripcion:null, estado:''}
  public roles:any=[];  
  //Solo Pruebas
  public periodoUsuarioPrueba:PeriodoAcademicoUsuario={
    id:null, roles:null, id_usuario:null}
  public actividadSeleccionada:any=[];
  public actividadSeleccionadaVisualizar:any=[];
  public actividadSeleccionadaVisualizarPeriodoGracia:any=[];
  public historialUsuariosActividad:any=[];
  public periodoActual:any=[];
  public rolesActuales=[];
  public rolesLogin:any=[];
  public carreraModificar:any=[];
  public categoriaModificar:any=[];
  public usuariologin:UsuarioTabla={
    id:null, cedula:'', pasaporte:'', nombre:'', apellido:'', correo:'', //id_rol:'', rol:'', 
    usuario:'', clave:'', id_persona:null, carrera:'', roles:null,
    id_carrera:null, telefono:'', celular:'', direccion:'', estado:''};

  getRefresh(){
    return this.periodo_aca;
  }
  
  obtenerPersonas(){
    return this._http.get<Persona[]>(this.apiUrl);
  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.auth.getToken()
  });

  loginUsuarios(usuario:Usuario){
    let json = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post<Usuario[]>('/PortafolioDocente/src/app/server/public/api/login', json,{headers});
  }
  
  obtenerUsuarioCedula(usuario:UsuarioTabla){
    let json = JSON.stringify(usuario);
    return this._http.post<Persona>("/PortafolioDocente/src/app/server/public/api/obtenerUsuarioCedula",json,{headers:this.headers});
  }

  verificarUsuarioCedula(usuario:UsuarioTabla){
    let json = JSON.stringify(usuario);
    return this._http.post<Persona>("/PortafolioDocente/src/app/server/public/api/verificarExistenciaUsuario",json,{headers:this.headers});
  }

  obtenerUsuarioCorreo(usuario:UsuarioTabla){
    let json = JSON.stringify(usuario);
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/obtenerUsuarioCorreo",json,{headers:this.headers});
  }
  
  guardarUsuario(usuario: UsuarioTabla):Observable<any>{
    let json = JSON.stringify(usuario);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/guardarUsuario",json,{headers:this.headers});
  }

  actualizarUsuario(usuario: UsuarioTabla):Observable<any>{
    let json = JSON.stringify(usuario);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actualizarUsuario",json,{headers:this.headers});
  }

  actualizarDatosDocente(usuario: UsuarioTabla):Observable<any>{
    let json = JSON.stringify(usuario);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actualizarDatosDocente",json,{headers:this.headers});
  }

  desactivarUsuario(usuario: UsuarioTabla){    
    usuario.estado="Inactivo";
    let json = JSON.stringify(usuario);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/inactivarUsuario",json,{headers:this.headers});
  }

  activarUsuario(usuario: UsuarioTabla){    
    usuario.estado="Activo";
    let json = JSON.stringify(usuario);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/inactivarUsuario",json,{headers:this.headers});
  }

  obtenerUsuariosSistema(){
    return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerDatosUsuario', {headers:this.headers});
  }

  obtenerDatosUsuarioId(id:Number){
    let json = JSON.stringify({id});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerDatosUsuarioId',json,{headers:this.headers});
  }

  obtenerDatosDocenteId(id_docente:Number){
    let json = JSON.stringify({id_docente});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerDatosPersonaId',json,{headers:this.headers});
  }

  obtenerDatosUsuarioLogin(id:Number){
    let json = JSON.stringify({id});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerDatosUsuarioLogin',json,{headers:this.headers});
  }

  obtenerRolesUsuario(id:Number){
    let json = JSON.stringify({id});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuario',json,{headers:this.headers});
  }

  //Obtener roles del usuario del periodo academico actual
  obtenerRolesUsuarioPeriodoActual(id_usuario:Number, id_periodo_academico:Number){
    let json = JSON.stringify({id_usuario, id_periodo_academico});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuariosPeriodoActual',json,{headers:this.headers});
    //return this._http.post<UsuarioTabla[]>('/PortafolioDocente/src/app/server/public/api/obtenerDatosUsuarioId', json,{headers:this.headers});
  }

  obtenerRolesSistema(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerRoles');
  }

  obtenerCarreras(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerCarreras');
  }

  obtenerCarrerasAsignar(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerCarrerasAsignar');
  }

  guardarRol(rol: Rol):Observable<any>{
    let json = JSON.stringify(rol);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/guardarRol",json,{headers:this.headers});
  }

  verificarRol(rol: Rol):Observable<any>{
    let json = JSON.stringify(rol);
    return this._http.post<Rol>("/PortafolioDocente/src/app/server/public/api/buscarRol",json,{headers:this.headers});
  }

  actualizarRol(rol: Rol):Observable<any>{
    let json = JSON.stringify(rol);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actualizarRol",json,{headers:this.headers});
  }

  activarRol(rol: Rol){    
    rol.estado="Activo";
    let json = JSON.stringify(rol);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/inactivarRol",json,{headers:this.headers});
  }

  desactivarRol(rol: Rol){    
    rol.estado="Inactivo";
    let json = JSON.stringify(rol);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/inactivarRol",json,{headers:this.headers});
  }

  eliminarRol(rol: Rol){    
    let json = JSON.stringify(rol);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/eliminarRol",json,{headers:this.headers});
  }


  obtenerPeriodosAcademicos(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerPeriodosAcademicos');
  }

  guardarPeriodoAcedmico(periodoAcademico: PeriodoAcademico):Observable<any>{
    let json = JSON.stringify(periodoAcademico);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/guardarPeriodoAcademico",json,{headers:this.headers});
  }

  actualizarPeriodoAcademico(periodoAcademico: PeriodoAcademico):Observable<any>{
    let json = JSON.stringify(periodoAcademico);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actualizarPeriodoAcademico",json,{headers:this.headers});
  }

  desactivarPeriodoAcademico(periodoAcademico: PeriodoAcademico){    
    periodoAcademico.estado="Inactivo";
    let json = JSON.stringify(periodoAcademico);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/estadoPeriodoAcademico",json,{headers:this.headers});
  }

  activarPeriodoAcademico(periodoAcademico: PeriodoAcademico){    
    periodoAcademico.estado="Activo";
    let json = JSON.stringify(periodoAcademico);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/estadoPeriodoAcademico",json,{headers:this.headers});
  }

  guardarActividadDocente(actividadDocente: ActividadDocente):Observable<any>{
    actividadDocente.estado="Activo";
    let json = JSON.stringify(actividadDocente);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/guardarActividadDocente",json,{headers:this.headers});
  }

  obtenerActividadesDocentes(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerActividadesDocentes');
  }

  actualizarActividadDocente(actividadDocente: ActividadDocente):Observable<any>{
    let json = JSON.stringify(actividadDocente);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actualizarActividadDocente",json,{headers:this.headers});
  }

  activarActividadDocente(actividadDocente: ActividadDocente){    
    actividadDocente.estado="Activo";
    let json = JSON.stringify(actividadDocente);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/estadoActividadDocente",json,{headers:this.headers});
  }

  desactivarActividadDocente(actividadDocente: ActividadDocente){    
    actividadDocente.estado="Inactivo";
    let json = JSON.stringify(actividadDocente);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/estadoActividadDocente",json,{headers:this.headers});
  }

  asignarActividadDocente(actividadDocenteUsuario: ActividadDocenteUsuario):Observable<any>{
    let json = JSON.stringify(actividadDocenteUsuario);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/asignarActividadDocente",json,{headers:this.headers});
  }

  insertarRoles(rol:Rol){
    if(!this.roles.includes(rol)){
      this.roles.push(rol);
    } 
  }

  quitarRol(rol:Rol){
    let indice = 0;
    for (let rolArray of this.roles){
      if(rolArray==rol){
        this.roles.splice(indice, 1);
      }
      indice++;
    }
  }

    //METODOS DE PRUEBAS
  obtenerRolesPruebas(roles: PeriodoAcademicoUsuario):Observable<any>{
    let json = JSON.stringify(roles);
    return this._http.post<PeriodoAcademicoUsuario>("/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuario",json,{headers:this.headers});
  }

  obtenerRolesUsuarios(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuario",json,{headers:this.headers});
  }

  obtenerHistorialRolesUsuarios(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuario",json,{headers:this.headers});
  }


  obtenerPeriodoAcademicoActual(fecha:String){
    let json = JSON.stringify({fecha});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerPeriodoAcademicoActual',json,{headers:this.headers});
    //return this._http.post<UsuarioTabla[]>('/PortafolioDocente/src/app/server/public/api/obtenerDatosUsuarioId', json,{headers:this.headers});
  }

  obtenerPeriodoAcademicoGracia(fecha:String){
    let json = JSON.stringify({fecha});
   return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerPeriodoAcademicoGracia',json,{headers:this.headers});
    //return this._http.post<UsuarioTabla[]>('/PortafolioDocente/src/app/server/public/api/obtenerDatosUsuarioId', json,{headers:this.headers});
  }

  asignarRolUsuario(rol:PeriodoAcademico_Roles_Usuario):Observable<any>{
    let json = JSON.stringify(rol);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/asignarRolUsuario",json,{headers:this.headers});
  }

  obtenerRolesUsuariosPeriodos(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuariosPeriodos",json,{headers:this.headers});
  }

  obtenerRolesUsuariosPer(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post<PeriodoAcademico_Roles_Usuario[]>("/PortafolioDocente/src/app/server/public/api/obtenerRolesUsuariosPeriodos",json,{headers:this.headers});
  }

  //Obtener Roles Disponibles para el usuario
  obtenerRolesDisponibles(id:Number){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerRoles');
  }


  //Obtener Roles Disponibles para el usuario
  obtenerActDocUsuarios(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerActDocUsuarios');
  }


  //Obtener Actividad Docente Seleccionada
  obtenerActDocSelect(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerActDocSelect",json,{headers:this.headers});
  }

  //Obtener Usuario de Actividades Docentes en un determinado periodo academico
  obtUsActAsigPerActual(id_actividad_docente:Number, id_periodo_academico:Number):Observable<any>{
    let json = JSON.stringify({id_actividad_docente, id_periodo_academico});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtUsActAsigPerActual",json,{headers:this.headers});
  }

  //Obtiene los actividades docentes asignadas de un usuario en un período académico
  obtUsActAsigPerActualUsuario(id_usuario:Number, id_periodo_academico:Number):Observable<any>{
    let json = JSON.stringify({id_usuario, id_periodo_academico});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtUsActAsigPerActualUsuario",json,{headers:this.headers});
  }

  //Obtiene todas las actividades docentes de un docente
  obtActividadesDocente(id_docente:Number):Observable<any>{
    let json = JSON.stringify({id_docente});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtActDoc",json,{headers:this.headers});
  }

   //Obtener Actividad Docente Seleccionada
   obtenerActDocId(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerActDocId",json,{headers:this.headers});
  }

    //Obtener Actividad Docente del Usuario Activo
    obtenerActDocUsuarioSelect(id:Number):Observable<any>{
      let json = JSON.stringify({id});
      return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerActDocUsuarioSelect",json,{headers:this.headers});
    }
  
  
  eliminarUsuarioAD(actividad){    
    let json = JSON.stringify(actividad);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/eliminarUsuarioAD",json,{headers:this.headers});
  }

  habilitarPortafolio(id_docente, id_periodo_academico){
    let json = JSON.stringify({id_docente, id_periodo_academico});
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/habilitarPortafolioDocente",json,{headers:this.headers});
  }

  //Obtener documentacion general portafolio
  obtDocuGeneral(id_portafolio:Number){
    let json = JSON.stringify({id_portafolio});
    return this._http.post('/PortafolioDocente/src/app/server/public/api/obtDocumentGeneral',json,{headers:this.headers});
  }

  //Obtener categorias
  obtCategoriasDocumentos(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerCategorias');
  }

  //Guardar Categoria
  guardarCategoria(carrera):Observable<any>{
    let json = JSON.stringify(carrera);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/guardarCategoria",json,{headers:this.headers});
  }

  //Modificar Categoria
  modificarCategoria(carrera):Observable<any>{
    let json = JSON.stringify(carrera);
    return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/modificarCategoria",json,{headers:this.headers});
  }

  //Guardar Documento General
  guardarArchivo(formData:FormData){
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/guardarDocumentoGeneral", formData);
  }

  obtenerPortDocente(id_docente:Number):Observable<any>{
    let json = JSON.stringify({id_docente});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtPortIdDoc",json,{headers:this.headers});
  }

  obtenerDocumentoPersonal(id:Number):Observable<any>{
    let json = JSON.stringify({id});
    return this._http.post("/PortafolioDocente/src/app/server/public/api/obtenerDocumentoGeneral",json,{headers:this.headers});
  }


  //Guardar Documento Actividad Docente
  guardarDocumentoActividad(formData:FormData){
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/guardarDocumentoActividad", formData);
  }

  //Obtener documento de Actividades docente
  obtPortafolioPeriodo(id_docente:Number, id_periodo_academico){
    let json = JSON.stringify({id_docente, id_periodo_academico});
    return this._http.post('/PortafolioDocente/src/app/server/public/api/obtPortPeriodo',json,{headers:this.headers});
  }


  //Obtener documento de Actividades docente
  obtDocuAct(id_portafolio_docente:Number){
    let json = JSON.stringify({id_portafolio_docente});
    return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerDocumentoActividad',json,{headers:this.headers});
  }

  //Obtener Id de actividad docente
  obtenerIdActDocPort(id_actividad_docente:Number, id_portafolio_docente:Number){
    let json = JSON.stringify({id_actividad_docente, id_portafolio_docente});
    return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerIdPortActiv',json,{headers:this.headers});
  }

  //Obtener portafolios docentes
  obtenerPortafoliosDocentes(){
    return this._http.get('/PortafolioDocente/src/app/server/public/api/obtenerPortafolios');
  }

  validarDocumentoActividad(id_documento:Number, observacion:string){
    let json = JSON.stringify({id_documento, observacion});
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/validarDocumento",json,{headers:this.headers});
  }

  noValidarDocumentoActividad(id_documento:Number, observacion:string){
    let json = JSON.stringify({id_documento, observacion});
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/noValidarDocumento",json,{headers:this.headers});
  }

  validarDocumentoGeneral(id_documento:Number, observacion:string){
    let json = JSON.stringify({id_documento, observacion});
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/validarDocGeneral",json,{headers:this.headers});
  }

  noValidarDocGeneral(id_documento:Number, observacion:string){
    let json = JSON.stringify({id_documento, observacion});
    return this._http.post<any>("/PortafolioDocente/src/app/server/public/api/noValidarDocGeneral",json,{headers:this.headers});
  }



  obtenerPeriodoAcademico():Observable<any>{
    var f = new Date();
    //var dia = f.getDate()+1;
    var fecha = f.getFullYear() + "-" + (f.getMonth()+1)+"-"+f.getDate();
    let json = JSON.stringify({fecha});
    return this._http.post('/PortafolioDocente/src/app/server/public/api/obtenerPeriodoAcademicoActual',json, {headers:this.headers});
   }

   validarExistport(id_docente:Number, id_periodo_academico){
      let json = JSON.stringify({id_docente, id_periodo_academico});
      return this._http.post('/PortafolioDocente/src/app/server/public/api/validarExistPort',json,{headers:this.headers});
    }

    guardarCarrera(carrera):Observable<any>{
      let json = JSON.stringify(carrera);
      return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/guardarCarrera",json,{headers:this.headers});
    }

    modificarCarrera(carrera):Observable<any>{
      let json = JSON.stringify(carrera);
      return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/modificarCarrera",json,{headers:this.headers});
    }
    

    desactivarCarrera(periodoAcademico: PeriodoAcademico){    
      periodoAcademico.estado="Inactivo";
      let json = JSON.stringify(periodoAcademico);
      return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actDesacCarrera",json,{headers:this.headers});
    }

    activarCarrera(rol: Rol){    
      rol.estado="Activo";
      let json = JSON.stringify(rol);
      return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/actDesacCarrera",json,{headers:this.headers});
    }

    eliminarDocumento(documento){    
      let json = JSON.stringify(documento);
      return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/eliminarDocumento",json,{headers:this.headers});
    }

    eliminarDocumentoGeneral(documento){    
      let json = JSON.stringify(documento);
      return this._http.post<Verificador>("/PortafolioDocente/src/app/server/public/api/eliminarDocumentoGeneral",json,{headers:this.headers});
    }

}
