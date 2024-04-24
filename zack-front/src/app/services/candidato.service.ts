import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenInterceptor } from './HttpInterceptor.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  apiUrl: string = "http://localhost:8080/auth"

  private tokenInterceptor: TokenInterceptor;
  constructor(private http: HttpClient) { 
    this.tokenInterceptor = new TokenInterceptor();
  }

  registrarCandidato(json: string, curriculo: File) {
    const formData = new FormData();
    formData.append('json', json);
    formData.append('curriculo', curriculo);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(this.apiUrl+'/register', formData, { headers });
  }

  getAllCandidatos(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8080/candidato/todos', {headers: this.getHeader()}).pipe(
      catchError((error: any) => this.handleError(error)) 
    );
  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = `http://localhost:8080/arquivo/download/${fileName}`;
    
    return this.http.get(url, {
      responseType: 'blob',
      headers: this.getHeader()
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro:', error);
    return throwError(error);
  }



  private getHeader(): any{
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
