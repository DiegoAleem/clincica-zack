package com.zack.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "AVALIACAO")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_PERFIL", nullable = false)
    private Perfil perfil;

    @Column(name = "PONTUALIDADE")
    private Float pontualidade;

    @Column(name = "AMBIENTE")
    private Float ambiente;

    @Column(name = "QUALIDADE_AMBIENTE")
    private Float qualidadeAmbiente;

    @Column(name = "DESCRICAO", length = 2000)
    private String descricao;

}