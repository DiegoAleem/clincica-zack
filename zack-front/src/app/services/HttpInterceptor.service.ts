import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtém o token do armazenamento local (ou de onde quer que você o tenha)
    const authToken = sessionStorage.getItem('auth-token');

    // Clona a solicitação e adiciona o cabeçalho de autorização com o token
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Passa a solicitação clonada para o próximo manipulador na cadeia de interceptadores
    return next.handle(request);
  }
}