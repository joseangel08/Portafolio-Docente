import { ActividadesDocentesDocenteComponent } from './components/componentes-perfil-docente/actividades-docentes-docente/actividades-docentes-docente.component';
import { DashboardComponent } from './components/componentes-perfil-docente/dashboard/dashboard.component';
import { AsignarActividadesDocentesComponent } from './components/componentes-perfil-gestor-academico/asignar-actividades-docentes/asignar-actividades-docentes.component';
import { AsignarRolesComponent } from './components/componentes-globales/asignar-roles/asignar-roles.component';
import { AdministrarActividadesDocentesComponent } from './components/componentes-perfil-gestor-academico/administrar-actividades-docentes/administrar-actividades-docentes.component';
import { AdministrarPeriodosAcademicosComponent } from './components/componentes-perfil-gestor-academico/administrar-periodos-academicos/administrar-periodos-academicos.component';
import { AdministrarDocentesComponent } from './components/componentes-perfil-gestor-academico/administrar-docentes/administrar-docentes.component';
import { AdministrarRolesSistemaComponent } from './components/componentes-perfil-administrador/administrar-roles-sistema/administrar-roles-sistema.component';
import { PerfilesComponent } from './components/componentes-globales/perfiles/perfiles.component';
import { DatosPersonalesComponent } from './components/componentes-globales/datos-personales/datos-personales.component';
import { AdministrarUsuariosSistemaComponent} from './components/componentes-perfil-administrador/administrar-usuarios-sistema/administrar-usuarios-sistema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PortafolioDocenteComponent } from './components/componentes-perfil-docente/portafolio-docente/portafolio-docente.component';
import { PruebasComponent } from './components/componentes-globales/pruebas/pruebas.component';
import { VisualizarDocumentoComponent } from './components/componentes-globales/visualizar-documento/visualizar-documento.component';
import { VisualizarPdfComponent } from './components/componentes-globales/componentes-dinamicos/visualizar-pdf/visualizar-pdf.component';
import { AdministrarPortafoliosDocentesComponent } from './components/componentes-perfil-gestor-academico/administrar-portafolios-docentes/administrar-portafolios-docentes.component';
import { AdministrarPortafolioComponent } from './components/componentes-perfil-gestor-academico/administrar-portafolio/administrar-portafolio.component';
import { ValidarDucumentoActividadComponent } from './components/componentes-perfil-gestor-academico/validar-ducumento-actividad/validar-ducumento-actividad.component';
import { ValidarDucumentoGeneralComponent } from './components/componentes-perfil-gestor-academico/validar-ducumento-general/validar-ducumento-general.component';
import { AdministrarCarrerasComponent} from './components/componentes-perfil-administrador/administrar-carreras/administrar-carreras.component'
import { AdministrarCategoriaDocumentoComponent } from './components/componentes-perfil-gestor-academico/administrar-categoria-documento/administrar-categoria-documento.component';
import { VisualizarPortafolioComponent } from './components/componentes-globales/visualizar-portafolio/visualizar-portafolio.component';

const routes: Routes = [
  {path:'', component: LoginComponent}, //Es la ruta con la que arranca la aplicacion
  {path:'datosPersonales',  component:DatosPersonalesComponent},
  {path:'perfil', component:PerfilesComponent},
  {path:'administrarUsuariosSistema', component:AdministrarUsuariosSistemaComponent},
  {path:'administrarRolesSistema', component:AdministrarRolesSistemaComponent},
  {path:'administrarDocentes', component:AdministrarDocentesComponent},
  {path:'administrarPeriodAcad', component:AdministrarPeriodosAcademicosComponent},
  {path:'administrarActDoc', component:AdministrarActividadesDocentesComponent},
  {path:'asignarActDoc', component:AsignarActividadesDocentesComponent},
  {path:'asignarRoles', component:AsignarRolesComponent},
  {path:'dashBoard', component:DashboardComponent},
  {path:'actDocDocente', component:ActividadesDocentesDocenteComponent},
  {path:'portDocente', component:PortafolioDocenteComponent},
  {path:'pruebas', component:PruebasComponent},
  {path:'pruebasPDF', component:VisualizarDocumentoComponent},
  {path:'visualizarPdf', component:VisualizarPdfComponent},
  {path:'adminPort', component:AdministrarPortafoliosDocentesComponent},
  {path:'adminPortDoc', component:AdministrarPortafolioComponent},
  {path:'validarDocActividad', component:ValidarDucumentoActividadComponent},
  {path:'validarDocGeneral', component:ValidarDucumentoGeneralComponent},
  {path:'administrarCarreras', component:AdministrarCarrerasComponent},
  {path:'administrarCatDoc', component:AdministrarCategoriaDocumentoComponent},
  {path:'visualizarPortafolios', component:VisualizarPortafolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
