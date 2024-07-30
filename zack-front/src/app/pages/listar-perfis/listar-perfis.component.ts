import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from '../../model/perfil.model';
import { PerfilService } from '../../services/perfil.service';
import { BtnVoltarMenuComponent } from '../../components/btn-voltar-menu/btn-voltar-menu.component';
import { Router } from '@angular/router';

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

  constructor(private perfilService: PerfilService, private router: Router,private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.carregando = true;
    this.getPerfis();
  }

  getPerfis(): void {
    this.carregando = true;
    this.perfilService.getPerfis(this.paginaAtual, this.filtro, this.campoOrdenado, this.ordem).subscribe(
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

  filtrarPerfis(): void {
    this.paginaAtual = 1; // Resetar para a primeira página ao filtrar
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
    console.log(this.ordem);
    this.getPerfis();
  }

  editar(id: number) {
    this.router.navigate(['editar-perfil/'+id]);
  }
  
  desativar(id: number){
    this.carregando = true;
    this.perfilService.desativarUsuario(id).subscribe(
      retorno => {
        this.getPerfis();
        this.toastService.success("Usuário desativado com sucesso!", "Sucesso", {
          timeOut: 7000,
          closeButton: true 
        });

      },
      error => {
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

