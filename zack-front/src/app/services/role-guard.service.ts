import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private jwtHelper: JwtHelperService;

  constructor(private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.getToken()) {
      if(this.getRoleFromToken() == '2'){
        return true;
      } else {
        this.router.navigate(['/menu-usuario']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role; // Supondo que a role esteja armazenada no payload do token como 'role'
    }
    return null;
  }
}