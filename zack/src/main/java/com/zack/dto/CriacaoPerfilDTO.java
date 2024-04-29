package com.zack.dto;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Usuario;
import com.zack.domain.model.Perfil;

public record CriacaoPerfilDTO(Perfil perfil, Usuario usuario, Candidato candidato ) {

}
