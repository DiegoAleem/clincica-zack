import { Role } from "./role.model";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    roles: Role[];
  }