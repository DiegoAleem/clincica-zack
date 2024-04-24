import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginComponent } from '../../pages/login/login.component';

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
export class MenuUsuarioComponent implements OnInit{
  
  role:any;

  constructor(
    private router: Router, private login: LoginComponent, private jwtHelper: JwtHelperService){
    }
  
  ngOnInit(): void {
    this.role = this.getUserRole();
  }

  getUserRole(): string | null {
    const token = sessionStorage.getItem('auth-token'); // Obtém o token JWT armazenado no localStorage
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role; // Extrai a role do payload do token
    }
    return null; // Retorna null se o token não estiver disponível
  }

  navigate(url: string){
    this.router.navigate([url])
  }
}
