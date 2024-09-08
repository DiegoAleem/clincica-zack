import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Perfil } from '../../model/perfil.model';
import { PerfilAgendamento } from '../../pages/agendamento/perfil.agendamento.model';
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
export class ListaPsicologosComponent implements OnInit {
  @Output() dataLoaded = new EventEmitter<boolean>();

  perfis?: PerfilAgendamento[] = [];

  constructor(private perfilService: PerfilService, private router: Router) {
  }

  ngOnInit(): void {
    this.carregaPerfil();
  }

  navigate(perfilSelecionado: PerfilAgendamento){
    this.router.navigate(["/perfil"], {state:{perfil:perfilSelecionado}}).then(() => {
      window.scrollTo(0, 0);
    });
  }

  base64ToBlob(base64: string, mime: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  }

  carregaPerfil() {
    const genericImageUrl = '../../../assets/generico2.png';
    const genericFile = new File([], 'generico.png', { type: 'image/png' });
    this.perfilService.getMaisAvalidaosPerfil().subscribe(
      (resposta) => {
        resposta.forEach((perfil: any) => {
         // Verificação se fotoBase64 é nulo
         let selectedFileDataUrl: string;
         let selectedFile: File;
 
         if (perfil.foto && perfil.foto.fotoBase64) {
           selectedFileDataUrl = `data:image/${perfil.foto.tipo};base64,${perfil.foto.fotoBase64}`;
           selectedFile = new File(
             [this.base64ToBlob(perfil.foto.fotoBase64, `image/${perfil.foto.tipo}`)],
             perfil.foto.outrasInformacoes,
             { type: `image/${perfil.foto.tipo}` }
           );
         } else {
           selectedFileDataUrl = genericImageUrl;
           selectedFile = genericFile;
         }
         let p: PerfilAgendamento = {
           atendeAdolescente:  perfil.perfil.atendeAdolescente,
           atendeAdulto: perfil.perfil.atendeAdulto,
           atendeCasais: perfil.perfil.atendeCasais,
           atendeCrianca:  perfil.perfil.atendeCrianca,
           atendeIdoso:  perfil.perfil.atendeIdoso,
           atendeOnline:  perfil.perfil.atendeOnline,
           atendeParticular:  perfil.perfil.atendeParticular,
           atendePlano:  perfil.perfil.atendePlano,
           atendePresencial:  perfil.perfil.atendePresencial,
           breveDescricao:  perfil.perfil.breveDescricao,
           cartao: perfil.perfil.cartao,
           crp:  perfil.perfil.crp,
           especialidades:  perfil.perfil.especialidades,
           formacaoECursos:  perfil.perfil.formacaoECursos,
           id:  perfil.perfil.id,
           linkAtendimento:  perfil.perfil.linkAtendimento,
           mediaAvaliacoes:  perfil.perfil.mediaAvaliacoes,
           nome:  perfil.perfil.nome,
           nomeFoto:  perfil.perfil.nomeFoto,
           pix:  perfil.perfil.pix,
           plano: perfil.perfil.plano,
           sexo:  perfil.perfil.sexo,
           sobreMim:  perfil.perfil.sobreMim,
           sobrenome:  perfil.perfil.sobrenome,
           tempoConsulta1:  perfil.perfil.tempoConsulta1,
           tempoConsulta2:  perfil.perfil.tempoConsulta2,
           tiposAbordagem:  perfil.perfil.tiposAbordagem,
           transferencia:  perfil.perfil.transferencia,
           usuario:  perfil.perfil.usuario,
           valorConsulta:  perfil.perfil.valorConsulta,
           selectedFileDataUrl: selectedFileDataUrl,
           selectedFile: selectedFile,
           mostrarTodasEspecialidades: false
 
         };
         this.perfis?.push(p);
        });
        this.dataLoaded.emit(true);
    });

  }

}



