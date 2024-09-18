package com.zack.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.PerfilEspecialidade;
import com.zack.domain.model.PerfilTipoAbordagem;
import com.zack.domain.model.Usuario;
import com.zack.dto.PerfilDTO;
import com.zack.dto.PesquisaDTO;
import com.zack.repositories.PerfilEspecialidadeRepository;
import com.zack.repositories.PerfilRepository;
import com.zack.repositories.PerfilTipoAbordagemRepository;
import com.zack.service.PerfilService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PerfilServiceImpl implements PerfilService {
    
    @PersistenceContext
    private EntityManager entityManager;
    private final PerfilRepository perfilRepository;
    private final PerfilEspecialidadeRepository perfilEspecialidadeRepository;
    private final PerfilTipoAbordagemRepository perfilTipoAbordagemRepository;

    @Override
    public Perfil criarPerfil(Candidato candidato, Usuario usuario) {
        Perfil perfil = new Perfil();
        perfil.setNome(candidato.getNome().substring(0, candidato.getNome().indexOf(" ")));
        perfil.setCrp(candidato.getCrp());
        perfil.setUsuario(usuario);
        return perfilRepository.save(perfil);
    }

    @Override
    public Page<Perfil> getPerfis(String filtro, Pageable pageable) {
        return perfilRepository.findByAnyFieldContainingIgnoreCase(filtro, pageable);
    }
    
    @Override
    public Page<Perfil> getPerfisAll(String filtro, Pageable pageable) {
        return perfilRepository.findAllByAnyFieldContainingIgnoreCase(filtro, pageable);
    }

    @Override
    public Perfil salvarPerfil(PerfilDTO perfilDTO, String arquivoFoto) {
        Perfil perfil = this.getPerfil(perfilDTO.id().toString());
        perfil.setAtendeAdolescente(perfilDTO.atendeAdolescente());
        perfil.setAtendeAdulto(perfilDTO.atendeAdulto());
        perfil.setAtendeCrianca(perfilDTO.atendeCrianca());
        perfil.setAtendeIdoso(perfilDTO.atendeIdoso());
        perfil.setAtendeCasais(perfilDTO.atendeCasais());
        perfil.setCrp(perfilDTO.crp());
        perfil.setFormacaoECursos(perfilDTO.formacaoECursos());
        perfil.setCartao(perfilDTO.cartao());
        perfil.setPix(perfilDTO.pix());
        perfil.setPlano(perfilDTO.plano());
        perfil.setTransferencia(perfilDTO.transferencia());
        perfil.setNome(perfilDTO.nome());
        perfil.setSexo(perfilDTO.sexo());
        perfil.setSobreMim(perfilDTO.sobreMim());
        perfil.setSobrenome(perfilDTO.sobrenome());
        perfil.setTempoConsulta1(perfilDTO.tempoConsulta1());
        perfil.setTempoConsulta2(perfilDTO.tempoConsulta2());
        perfil.setValorConsulta(perfilDTO.valorConsulta());
        perfil.setNomeFoto(arquivoFoto);
        perfil.setLinkAtendimento(perfilDTO.linkAtendimentoOnline());
        perfil.setBreveDescricao(perfilDTO.breveDescricao());
        perfil.setAtendePlano(perfilDTO.atendePlano());
        perfil.setAtendeParticular(perfilDTO.atendeParticular());
        perfil.setAtendePresencial(perfilDTO.atendePresencial());
        perfil.setAtendeOnline(perfilDTO.atendeOnline());
        if(perfil.getDataIns() != null) {
            perfil.setDataAlt(new Date());
            perfil.setUsuarioAlt(perfilDTO.usuarioAlt());
        } else {
            perfil.setDataIns(new Date());
            perfil.setUsuarioIns(perfilDTO.usuarioAlt());
        }
        try {
            removerAssociacoes(perfil);
            perfil.setEspecialidades(perfilDTO.especialidades());
            perfil.setTiposAbordagem(perfilDTO.tiposAbordagem());
        } catch (Exception e) {
            e.getStackTrace();
            return new Perfil();
        }

        perfil = perfilRepository.saveAndFlush(perfil);
        return perfil;
    }

    private void removerAssociacoes(Perfil perfil) {
        List<PerfilTipoAbordagem> associacoesParaRemoverPT = perfilTipoAbordagemRepository.findAllByPerfil(perfil);
        if (!associacoesParaRemoverPT.isEmpty()) {
            perfil.setTiposAbordagem(null);
            perfilRepository.saveAndFlush(perfil);
        }
        List<PerfilEspecialidade> associacoesParaRemoverPE = perfilEspecialidadeRepository.findAllByPerfil(perfil);
        if (!associacoesParaRemoverPE.isEmpty()) {
            perfil.setEspecialidades(null);
            perfilRepository.saveAndFlush(perfil);
        }
    }

    @Override
    public Perfil getPerfil(String id) {
        Optional<Perfil> perfil = perfilRepository.findById(id);
        if (perfil.isPresent()) {
            return perfil.get();
        }
        return new Perfil();
    }

    @Override
    public Perfil getPerfilPorUsuario(Usuario usuario) {
        Optional<Perfil> perfil = perfilRepository.findByUsuario(usuario);
        if (perfil.isPresent()) {
            return perfil.get();
        } else {
            return new Perfil();
        }
    }

    @Override
    public List<Perfil> getTop3ProfilesWithHighestAverageRating() {
        Pageable topThree = PageRequest.of(0, 3);
        return perfilRepository.findTop3ByOrderByMediaAvaliacoesDesc(topThree);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Page<Perfil> getPerfisFiltroMelhorAvaliados(PesquisaDTO pesquisa, Pageable pageable) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT DISTINCT p.* FROM PERFIL p ");
        sqlBuilder.append("LEFT JOIN PERFIL_TIPO_ABORDAGEM pta ON p.ID = pta.PERFIL_ID ");
        sqlBuilder.append("LEFT JOIN TIPO_ABORDAGEM ta ON pta.TIPO_ABORDAGEM_ID = ta.ID ");
        sqlBuilder.append("LEFT JOIN USUARIO u ON u.ID_USUARIO = p.USUARIO_ID ");
        sqlBuilder.append("WHERE p.SOBRE_MIM IS NOT NULL AND p.FORMACAO_E_CURSOS IS NOT NULL AND u.ATIVO = 1");

        // Filtrar por nome
        if (pesquisa.nome() != null) {
            sqlBuilder.append(" AND (UPPER(p.NOME) LIKE :nome OR UPPER(p.SOBRENOME) LIKE :nome) ");
        }

        // Filtrar por tipo de atendimento (online ou presencial)
        if (pesquisa.isOnline().equalsIgnoreCase("1")) {
            sqlBuilder.append(" AND p.ATENDE_ONLINE = 1 ");
        } else if (pesquisa.isOnline().equalsIgnoreCase("2")) {
            sqlBuilder.append(" AND p.ATENDE_PRESENCIAL = 1 ");
        }

        // Filtrar por tipo de pagamento e atendimento particular
        if (!pesquisa.tipoAtendimento().equalsIgnoreCase("plano")) {
            if (pesquisa.tipoAtendimento().equalsIgnoreCase("particular")) {
                sqlBuilder.append(" AND p.ATENDE_PARTICULAR = 1 ");
            }
            if (pesquisa.formaPagamento().pix()) {
                sqlBuilder.append(" AND p.IS_PIX = 1 ");
            }
            if (pesquisa.formaPagamento().cartao()) {
                sqlBuilder.append(" AND p.IS_CARTAO = 1 ");
            }
            if (pesquisa.formaPagamento().transferencia()) {
                sqlBuilder.append(" AND p.IS_TRANSFERENCIA = 1 ");
            }

            // Filtrar por faixa de valor da consulta
            Integer valor1 = null;
            Integer valor2 = null;
            switch (pesquisa.valorConsulta()) {
                case "1": valor1 = 50; valor2 = 100; break;
                case "2": valor1 = 105; valor2 = 150; break;
                case "3": valor1 = 155; valor2 = 200; break;
                case "4": valor1 = 205; valor2 = 250; break;
                case "5": valor1 = 255; valor2 = 300; break;
                default: break;
            }

            if (valor1 != null && valor2 != null) {
                sqlBuilder.append(" AND p.VALOR_CONSULTA BETWEEN :valor1 AND :valor2 ");
            }
        } else {
            sqlBuilder.append(" AND p.ATENDE_PLANO = 1 ");
        }

        // Filtrar por categorias de atendimento (crianças, adultos, etc.)
        if (pesquisa.atendimento() != null) {
            if (pesquisa.atendimento().crianca()) {
                sqlBuilder.append(" AND p.ATENDE_CRIANCA = 1 ");
            }
            if (pesquisa.atendimento().adolescente()) {
                sqlBuilder.append(" AND p.ATENDE_ADOLESCENTE = 1 ");
            }
            if (pesquisa.atendimento().adultos()) {
                sqlBuilder.append(" AND p.ATENDE_ADULTO = 1 ");
            }
            if (pesquisa.atendimento().idosos()) {
                sqlBuilder.append(" AND p.ATENDE_IDOSO = 1 ");
            }
            if (pesquisa.atendimento().casal()) {
                sqlBuilder.append(" AND p.ATENDE_CASAIS = 1 ");
            }
        }

        // Filtrar por abordagens específicas
        if (pesquisa.abordagem() != null && !pesquisa.abordagem().isEmpty()) {
            sqlBuilder.append(" AND ta.ID IN (:abordagens) ");
        }

        // Ordenar por média de avaliações
        sqlBuilder.append(" ORDER BY p.MEDIA_AVALIACOES DESC ");

        // Criar a query nativa
        Query query = entityManager.createNativeQuery(sqlBuilder.toString(), Perfil.class);

        // Definir parâmetros
        if (pesquisa.nome() != null) {
            query.setParameter("nome", "%" + pesquisa.nome().toUpperCase() + "%");
        }
        
        if (pesquisa.abordagem() != null && !pesquisa.abordagem().isEmpty()) {
            query.setParameter("abordagens", pesquisa.abordagem().stream().map(a -> a.getId()).toList());
        }

        // Aplicar paginação
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        // Executar a consulta e obter os resultados
        List<Perfil> perfis = query.getResultList();

        // Obter o total de resultados sem a paginação
        Query countQuery = entityManager.createNativeQuery("SELECT COUNT(DISTINCT p.ID) FROM PERFIL p " +
                "LEFT JOIN USUARIO u ON u.ID_USUARIO = p.USUARIO_ID " +
                "WHERE p.SOBRE_MIM IS NOT NULL AND p.FORMACAO_E_CURSOS IS NOT NULL AND u.ATIVO = 1");
        Long total = ((Number) countQuery.getSingleResult()).longValue();

        // Retornar os resultados paginados
        return new PageImpl<>(perfis, pageable, total);
    }


}
