import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Perfil } from '../../model/perfil.model';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-lista-psicologos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule],
  templateUrl: './lista-psicologos.component.html',
  styleUrl: './lista-psicologos.component.scss'
})
export class ListaPsicologosComponent implements OnInit{

  perfis?: Perfil[] = [];
  
  constructor(private perfilService: PerfilService){
  }

  ngOnInit(): void {
    this.carregaPerfil();
  }

  carregaPerfil() {
    this.perfilService.getMaisAvalidaosPerfil().subscribe((data: any[]) => {
      data.forEach(resposta => {
        console.log(resposta.foto);
        let perfil : Perfil = resposta.perfil;
        perfil.selectedFileDataUrl = `data:image/${resposta.foto?.tipo};base64,${resposta.foto?.fotoBase64}`;
        this.perfis?.push(perfil);
      });
    
    });
    
  }

}



