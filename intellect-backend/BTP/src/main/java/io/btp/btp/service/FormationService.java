package io.btp.btp.service;

import io.btp.btp.domain.Formation;
import io.btp.btp.model.FormationDTO;
import io.btp.btp.repos.CartRepository;
import io.btp.btp.repos.FormationRepository;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class FormationService {

    private final FormationRepository formationRepository;
    private final CartRepository cartRepository;

    public FormationService(final FormationRepository formationRepository,
            final CartRepository cartRepository) {
        this.formationRepository = formationRepository;
        this.cartRepository = cartRepository;
    }

    public List<FormationDTO> findAll() {
        final List<Formation> formations = formationRepository.findAll(Sort.by("id"));
        return formations.stream()
                .map(formation -> mapToDTO(formation, new FormationDTO()))
                .toList();
    }

    public FormationDTO get(final Long id) {
        return formationRepository.findById(id)
                .map(formation -> mapToDTO(formation, new FormationDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final FormationDTO formationDTO) {
        final Formation formation = new Formation();
        mapToEntity(formationDTO, formation);
        return formationRepository.save(formation).getId();
    }

    public void update(final Long id, final FormationDTO formationDTO) {
        final Formation formation = formationRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(formationDTO, formation);
        formationRepository.save(formation);
    }

    public void delete(final Long id) {
        final Formation formation = formationRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        cartRepository.findAllByFormations(formation)
                .forEach(cart -> cart.getFormations().remove(formation));
        formationRepository.delete(formation);
    }

    private FormationDTO mapToDTO(final Formation formation, final FormationDTO formationDTO) {
        formationDTO.setId(formation.getId());
        formationDTO.setName(formation.getName());
        formationDTO.setPrice(formation.getPrice());
        formationDTO.setDescription(formation.getDescription());
        formationDTO.setPdfFile(formation.getPdfFile());
        return formationDTO;
    }

    private Formation mapToEntity(final FormationDTO formationDTO, final Formation formation) {
        formation.setName(formationDTO.getName());
        formation.setPrice(formationDTO.getPrice());
        formation.setDescription(formationDTO.getDescription());
        formation.setPdfFile(formationDTO.getPdfFile());
        return formation;
    }

}
