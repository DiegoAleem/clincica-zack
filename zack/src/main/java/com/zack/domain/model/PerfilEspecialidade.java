package com.zack.domain.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PERFIL_ESPECIALIDADE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PerfilEspecialidade {
    
    @EmbeddedId
    private PerfilEspecialidadeId id;
    
    @ManyToOne
    @JoinColumn(name = "PERFIL_ID", insertable = false, updatable = false)
    private Perfil perfil;
    
    @ManyToOne
    @JoinColumn(name = "ESPECIALIDADE_ID", insertable = false, updatable = false)
    private Especialidade especialidade;
    
}