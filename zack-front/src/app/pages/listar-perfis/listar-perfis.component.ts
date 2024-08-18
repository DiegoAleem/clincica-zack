import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from '../../model/perfil.model';
import { PerfilService } from '../../services/perfil.service';
import { BtnVoltarMenuComponent } from '../../components/btn-voltar-menu/btn-voltar-menu.component';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-listar-perfis',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    BtnVoltarMenuComponent
  ],
  templateUrl: './listar-perfis.component.html',
  styleUrl: './listar-perfis.component.scss'
})
export class ListarPerfisComponent implements OnInit {

  perfis: Perfil[] = [];
  filtro: string = '';
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  paginas: number[] = [];
  campoOrdenado: string = '';
  ordem: string = 'ASC';
  carregando: boolean = false;

  constructor(private perfilService: PerfilService, private router: Router,private toastService: ToastrService, private jwtHelper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.carregando = true;
    this.getPerfis();
  }

  getPerfis(): void {
    this.carregando = true;
    this.perfilService.getAllPerfis(this.paginaAtual, this.filtro, this.campoOrdenado, this.ordem).subscribe(
      (objetos) => {
        this.perfis = objetos.content;
        this.totalPaginas = objetos.totalPages;
        this.carregando = false;
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
        
      },
      (error) => {
        this.carregando = false;
        console.error('Erro ao recuperar objetos:', error);
      }
    );
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

  filtrarPerfis(): void {
    this.paginaAtual = 1;
    this.getPerfis();
  }

  irParaPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.getPerfis();
  }

  ordenarPor(campo: string): void {
   
    this.campoOrdenado = campo;
    if(this.ordem == 'ASC') {
      this.ordem = 'DESC';
    } else {
      this.ordem = 'ASC';
    }
    this.getPerfis();
  }

  editar(id: number) {
    this.router.navigate(['editar-perfil/'+id]);
  }
  
  desativar(id: number){
    this.carregando = true;
    this.perfilService.desativarUsuario(id, this.getUserFromToken()).subscribe(
      (retorno) => {
        this.getPerfis();
        this.toastService.success("Usuário desativado com sucesso!", "Sucesso", {
          timeOut: 7000,
          closeButton: true 
        });
      },
      (error) => {
        this.getPerfis();
        this.carregando = false;
        this.toastService.error("Tente novamente mais tarde.", "Erro inesperado!", {
          timeOut: 7000,
          closeButton: true  
        });
      }
    );
  }

  ativar(id: number){
    this.carregando = true;
    this.perfilService.ativarUsuario(id, this.getUserFromToken()).subscribe(
      (retorno) => {
        this.getPerfis();
        this.toastService.success("Usuário ativado com sucesso!", "Sucesso", {
          timeOut: 7000,
          closeButton: true 
        });
      },
      (error) => {
        this.getPerfis();
        this.carregando = false;
        this.toastService.error("Tente novamente mais tarde.", "Erro inesperado!", {
          timeOut: 7000,
          closeButton: true  
        });
      }
    );
  }

}

