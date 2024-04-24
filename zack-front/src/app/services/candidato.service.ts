import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Candidato } from '../model/candidato.component';
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

  getCandidatos(pagina: number, filtro: string, campoOrdenado: string, ordemAscendente: string): Observable<any> {
    const params = new HttpParams()
    .set('pagina', pagina.toString())
    .set('filtro', filtro)
    .set('campoOrdenado', campoOrdenado)
    .set('ordem', ordemAscendente);

    return this.http.get<any[]>('http://localhost:8080/candidato/filtrados', {headers: this.getHeader(), params: params}).pipe(
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

  mudarStatus(id: number, status: string):  Observable<any> {

    return this.http.put<any>(`http://localhost:8080/candidato/editar/${id}/${status}`, null ,{headers:this.getHeader()}).pipe(
      catchError((error: any) => this.handleError(error)) 
    );
  }

  excluirCandidato(id: number):  Observable<any> {

    return this.http.delete<any>(`http://localhost:8080/candidato/excluir/${id}`, {headers:this.getHeader()}).pipe(
      catchError((error: any) => this.handleError(error)) 
    );
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
