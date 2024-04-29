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

@Entity
@Table(name = "PERFIL")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Perfil {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    
    @Column(name = "NOME", length = 100)
    private String nome;
    
    @Column(name = "SOBRENOME", length = 100)
    private String sobrenome;
    
    @Column(name = "CRP", length = 20)
    private String crp;
    
    @Column(name = "SEXO", length = 1)
    private String sexo;
    
    @Column(name = "VALOR_CONSULTA")
    private Float valorConsulta;
    
    @Column(name = "IS_CARTAO", length = 1)
    private String isCartao;
    
    @Column(name = "IS_PIX", length = 1)
    private String isPix;
    
    @Column(name = "IS_TRANSFERENCIA", length = 1)
    private String isTransferencia;
    
    @Column(name = "IS_PLANO", length = 1)
    private String isPlano;
    
    @Column(name = "TEMPO_CONSULTA_1")
    private Integer tempoConsulta1;
    
    @Column(name = "TEMPO_CONSULTA_2")
    private Integer tempoConsulta2;
    
    @Column(name = "ATENDE_CRIANCA", length = 1)
    private String atendeCrianca;
    
    @Column(name = "ATENDE_ADOLESCENTE", length = 1)
    private String atendeAdolescente;
    
    @Column(name = "ATENDE_ADULTO", length = 1)
    private String atendeAdulto;
    
    @Column(name = "ATENDE_IDOSO", length = 1)
    private String atendeIdoso;
    
    @Column(name = "FORMACAO_E_CURSOS", length = 2000)
    private String formacaoECursos;
    
    @Column(name = "SOBRE_MIM", length = 2000)
    private String sobreMim;
    
    @ManyToOne
    @JoinColumn(name = "USUARIO_ID", referencedColumnName = "ID_USUARIO")
    private Usuario usuario;
}
