import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { HomeComponent } from './pages/home/home.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';
import { TermosUsoComponent } from './pages/termos-uso/termos-uso.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SubHeaderComponent } from './shared/sub-header/sub-header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ComoFuncionaComponent,
    ContatosComponent,
    SubHeaderComponent,
    PoliticaPrivacidadeComponent,
    TermosUsoComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'login-page';
}
