package com.zack.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.zack.domain.model.Candidato;
import com.zack.domain.model.Perfil;
import com.zack.domain.model.PerfilEspecialidade;
import com.zack.domain.model.PerfilTipoAbordagem;
import com.zack.domain.model.Usuario;
import com.zack.dto.PerfilDTO;
import com.zack.repositories.PerfilEspecialidadeRepository;
import com.zack.repositories.PerfilRepository;
import com.zack.repositories.PerfilTipoAbordagemRepository;
import com.zack.service.PerfilService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PerfilServiceImpl implements PerfilService {

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
    public Perfil salvarPerfil(PerfilDTO perfilDTO, String arquivoFoto) {
        Perfil perfil = this.getPerfil(perfilDTO.id().toString());
        perfil.setAtendeAdolescente(perfilDTO.atendeAdolescente());
        perfil.setAtendeAdulto(perfilDTO.atendeAdulto());
        perfil.setAtendeCrianca(perfilDTO.atendeCrianca());
        perfil.setAtendeIdoso(perfilDTO.atendeIdoso());
        perfil.setCrp(perfilDTO.crp());
        perfil.setFormacaoECursos(perfilDTO.formacaoECursos());
        perfil.setIsCartao(perfilDTO.isCartao());
        perfil.setIsPix(perfilDTO.isPix());
        perfil.setIsPlano(perfilDTO.isPlano());
        perfil.setIsTransferencia(perfilDTO.isTransferencia());
        perfil.setNome(perfilDTO.nome());
        perfil.setSexo(perfilDTO.sexo());
        perfil.setSobreMim(perfilDTO.sobreMim());
        perfil.setSobrenome(perfilDTO.sobrenome());
        perfil.setTempoConsulta1(perfilDTO.tempoConsulta1());
        perfil.setTempoConsulta2(perfilDTO.tempoConsulta2());
        perfil.setValorConsulta(perfilDTO.valorConsulta());
        perfil.setNomeFoto(arquivoFoto);
        perfil.setLinkAtendimento(perfilDTO.linkAtendimentoOnline());
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
        if(perfil.isPresent()) {
            return perfil.get();
        } else {
            return new Perfil();
        }
    }

}
