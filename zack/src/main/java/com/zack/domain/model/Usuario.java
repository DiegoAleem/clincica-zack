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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USUARIO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long id;

    @Column(name = "NOME")
    private String nome;
    
    @Column(name = "EMAIL")
    private String email;

    @Column(name = "SENHA")
    private String senha;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "USUARIO_ROLE",
               joinColumns = @JoinColumn(name = "ID_USUARIO"),
               inverseJoinColumns = @JoinColumn(name = "ID_ROLE"))
    private List<Role> roles;
    
    @Column(name = "ATIVO")
    private boolean ativo;
    
}
