import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtendimentoPsicologicoComponent } from './pages/atendimento-psicologico/atendimento-psicologico.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { ConsultoriaComponent } from './pages/consultoria/consultoria.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { ConvenioComponent } from './pages/convenio/convenio.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { ListarCandidatosComponent } from './pages/listar-candidatos/listar-candidatos.component';
import { ListarPerfisComponent } from './pages/listar-perfis/listar-perfis.component';
import { LoginComponent } from './pages/login/login.component';
import { OrientacaoProfissionalComponent } from './pages/orientacao-profissional/orientacao-profissional.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';
import { RecrutamentoSelecaoComponent } from './pages/recrutamento-selecao/recrutamento-selecao.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { SouPsicologoComponent } from './pages/sou-psicologo/sou-psicologo.component';
import { TermosUsoComponent } from './pages/termos-uso/termos-uso.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditarGuard } from './services/editar-guard.service';
import { RoleGuard } from './services/role-guard.service';
import { MapaComponent } from './shared/mapa/mapa.component';
import { MenuUsuarioComponent } from './shared/menu-usuario/menu-usuario.component';

export const routes: Routes = [
   {
      path: "login",
      component: LoginComponent
   },
   {
      path: "signup",
      component: SignUpComponent
   },
   {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
   },
   {
      path: 'home',
      component: HomeComponent
   },
   {
      path: 'como-funciona',
      component: ComoFuncionaComponent
   },
   {
      path: 'fale-conosco',
      component: ContatosComponent
   },
   {
      path: 'politica-privacidade',
      component: PoliticaPrivacidadeComponent
   },
   {
      path: 'termos-uso',
      component: TermosUsoComponent
   },
   {
      path: 'consultoria',
      component: ConsultoriaComponent
   },
   {
      path: 'atendimento-psicologico',
      component: AtendimentoPsicologicoComponent
   },
   {
      path: 'orientacao-profissional-e-vocacional',
      component: OrientacaoProfissionalComponent
   },
   {
      path: 'recrutamento-e-selecao',
      component: RecrutamentoSelecaoComponent
   },
   {
      path: 'convenio',
      component: ConvenioComponent
   },
   {
      path: 'sou-psicologo',
      component: SouPsicologoComponent
   },
   {
      path: "menu-usuario",
      component: MenuUsuarioComponent,
      canActivate: [AuthGuard]
   },
   {
      path: "listar-candidatos",
      component: ListarCandidatosComponent,
      canActivate: [RoleGuard]
   },
   {
      path: "listar-perfis-editar",
      component: ListarPerfisComponent,
      canActivate: [RoleGuard]
   },
   {
      path: "editar-perfil/:id",
      component: EditarPerfilComponent,
      canActivate: [EditarGuard]
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule]
})

export class AppRoutingModule {
}