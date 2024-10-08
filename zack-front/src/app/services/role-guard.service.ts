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
    
    const token = this.getToken();
    if (token) {
      const roles = this.getRolesFromToken(token);
      if (roles && roles.includes(2)) {
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

  getRolesFromToken(token: string): number[] | null {
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken && decodedToken.roles) {
      return decodedToken.roles;
    }
    return null;
  }
}