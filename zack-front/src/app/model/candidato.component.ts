export interface Candidato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    crp: string;
    curriculo: File;
    curriculoNome: string;
    status: string;
    selecionado: boolean;
  }