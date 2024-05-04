import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginComponent } from '../../pages/login/login.component';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule],
  providers: [
    LoginComponent,
    JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.scss'
})
export class MenuUsuarioComponent implements OnInit {

  roles: any[] = [];
  id: any;

  constructor(
    private router: Router, private login: LoginComponent, private jwtHelper: JwtHelperService, private perfilService: PerfilService) {
  }

  ngOnInit(): void {
    this.roles = this.getUserRole();
    this.perfilService.getPerfilPorUsuario(this.getUserId()).subscribe(
      (retorno) => {
        this.id = retorno;
      },
      (erro) => {

      }
    );

  }

  getUserRole(): any[] {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.roles;
    }
    this.router.navigate(["/login"]);
    return [];
  }


  getUserId(): any {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if(decodedToken.userId != undefined) {
       return decodedToken.userId;
      } else {
        this.router.navigate(["/login"]);
      }
    }
    this.router.navigate(["/login"]);
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
