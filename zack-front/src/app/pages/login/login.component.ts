import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../shared/header/header.component';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    HeaderComponent,
  ],
  providers: [
    LoginService,
    JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService,
    private jwtHelper: JwtHelperService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => { 
        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(["menu-usuario"]);
       },
      error: () => { this.toastService.error("Erro inesperado! Tente novamente mais tarde") }
    })
  }

 /* getUserRole(): string | null {
    const token = sessionStorage.getItem('auth-token'); // Obtém o token JWT armazenado no localStorage
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role; // Extrai a role do payload do token
    }
    return null; // Retorna null se o token não estiver disponível
  }*/

  navigate() {
    this.router.navigate(["signup"])
  }
}
