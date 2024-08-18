import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { BtnVoltarMenuComponent } from '../../components/btn-voltar-menu/btn-voltar-menu.component';
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
    NgMultiSelectDropDownModule,
    BtnVoltarMenuComponent
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent implements OnInit {

  @ViewChild('perfilForm')
  perfilForm!: NgForm;

  private jwtHelper: JwtHelperService;
  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettingsAbordagem: IDropdownSettings = {};  
  dropdownSettingsEspecialidades: IDropdownSettings = {};  
  variavel = "";
  tiposAbordagem: TipoAbordagem[] = [];
  especialidades: Especialidade[] = [];
  tiposAbordagemSelecionados: TipoAbordagem[] = [];
  especialidadeSelecionadas: Especialidade[] = [];
  selectedFile?: File;
  selectedFileDataUrl?: string | ArrayBuffer = undefined;
  carregando: boolean = false;
  usuarioAlt: any = '';

  perfil = {
    nome: null,
    sobrenome: null,
    crp: null,
    sexo: null,
    valorConsulta: null,
    cartao: null,
    pix: null,
    transferencia: null,
    plano: null,
    particular: null,
    tempoConsulta1: null,
    tempoConsulta2: null,
    atendeCrianca: null,
    atendeAdolescente: null,
    atendeAdulto: null,
    atendeIdoso: null,
    atendeCasais: null,
    tiposAbordagem: [] as TipoAbordagem[],
    especialidades: [] as Especialidade[],
    linkAtendimentoOnline: null,
    formacaoECursos: null,
    sobreMim: null,
    breveDescricao: null,
    atendePlano: null,
    atendeParticular: null,
    usuarioAlt: this.usuarioAlt

  };
  curriculo!: File;
  constructor(private fb: FormBuilder,
    private tipoAbordagemService: TipoAbordagemService,
    private especialidadeService: EspecialidadeService,
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private toastService: ToastrService) { 
      this.jwtHelper = new JwtHelperService();
    }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.variavel = params['id'];
      this.buscarPerfil();   
      this.configurarDropDownAbordagem();  
      this.configurarDropDownEspecialidades();  
      this.usuarioAlt = this.getUserFromToken();
      this.perfil.usuarioAlt = this.usuarioAlt;
    });

  }


  buscarPerfil() {
    this.carregando = true;
    this.perfilService.getPerfil(this.variavel).subscribe(
      (resposta) => {
       
        this.perfil = resposta.perfil;
        this.perfil.linkAtendimentoOnline = resposta.perfil.linkAtendimento;
        if (resposta.foto && resposta.foto.fotoBase64) {
          this.selectedFileDataUrl = `data:image/${resposta.foto.tipo};base64,${resposta.foto.fotoBase64}`;
          const blob = this.base64ToBlob(resposta.foto.fotoBase64, `image/${resposta.foto.tipo}`);
          this.selectedFile = new File([blob], resposta.foto.outrasInformacoes, { type: `image/${resposta.foto.tipo}` });
        } 
        this.buscaTipoAbordagem();
        this.buscaEspecialidade();
        this.carregando = false;
      },
      (error) => {
        this.carregando = false;
      }
    );
  }

  configurarDropDownAbordagem(){
    this.dropdownSettingsAbordagem = {
      singleSelection: false,
      idField: 'id',
      textField: 'tipo',
      selectAllText: 'Marcar Todos',
      unSelectAllText: 'Desmarcar Todos',
      itemsShowLimit: 10,
      searchPlaceholderText: 'Procurar:',
      noDataAvailablePlaceholderText: 'Não foi possível carregar os dados',
      allowSearchFilter: true
    };
  }

  configurarDropDownEspecialidades(){
    this.dropdownSettingsEspecialidades = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Marcar Todos',
      unSelectAllText: 'Desmarcar Todos',
      itemsShowLimit: 10,
      searchPlaceholderText: 'Procurar:',
      noDataAvailablePlaceholderText: 'Não foi possível carregar os dados',
      allowSearchFilter: true
    };
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
    this.carregando = true;
    if (this.perfilForm.valid && this.selectedFileDataUrl != undefined) {
      const json = JSON.stringify(this.perfil);
      this.perfilService.salvarPerfil(json, this.selectedFile).subscribe(
        (retorno) => {
          this.carregando = false;
          this.toastService.success("Perfil Alterado!", "Sucesso", {
            timeOut: 7000,
          });
        },
        (error) => {
          this.carregando = false;
          this.toastService.error("Não foi possível alterar o perfil! Entre em contato com o administrador.", "Erro!", {
            timeOut: 7000,
          });
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

  limparForm() {
    this.perfil = {
      nome: null,
      sobrenome: null,
      crp: null,
      sexo: null,
      valorConsulta: null,
      cartao: null,
      pix: null,
      transferencia: null,
      plano: null,
      particular: null,
      tempoConsulta1: null,
      tempoConsulta2: null,
      atendeCrianca: null,
      atendeAdolescente: null,
      atendeAdulto: null,
      atendeIdoso: null,
      atendeCasais: null,
      tiposAbordagem: [] as TipoAbordagem[],
      especialidades: [] as Especialidade[],
      linkAtendimentoOnline: null,
      formacaoECursos: null,
      sobreMim: null,
      breveDescricao: null,
      atendePlano: null,
      atendeParticular: null,
      usuarioAlt: this.usuarioAlt
    };
  
    // Limpar a seleção de foto
    this.selectedFile = undefined;
    this.selectedFileDataUrl = undefined;
  
    // Limpar as seleções de multiselect
    this.tiposAbordagem.forEach(tipo => tipo.selected = false);
    this.especialidades.forEach(especialidade => especialidade.selected = false);
  
    // Resetar o formulário
    if (this.perfilForm) {
      this.perfilForm.resetForm();
    }
  }


}

interface DropdownItem {
  item_id: number;
  item_text: string;
}


