import { Usuario } from "./usuario.model";

export interface Perfil {
    id: number;
    nome: string;
    sobrenome: string;
    crp: string;
    sexo: string;
    valorConsulta: number;
    isCartao: boolean;
    isPix: boolean;
    isTransferencia: boolean;
    isPlano: boolean;
    tempoConsulta1: number;
    tempoConsulta2: number;
    atendeCrianca: boolean;
    atendeAdolescente: boolean;
    atendeAdulto: boolean;
    atendeIdoso: boolean;
    formacaoCurso: string;
    sobreMim: string;
    breveDescricao: string;
    usuario: Usuario;
    selectedFileDataUrl?: string | ArrayBuffer;
  }
