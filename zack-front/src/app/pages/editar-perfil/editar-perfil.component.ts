import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Especialidade } from '../../model/especialidade.model';
import { TipoAbordagem } from '../../model/tipo-abordagem.model';
import { EspecialidadeService } from '../../services/especialidade.service';
import { PerfilService } from '../../services/perfil.service';
import { TipoAbordagemService } from '../../services/tipo-abordagem.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent implements OnInit {

  @ViewChild('perfilForm')
  perfilForm!: NgForm;

  variavel = "";
  tiposAbordagem: TipoAbordagem[] = [];
  especialidades: Especialidade[] = [];
  tiposAbordagemSelecionados: TipoAbordagem[] = [];
  especialidadeSelecionadas: Especialidade[] = [];
  selectedFile?: File;
  selectedFileDataUrl?: string | ArrayBuffer = undefined;

  perfil = {
    nome: null,
    sobrenome: null,
    crp: null,
    sexo: null,
    valorConsulta: null,
    isCartao: null,
    isPix: null,
    isTransferencia: null,
    isPlano: null,
    tempoConsulta1: null,
    tempoConsulta2: null,
    atendeCrianca: null,
    atendeAdolescente: null,
    atendeAdulto: null,
    atendeIdoso: null,
    tiposAbordagem: [] as TipoAbordagem[],
    especialidades: [] as Especialidade[],
    linkAtendimentoOnline: null,
    formacaoECursos: null,
    sobreMim: null
  };
  curriculo!: File;
  constructor(private fb: FormBuilder,
    private tipoAbordagemService: TipoAbordagemService,
    private especialidadeService: EspecialidadeService,
    private perfilService: PerfilService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.variavel = params['id'];
      this.buscarPerfil();     
    });


  }


  buscarPerfil() {
    this.perfilService.getPerfil(this.variavel).subscribe(
      (resposta) => {
        this.perfil = resposta.perfil;
        this.selectedFileDataUrl = `data:image/${resposta.foto.tipo};base64,${resposta.foto.fotoBase64}`;
        this.buscaTipoAbordagem();
        this.buscaEspecialidade();
      },
      (error) => {

      }
    );
  }

  removePhoto() {
    this.selectedFile = undefined;
    this.selectedFileDataUrl = undefined;
  }

  selectPhoto() {
    const photoInput = document.getElementById('photo');
    if (photoInput) {
      photoInput.click();
    } else {
    }
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileDataUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
    console.error('Elemento com ID "photo" não encontrado.');
  }

  buscaTipoAbordagem() {
    this.tipoAbordagemService.getAll().subscribe(
      (resposta) => {
        this.tiposAbordagem = resposta;
        this.perfil.tiposAbordagem.forEach(tipo => {
          this.tiposAbordagem.forEach(tipoAbordagem => {
            if ((tipoAbordagem as TipoAbordagem).id === (tipo as TipoAbordagem).id) {
              tipoAbordagem.selected = true;
            }
          });
        });
      },
      (error) => {

      }
    );
  }

  buscaEspecialidade() {
    this.especialidadeService.getAll().subscribe(
      (resposta) => {
        this.especialidades = resposta;
        this.perfil.especialidades.forEach(especialidadePerfil => {
          this.especialidades.forEach(especialidade => {
            if ((especialidade as Especialidade).id === (especialidadePerfil as Especialidade).id) {
              especialidade.selected = true;
            }
          });
        });
      },
      (error) => {

      }
    );
  }


  onCheckboxChangeTiposAbordagem(event: any, tipoAbordagem: TipoAbordagem) {
    
     if (tipoAbordagem.selected) {
        tipoAbordagem.selected = false;
      } else {
        tipoAbordagem.selected = true;
      }
  }

  onCheckboxChangeEspecialidade(event: any, especialidade: Especialidade) {
   
      if (especialidade.selected) {
        especialidade.selected = false;
      } else {
        especialidade.selected = true;
      }
  }

  onSubmit() {
 

    if (this.perfilForm.valid) {
      this.ajusteDeCheckOptions();
      const json = JSON.stringify(this.perfil);
      this.perfilService.salvarPerfil(json, this.selectedFile).subscribe(
        (retorno) => {

        },
        (error) => {

        }
      );

    }
  }

  ajusteDeCheckOptions() {
    this.perfil.especialidades = [];
    this.perfil.tiposAbordagem = [];
    this.especialidades.forEach( especialidade => {
      if(especialidade.selected){
        this.perfil.especialidades.push(especialidade);
      }
    });
  
    this.tiposAbordagem.forEach( tipoAbordagem => {
      if(tipoAbordagem.selected){
        this.perfil.tiposAbordagem.push(tipoAbordagem);
      }
    });
  }


}


