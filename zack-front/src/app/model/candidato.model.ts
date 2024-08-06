export interface Candidato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    crp: string;
    curriculo: File;
    curriculoNome: string;
    historicoNome: string;
    status: string;
    selecionado: boolean;
  }