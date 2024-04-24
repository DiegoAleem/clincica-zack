import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Candidato } from '../../model/candidato.component';
import { CandidatoService } from '../../services/candidato.service';
import { TokenInterceptor } from '../../services/HttpInterceptor.service';

@Component({
  selector: 'app-listar-candidatos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  providers:[TokenInterceptor],
  templateUrl: './listar-candidatos.component.html',
  styleUrl: './listar-candidatos.component.scss'
})
export class ListarCandidatosComponent implements OnInit {

  candidatos: Candidato[] = [];

  constructor(private candidatoService: CandidatoService) { 
  }

  ngOnInit(): void {
    this.getAllObjetos();
  }

  getAllObjetos(): void {
    this.candidatoService.getAllCandidatos().subscribe({
      next: (objetos) => {
        console.log(objetos);
        this.candidatos = objetos;
        console.log(this.candidatos);
      },
      error: (error) => {
        console.error('Erro ao recuperar objetos:', error);
      }
    });
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
  }

