import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/componentes-globales/navbar/navbar.component';
import { IngresoDatosUsuarioComponent } from './components/componentes-globales/ingreso-datos-usuario/ingreso-datos-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { AdministrarUsuariosSistemaComponent} from './components/componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component';
import { NavbartopComponent } from './components/componentes-globales/navbartop/navbartop.component';
import { PerfilesComponent } from './components/componentes-globales/perfiles/perfiles.component';
import { DatosPersonalesComponent } from './components/componentes-globales/datos-personales/datos-personales.component';
import { AdministrarRolesSistemaComponent} from './components/componentes-perfil-administrador/administrar-roles-sistema/administrar-roles-sistema.component';
import { ModalCrearRolComponent } from './components/componentes-globales/modals/modal-crear-rol/modal-crear-rol.component';
import { ModalVisualizarUsuariosComponent } from './components/componentes-globales/modals/modal-visualizar-usuarios/modal-visualizar-usuarios.component';
import { ModalModificarUsuariosComponent } from './components/componentes-globales/modals/modal-modificar-usuarios/modal-modificar-usuarios.component';
import { ModalCrearUsuarioComponent } from './components/componentes-globales/modals/modal-crear-usuario/modal-crear-usuario.component';
import { ModalVisualizarRolComponent } from './components/componentes-globales/modals/modal-visualizar-rol/modal-visualizar-rol.component';
import { ModalModificarRolComponent } from './components/componentes-globales/modals/modal-modificar-rol/modal-modificar-rol.component';
import { AdministrarDocentesComponent } from './components/componentes-perfil-gestor-academico/administrar-docentes/administrar-docentes.component';
import { AdministrarPeriodosAcademicosComponent } from './components/componentes-perfil-gestor-academico/administrar-periodos-academicos/administrar-periodos-academicos.component';
import { ModalCrearPeriodoAcademicoComponent } from './components/componentes-globales/modals/modal-crear-periodo-academico/modal-crear-periodo-academico.component';
import { ModalVisualizarPeriodoAcademicoComponent } from './components/componentes-globales/modals/modal-visualizar-periodo-academico/modal-visualizar-periodo-academico.component';
import { ModalModificarPeriodoAcademicoComponent } from './components/componentes-globales/modals/modal-modificar-periodo-academico/modal-modificar-periodo-academico.component';
import { AdministrarActividadesDocentesComponent } from './components/componentes-perfil-gestor-academico/administrar-actividades-docentes/administrar-actividades-docentes.component';
import { ModalCrearActividadDocenteComponent } from './components/componentes-globales/modals/modal-crear-actividad-docente/modal-crear-actividad-docente.component';
import { ModalModificarActividadDocenteComponent } from './components/componentes-globales/modals/modal-modificar-actividad-docente/modal-modificar-actividad-docente.component';
import { ModalVisualizarActividadDocenteComponent } from './components/componentes-globales/modals/modal-visualizar-actividad-docente/modal-visualizar-actividad-docente.component';
import { ModalAsignarActividadDocenteComponent } from './components/componentes-globales/modals/modal-asignar-actividad-docente/modal-asignar-actividad-docente.component';
import { BuscarRolPipe } from './components/componentes-globales/pipes/pipes/buscar-rol.pipe';
import { BuscarUsuarioPipe } from './components/componentes-globales/pipes/pipes/buscar-usuario.pipe';
import { BuscarPeriodoAcademicoPipe } from './components/componentes-globales/pipes/pipes/buscar-periodo-academico.pipe';
import { BuscarActividadDocentePipe } from './components/componentes-globales/pipes/pipes/buscar-actividad-docente.pipe';
import { ModalAsignarRolComponent } from './components/componentes-globales/modals/modal-asignar-rol/modal-asignar-rol.component';
import { AsignarRolesComponent } from './components/componentes-globales/asignar-roles/asignar-roles.component';
import { ModalVisualizarRolesUsuarioComponent } from './components/componentes-globales/modals/modal-visualizar-roles-usuario/modal-visualizar-roles-usuario.component';
import { ModalEliminarRolesUsuarioComponent } from './components/componentes-globales/modals/modal-eliminar-roles-usuario/modal-eliminar-roles-usuario.component';
import { AsignarActividadesDocentesComponent } from './components/componentes-perfil-gestor-academico/asignar-actividades-docentes/asignar-actividades-docentes.component';
import { ModalVisualizarActividadDocenteAsignadaComponent } from './components/componentes-globales/modals/modal-visualizar-actividad-docente-asignada/modal-visualizar-actividad-docente-asignada.component';
import { ModalEliminarUsuarioActividadDocenteComponent } from './components/componentes-globales/modals/modal-eliminar-usuario-actividad-docente/modal-eliminar-usuario-actividad-docente.component';
import { DashboardComponent } from './components/componentes-perfil-docente/dashboard/dashboard.component';
import { ActividadesDocentesDocenteComponent } from './components/componentes-perfil-docente/actividades-docentes-docente/actividades-docentes-docente.component';
import { ModalVisualizarActividadesAsignadasComponent } from './components/componentes-globales/modals/modal-visualizar-actividades-asignadas/modal-visualizar-actividades-asignadas.component';
import { ModalVisualizarHistorialRolesComponent } from './components/componentes-globales/modals/modal-visualizar-historial-roles/modal-visualizar-historial-roles.component';
import { ModalVisualizarHistorialActividadesAsignadasComponent } from './components/componentes-globales/modals/modal-visualizar-historial-actividades-asignadas/modal-visualizar-historial-actividades-asignadas.component';
import { ModalSeleccionarPeriodoAcademicoComponent } from './components/componentes-globales/modals/modal-seleccionar-periodo-academico/modal-seleccionar-periodo-academico.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PortafolioDocenteComponent } from './components/componentes-perfil-docente/portafolio-docente/portafolio-docente.component';
import { PruebasComponent } from './components/componentes-globales/pruebas/pruebas.component';
import { DynamicHostDirective } from './components/componentes-globales/directive/dynamic-host.directive';
import { VisualizarPdfComponent } from './components/componentes-globales/componentes-dinamicos/visualizar-pdf/visualizar-pdf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ModalModificarDocenteComponent } from './components/componentes-globales/modals/modal-modificar-docente/modal-modificar-docente.component';
import { ModalCargarDocumentoComponent } from './components/componentes-globales/modals/modal-cargar-documento/modal-cargar-documento.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ModalVisualizarDocumentoComponent } from './components/componentes-globales/modals/modal-visualizar-documento/modal-visualizar-documento.component';
import { VisualizarDocumentoComponent } from './components/componentes-globales/visualizar-documento/visualizar-documento.component';
import { ModalCargarDocumentoActividadComponent } from './components/componentes-globales/modals/modal-cargar-documento-actividad/modal-cargar-documento-actividad.component';
import { AdministrarPortafoliosDocentesComponent } from './components/componentes-perfil-gestor-academico/administrar-portafolios-docentes/administrar-portafolios-docentes.component';
import { BuscarPortafolioDocentePipePipe } from './components/componentes-globales/pipes/pipes/buscar-portafolio-docente-pipe.pipe';
import { AdministrarPortafolioComponent } from './components/componentes-perfil-gestor-academico/administrar-portafolio/administrar-portafolio.component';
import { ValidarDucumentoGeneralComponent } from './components/componentes-perfil-gestor-academico/validar-ducumento-general/validar-ducumento-general.component';
import { ValidarDucumentoActividadComponent } from './components/componentes-perfil-gestor-academico/validar-ducumento-actividad/validar-ducumento-actividad.component';
import { ModalValidarDocActComponent } from './components/componentes-globales/modals/modal-validar-doc-act/modal-validar-doc-act.component';
import { ModalNoValidarDocActComponent } from './components/componentes-globales/modals/modal-no-validar-doc-act/modal-no-validar-doc-act.component';
import { AdministrarCarrerasComponent } from './components/componentes-perfil-administrador/administrar-carreras/administrar-carreras.component';
import { BuscarCarreraPipe } from './components/componentes-globales/pipes/pipes/buscar-carrera.pipe';
import { ModalCrearCarreraComponent } from './components/componentes-globales/modals/modal-crear-carrera/modal-crear-carrera.component';
import { ModalModificarCarreraComponent } from './components/componentes-globales/modals/modal-modificar-carrera/modal-modificar-carrera.component';
import { ModalVisualizarCarreraComponent } from './components/componentes-globales/modals/modal-visualizar-carrera/modal-visualizar-carrera.component';
import { AdministrarCategoriaDocumentoComponent } from './components/componentes-perfil-gestor-academico/administrar-categoria-documento/administrar-categoria-documento.component';
import { ModalCrearCategoriaComponent } from './components/componentes-globales/modals/modal-crear-categoria/modal-crear-categoria.component';
import { ModalVisualizarCategoriaComponent } from './components/componentes-globales/modals/modal-visualizar-categoria/modal-visualizar-categoria.component';
import { ModalModificarCategoriaComponent } from './components/componentes-globales/modals/modal-modificar-categoria/modal-modificar-categoria.component';
import { ModalValidarDocComponent } from './components/componentes-globales/modals/modal-validar-doc/modal-validar-doc.component';
import { ModalNoValidarDocComponent } from './components/componentes-globales/modals/modal-no-validar-doc/modal-no-validar-doc.component';
import { VisualizarPortafolioComponent } from './components/componentes-globales/visualizar-portafolio/visualizar-portafolio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    IngresoDatosUsuarioComponent,
    AdministrarUsuariosSistemaComponent,
    NavbartopComponent,
    PerfilesComponent,
    DatosPersonalesComponent,
    AdministrarRolesSistemaComponent,
    ModalCrearRolComponent,
    ModalVisualizarUsuariosComponent,
    ModalModificarUsuariosComponent,
    ModalCrearUsuarioComponent,
    ModalVisualizarRolComponent,
    ModalModificarRolComponent,
    AdministrarDocentesComponent,
    AdministrarPeriodosAcademicosComponent,
    ModalCrearPeriodoAcademicoComponent,
    ModalVisualizarPeriodoAcademicoComponent,
    ModalModificarPeriodoAcademicoComponent,
    AdministrarActividadesDocentesComponent,
    ModalCrearActividadDocenteComponent,
    ModalModificarActividadDocenteComponent,
    ModalVisualizarActividadDocenteComponent,
    ModalAsignarActividadDocenteComponent,
    BuscarRolPipe,
    BuscarUsuarioPipe,
    BuscarPeriodoAcademicoPipe,
    BuscarActividadDocentePipe,
    ModalAsignarRolComponent,
    AsignarRolesComponent,
    ModalVisualizarRolesUsuarioComponent,
    ModalEliminarRolesUsuarioComponent,
    AsignarActividadesDocentesComponent,
    ModalVisualizarActividadDocenteAsignadaComponent,
    ModalEliminarUsuarioActividadDocenteComponent,
    DashboardComponent,
    ActividadesDocentesDocenteComponent,
    ModalVisualizarActividadesAsignadasComponent,
    ModalVisualizarHistorialRolesComponent,
    ModalVisualizarHistorialActividadesAsignadasComponent,
    ModalSeleccionarPeriodoAcademicoComponent,
    PortafolioDocenteComponent,
    PruebasComponent,
    DynamicHostDirective,
    VisualizarPdfComponent,
    ModalModificarDocenteComponent,
    ModalCargarDocumentoComponent,
    ModalVisualizarDocumentoComponent,
    VisualizarDocumentoComponent,
    ModalCargarDocumentoActividadComponent,
    AdministrarPortafoliosDocentesComponent,
    BuscarPortafolioDocentePipePipe,
    AdministrarPortafolioComponent,
    ValidarDucumentoGeneralComponent,
    ValidarDucumentoActividadComponent,
    ModalValidarDocActComponent,
    ModalNoValidarDocActComponent,
    AdministrarCarrerasComponent,
    BuscarCarreraPipe,
    ModalCrearCarreraComponent,
    ModalModificarCarreraComponent,
    ModalVisualizarCarreraComponent,
    AdministrarCategoriaDocumentoComponent,
    ModalCrearCategoriaComponent,
    ModalVisualizarCategoriaComponent,
    ModalModificarCategoriaComponent,
    ModalValidarDocComponent,
    ModalNoValidarDocComponent,
    VisualizarPortafolioComponent
  ],

  entryComponents:[
    VisualizarPdfComponent
  ],
  imports: [
    NgbModule,
    NgbAccordionModule,
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    PdfViewerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

