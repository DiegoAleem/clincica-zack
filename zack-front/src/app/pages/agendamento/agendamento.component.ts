import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';
import { TipoAbordagem } from '../../model/tipo-abordagem.model';
import { PerfilService } from '../../services/perfil.service';
import { TipoAbordagemService } from '../../services/tipo-abordagem.service';
import { PerfilAgendamento } from './perfil.agendamento.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.scss'
})
export class AgendamentoComponent implements OnInit{

  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings: IDropdownSettings = {};  
  tiposAbordagem: TipoAbordagem[] = [];
  carregando: boolean = false;
  perfis: PerfilAgendamento[] = [];
  mostrarTodasEspecialidades: boolean = false;

  @ViewChild('pesquisaForm')
  pesquisaForm!: NgForm;
  pesquisa: any;
  isMobile: boolean = false;

  constructor( 
     private tipoAbordagemService: TipoAbordagemService,
     private perfilService: PerfilService,
     private breakpointObserver: BreakpointObserver,
     private router: Router){}

  ngOnInit() {
    this.instanciaPesquisa();
    this.onSubmit();
    this.configurarDropDown();
    this.buscaTipoAbordagem();
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.configureAcordeon();
      });
  }

  configureAcordeon(): void {
    const collapseElement = document.getElementById('collapseTwo');
    if (this.isMobile) {
      collapseElement?.classList.remove('show');
    } else {
      collapseElement?.classList.add('show');
    }
  }

  navigate(perfilSelecionado: PerfilAgendamento){
    this.router.navigate(["/perfil"], {state:{perfil:perfilSelecionado}}).then(() => {
      window.scrollTo(0, 0);
    });
  }

  whatsApp(link: string|undefined){
    window.open(link);
  }

  configurarDropDown(){
    this.dropdownSettings = {
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

  instanciaPesquisa(){
    this.pesquisa = {
      isOnline: 'null',
      nome: null,
      tipoAtendimento: 'null',
      formaPagamento: {
        pix: false,
        cartao: false,
        transferencia: false
      },
      atendimento: {
        crianca: false,
        adolescente: false,
        adultos:false,
        idosos:false,
        casal:false
      },
      valorConsulta: '6',
      abordagem: [],
      tamanhoPagina: 10
    }
  }

  mudaLocal(local: string){
    if(local == 'presencial') {
      this.pesquisa.isOnline = 0;
    } else if(local == 'online') {
      this.pesquisa.isOnline = 1;
    } else {
      this.pesquisa.isOnline = null;
    }
  }

  limparForm(){
    this.instanciaPesquisa();
    this.onSubmit();
  }

  onSubmit(){
    this.perfis = [];
    this.carregando = true;
    const genericImageUrl = '../../../assets/generico.png';
    const genericFile = new File([], 'generico.png', { type: 'image/png' });
    this.perfilService.getPerfilFiltroAvaliacao(this.pesquisa).subscribe(
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
        this.perfis.push(p);
       });
       this.carregando = false;
      },
      (error) =>{
        this.carregando = false;
      }
    );
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

  onCheckboxChangeFormaPagamento(event: any, value: string){
    if(value === 'pix'){
      this.pesquisa.formaPagamento.pix = !this.pesquisa.formaPagamento.pix;
    }
    if(value === 'transferencia'){
      this.pesquisa.formaPagamento.transferencia = !this.pesquisa.formaPagamento.transferencia;
    }
    if(value === 'cartao'){
      this.pesquisa.formaPagamento.cartao = !this.pesquisa.formaPagamento.cartao;
    }

  }

  onCheckboxChangeAtendimento(event: any, value: string){
    if(value === 'Criança'){
      this.pesquisa.atendimento.crianca = !this.pesquisa.atendimento.crianca;
    }
    if(value === 'Adolescentes (mais 14 anos)'){
      this.pesquisa.atendimento.adolescente = !this.pesquisa.atendimento.adolescente;
    }
    if(value === 'Adultos'){
      this.pesquisa.atendimento.adultos = !this.pesquisa.atendimento.adultos;
    }
    if(value === 'Idosos'){
      this.pesquisa.atendimento.idosos = !this.pesquisa.atendimento.idosos;
    }
    if(value === 'Casais'){
      this.pesquisa.atendimento.casal = !this.pesquisa.atendimento.casal;
    }
    
  }

  buscaTipoAbordagem() {
    this.tipoAbordagemService.getAll().subscribe(
      (resposta) => {
        this.tiposAbordagem = resposta;
        this.tiposAbordagem.forEach(
          (abordagem) => {
            var item: DropdownItem = {item_id: abordagem.id, item_text: abordagem.tipo};
            this.dropdownList.push(item);
          }
        );
      },
      (error) => {
      }
    );
  }

}

interface DropdownItem {
  item_id: number;
  item_text: string;
}