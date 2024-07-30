import { Especialidade } from "../../model/especialidade.model";
import { TipoAbordagem } from "../../model/tipo-abordagem.model";
import { Usuario } from "../../model/usuario.model";

export interface PerfilAgendamento {
    atendeAdolescente?: boolean,
    atendeAdulto?: boolean,
    atendeCasais?: boolean,
    atendeCrianca?: boolean,
    atendeIdoso?: boolean,
    atendeOnline?: boolean
    atendeParticular?: boolean,
    atendePlano?: boolean, 
    atendePresencial?: boolean,
    breveDescricao?: string,
    cartao?:boolean,
    crp?: string,
    especialidades?: Especialidade[],
    formacaoECursos?: string,
    id?: number,
    linkAtendimento?: string,
    mediaAvaliacoes?: number,
    nome?: string,
    nomeFoto?: string,
    pix?:boolean,
    plano?:boolean,
    sexo?: string,
    sobreMim?: string,
    sobrenome?: string,
    tempoConsulta1?:string,
    tempoConsulta2?:string,
    tiposAbordagem?: TipoAbordagem[],
    transferencia?:boolean,
    usuario?: Usuario,
    valorConsulta?: number,
    selectedFileDataUrl?: string | ArrayBuffer,
    blob?: Blob,
    selectedFile?: File,
    mostrarTodasEspecialidades: boolean;

  }
