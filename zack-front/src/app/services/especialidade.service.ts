import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  constructor(private http: HttpClient) {  }

  getAll(): Observable<any> {
    return this.http.get<any[]>('https://92.112.177.53:8080/especialidade/todos').pipe(
      catchError((error: any) => this.handleError(error)) 
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro:', error);
    return throwError(error);
  }
}
