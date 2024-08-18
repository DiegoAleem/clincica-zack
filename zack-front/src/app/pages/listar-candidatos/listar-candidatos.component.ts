import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BtnVoltarMenuComponent } from '../../components/btn-voltar-menu/btn-voltar-menu.component';
import { Candidato } from '../../model/candidato.model';
import { CandidatoService } from '../../services/candidato.service';
import { TokenInterceptor } from '../../services/HttpInterceptor.service';

@Component({
  selector: 'app-listar-candidatos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BtnVoltarMenuComponent
  ],
  providers: [TokenInterceptor],
  templateUrl: './listar-candidatos.component.html',
  styleUrl: './listar-candidatos.component.scss'
})
export class ListarCandidatosComponent implements OnInit {

  private jwtHelper: JwtHelperService;
  candidatos: Candidato[] = [];
  filtro: string = '';
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  paginas: number[] = [];
  campoOrdenado: string = '';
  ordem: string = 'ASC';
  carregando: boolean = false;

  constructor(private candidatoService: CandidatoService,  private toastService: ToastrService) {
    this.jwtHelper = new JwtHelperService();
  }

  ngOnInit(): void {
    this.getCandidatos();
  }

  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  getUserFromToken(): String | null {
    var token = this.getToken();
    if(token == null)
     token = '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken && decodedToken.sub) {
      return decodedToken.sub;
    }
    return null;
  }

  getCandidatos(): void {
    this.carregando = true;
    this.candidatoService.getCandidatos(this.paginaAtual, this.filtro, this.campoOrdenado, this.ordem).subscribe(
      (objetos) => {
        this.candidatos = objetos.content;
        this.totalPaginas = objetos.totalPages;
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
        this.carregando = false;
      },
      (error) => {
        console.error('Erro ao recuperar objetos:', error);
        this.carregando = false;
      }
    );
  }

  filtrarCandidatos(): void {
    this.paginaAtual = 1;
    this.getCandidatos();
  }

  irParaPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.getCandidatos();
  }

  ordenarPor(campo: string): void {
   
    this.campoOrdenado = campo;
    if(this.ordem == 'ASC') {
      this.ordem = 'DESC';
    } else {
      this.ordem = 'ASC';
    }
    console.log(this.ordem);
    this.getCandidatos();
  }

  downloadFile(nomeArquivo: string) {
    this.candidatoService.downloadFile(nomeArquivo).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nomeArquivo;
      link.click();
    });
  }

  mudarStatus(id: number, opcao: string){
    this.carregando = true;
    this.candidatoService.mudarStatus(id, opcao).subscribe(
      retorno => {
        this.getCandidatos();
        this.toastService.success("Ação: '"+opcao.toUpperCase()+"' feita com sucesso!", "Sucesso", {
          timeOut: 7000,
          closeButton: true 
        });
      },
      error => {
        this.carregando = false;
        this.toastService.error("Tente novamente mais tarde.", "Erro inesperado!", {
          timeOut: 7000, 
          closeButton: true 
        });
      }

    );
    
  }

  excluir(id: number){
    this.carregando = true;
    this.candidatoService.excluirCandidato(id).subscribe(
      retorno => {
        this.getCandidatos();
        this.toastService.success("Exclusão feita com sucesso!", "Sucesso", {
          timeOut: 7000,
          closeButton: true 
        });

      },
      error => {
        this.carregando = false;
        this.toastService.error("Tente novamente mais tarde.", "Erro inesperado!", {
          timeOut: 7000,
          closeButton: true  
        });
      }
    );
  }

}

