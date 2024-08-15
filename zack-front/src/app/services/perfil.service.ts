import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenInterceptor } from './HttpInterceptor.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {


  apiUrl: string = "http://92.112.177.53:8080/auth"

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

    return this.http.post<any>(this.apiUrl + '/register', formData, { headers });
  }

  getPerfil(id: string): Observable<any> {
    return this.http.get<any>(`http://92.112.177.53:8080/perfil/${id}`, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  getPerfilFiltroAvaliacao(filtro: any): Observable<any> {
    const filtroString = JSON.stringify(filtro);
    const params = new HttpParams().set('filtro', filtroString);

    return this.http.get<any>(
        'http://92.112.177.53:8080/perfil/filtrados-melhor-avaliados', 
        { headers: this.getHeader(), params: params }
    ).pipe(
        catchError((error: any) => this.handleError(error))
    );
  }

  getMaisAvalidaosPerfil() {
    return this.http.get<any>(`http://92.112.177.53:8080/perfil/top-rated`, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  getPerfilPorUsuario(id: string): Observable<any> {
    return this.http.get<any>(`http://92.112.177.53:8080/perfil/buscarPorUsuario/${id}`, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  getPerfis(pagina: number, filtro: string, campoOrdenado: string, ordemAscendente: string): Observable<any> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('filtro', filtro)
      .set('campoOrdenado', campoOrdenado)
      .set('ordem', ordemAscendente);

    return this.http.get<any[]>('http://92.112.177.53:8080/perfil/filtrados', { headers: this.getHeader(), params: params }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  getAllPerfis(pagina: number, filtro: string, campoOrdenado: string, ordemAscendente: string): Observable<any> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('filtro', filtro)
      .set('campoOrdenado', campoOrdenado)
      .set('ordem', ordemAscendente);

    return this.http.get<any[]>('http://92.112.177.53:8080/perfil/all-filtrados', { headers: this.getHeader(), params: params }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  salvarPerfil(json: string, foto: File | undefined) {
    const formData = new FormData();
    formData.append('json', json);
    if (foto != undefined) {
      formData.append('foto', foto);
    } else {
      formData.append('foto', "");
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put<any>(`http://92.112.177.53:8080/perfil/editar`, formData, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = `http://92.112.177.53:8080/arquivo/download/${fileName}`;

    return this.http.get(url, {
      responseType: 'blob',
      headers: this.getHeader()
    });
  }

  mudarStatus(id: number, status: string): Observable<any> {

    return this.http.put<any>(`http://92.112.177.53:8080/candidato/editar/${id}/${status}`, null, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  desativarUsuario(id: number): Observable<any> {

    return this.http.put<any>(`http://92.112.177.53:8080/usuario/desativar/${id}`, null, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  ativarUsuario(id: number): Observable<any> {

    return this.http.put<any>(`http://92.112.177.53:8080/usuario/ativar/${id}`, null, { headers: this.getHeader() }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro:', error);
    return throwError(error);
  }



  private getHeader(): any {
    const token = sessionStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
