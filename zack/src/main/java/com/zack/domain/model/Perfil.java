package com.zack.domain.model;

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
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PERFIL")
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
    private String tempoConsulta1;
    
    @Column(name = "TEMPO_CONSULTA_2")
    private String tempoConsulta2;
    
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getCrp() {
        return crp;
    }

    public void setCrp(String crp) {
        this.crp = crp;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Float getValorConsulta() {
        return valorConsulta;
    }

    public void setValorConsulta(Float valorConsulta) {
        this.valorConsulta = valorConsulta;
    }

    public Boolean getIsCartao() {
        return converteCharParaBoolean(isCartao);
    }

    public void setIsCartao(Boolean isCartao) {
        this.isCartao = converteBooleanParaChar(isCartao);
    }

    public Boolean getIsPix() {
        return converteCharParaBoolean(isPix);
    }

    public void setIsPix(Boolean isPix) {
        this.isPix = converteBooleanParaChar(isPix);
    }

    public Boolean getIsTransferencia() {
        return converteCharParaBoolean(isTransferencia);
    }

    public void setIsTransferencia(Boolean isTransferencia) {
        this.isTransferencia = converteBooleanParaChar(isTransferencia);
    }

    public Boolean getIsPlano() {
        return converteCharParaBoolean(isPlano);
    }

    public void setIsPlano(Boolean isPlano) {
        this.isPlano = converteBooleanParaChar(isPlano);
    }

    public String getTempoConsulta1() {
        return tempoConsulta1;
    }

    public void setTempoConsulta1(String tempoConsulta1) {
        this.tempoConsulta1 = tempoConsulta1;
    }

    public String getTempoConsulta2() {
        return tempoConsulta2;
    }

    public void setTempoConsulta2(String tempoConsulta2) {
        this.tempoConsulta2 = tempoConsulta2;
    }

    public Boolean getAtendeCrianca() {
        return converteCharParaBoolean(atendeCrianca);
    }

    public void setAtendeCrianca(Boolean atendeCrianca) {
        this.atendeCrianca = converteBooleanParaChar(atendeCrianca);
    }

    public Boolean getAtendeAdolescente() {
        return converteCharParaBoolean(atendeAdolescente);
    }

    public void setAtendeAdolescente(Boolean atendeAdolescente) {
        this.atendeAdolescente = converteBooleanParaChar(atendeAdolescente);
    }

    public Boolean getAtendeAdulto() {
        return converteCharParaBoolean(atendeAdulto);
    }

    public void setAtendeAdulto(Boolean atendeAdulto) {
        this.atendeAdulto = converteBooleanParaChar(atendeAdulto);
    }

    public Boolean getAtendeIdoso() {
        return converteCharParaBoolean(atendeIdoso);
    }

    public void setAtendeIdoso(Boolean atendeIdoso) {
        this.atendeIdoso =  converteBooleanParaChar(atendeIdoso);
    }

    public String getFormacaoECursos() {
        return formacaoECursos;
    }

    public void setFormacaoECursos(String formacaoECursos) {
        this.formacaoECursos = formacaoECursos;
    }

    public String getSobreMim() {
        return sobreMim;
    }

    public void setSobreMim(String sobreMim) {
        this.sobreMim = sobreMim;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Especialidade> getEspecialidades() {
        return especialidades;
    }

    public void setEspecialidades(List<Especialidade> especialidades) {
        this.especialidades = especialidades;
    }

    public List<TipoAbordagem> getTiposAbordagem() {
        return tiposAbordagem;
    }

    public void setTiposAbordagem(List<TipoAbordagem> tiposAbordagem) {
        this.tiposAbordagem = tiposAbordagem;
    }
    
    private String converteBooleanParaChar(Boolean opcao) {
        if(Boolean.TRUE.equals(opcao)) {
            return "S";
        } else {
            return "N";
        }
    }
    
    private Boolean converteCharParaBoolean(String opcao) {
      return "S".equals(opcao);
    }

    public String getNomeFoto() {
        return nomeFoto;
    }

    public void setNomeFoto(String nomeFoto) {
        this.nomeFoto = nomeFoto;
    }

    public String getLinkAtendimento() {
        return linkAtendimento;
    }

    public void setLinkAtendimento(String linkAtendimento) {
        this.linkAtendimento = linkAtendimento;
    }
    
    
}
