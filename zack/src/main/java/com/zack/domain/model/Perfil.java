package com.zack.domain.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PERFIL")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    
    @Column(name = "IS_CARTAO", columnDefinition = "CHAR(1)")
    private boolean isCartao;
    
    @Column(name = "IS_PIX", columnDefinition = "CHAR(1)")
    private boolean isPix;
    
    @Column(name = "IS_TRANSFERENCIA", columnDefinition = "CHAR(1)")
    private boolean isTransferencia;
    
    @Column(name = "IS_PLANO", columnDefinition = "CHAR(1)")
    private boolean isPlano;
    
    @Column(name = "TEMPO_CONSULTA_1")
    private String tempoConsulta1;
    
    @Column(name = "TEMPO_CONSULTA_2")
    private String tempoConsulta2;
    
    @Column(name = "ATENDE_CRIANCA", columnDefinition = "CHAR(1)")
    private boolean atendeCrianca;
    
    @Column(name = "ATENDE_ADOLESCENTE", columnDefinition = "CHAR(1)")
    private boolean atendeAdolescente;
    
    @Column(name = "ATENDE_ADULTO", columnDefinition = "CHAR(1)")
    private boolean atendeAdulto;
    
    @Column(name = "ATENDE_IDOSO", columnDefinition = "CHAR(1)")
    private boolean atendeIdoso;
    
    @Column(name = "ATENDE_CASAIS", columnDefinition = "CHAR(1)")
    private boolean atendeCasais;

    @Column(name = "ATENDE_ONLINE", columnDefinition = "CHAR(1)")
    private boolean atendeOnline;

    @Column(name = "ATENDE_PRESENCIAL", columnDefinition = "CHAR(1)")
    private boolean atendePresencial;
    
    @Column(name = "ATENDE_PARTICULAR", columnDefinition = "CHAR(1)")
    private boolean atendeParticular;

    @Column(name = "ATENDE_PLANO", columnDefinition = "CHAR(1)")
    private boolean atendePlano;
    
    @Column(name = "FORMACAO_E_CURSOS", length = 2000)
    private String formacaoECursos;
    
    @Column(name = "SOBRE_MIM", length = 2000)
    private String sobreMim;
    
    @Column(name = "NOME_FOTO")
    private String nomeFoto;
    
    @Column(name = "LINK_ATENDIMENTO")
    private String linkAtendimento;
    
    @ManyToOne
    @JoinColumn(name = "USUARIO_ID", referencedColumnName = "ID_USUARIO")
    private Usuario usuario;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "PERFIL_ESPECIALIDADE",
            joinColumns = @JoinColumn(name = "PERFIL_ID"),
            inverseJoinColumns = @JoinColumn(name = "ESPECIALIDADE_ID"))
    private List<Especialidade> especialidades;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "PERFIL_TIPO_ABORDAGEM",
            joinColumns = @JoinColumn(name = "PERFIL_ID"),
            inverseJoinColumns = @JoinColumn(name = "TIPO_ABORDAGEM_ID"))
    private List<TipoAbordagem> tiposAbordagem;
    
    @Column(name = "MEDIA_AVALIACOES")
    private Float mediaAvaliacoes;
    
    @Column(name = "BREVE_DESCRICAO")
    private String breveDescricao;
    
    @Column(name = "USUARIO_INS", length = 255)
    private String usuarioIns;

    @Column(name = "USUARIO_ALT", length = 255)
    private String usuarioAlt;

    @Column(name = "DATA_INS")
    private Date dataIns;

    @Column(name = "DATA_ALT")
    private Date dataAlt;

}
