package io.btp.btp.service;

import io.btp.btp.domain.Privilege;
import io.btp.btp.model.PrivilegeDTO;
import io.btp.btp.repos.PrivilegeRepository;
import io.btp.btp.repos.RoleRepository;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class PrivilegeService {

    private final PrivilegeRepository privilegeRepository;
    private final RoleRepository roleRepository;

    public PrivilegeService(final PrivilegeRepository privilegeRepository,
            final RoleRepository roleRepository) {
        this.privilegeRepository = privilegeRepository;
        this.roleRepository = roleRepository;
    }

    public List<PrivilegeDTO> findAll() {
        final List<Privilege> privileges = privilegeRepository.findAll(Sort.by("id"));
        return privileges.stream()
                .map(privilege -> mapToDTO(privilege, new PrivilegeDTO()))
                .toList();
    }

    public PrivilegeDTO get(final Long id) {
        return privilegeRepository.findById(id)
                .map(privilege -> mapToDTO(privilege, new PrivilegeDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final PrivilegeDTO privilegeDTO) {
        final Privilege privilege = new Privilege();
        mapToEntity(privilegeDTO, privilege);
        return privilegeRepository.save(privilege).getId();
    }

    public void update(final Long id, final PrivilegeDTO privilegeDTO) {
        final Privilege privilege = privilegeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(privilegeDTO, privilege);
        privilegeRepository.save(privilege);
    }

    public void delete(final Long id) {
        final Privilege privilege = privilegeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        roleRepository.findAllByPrivileges(privilege)
                .forEach(role -> role.getPrivileges().remove(privilege));
        privilegeRepository.delete(privilege);
    }

    private PrivilegeDTO mapToDTO(final Privilege privilege, final PrivilegeDTO privilegeDTO) {
        privilegeDTO.setId(privilege.getId());
        privilegeDTO.setName(privilege.getName());
        privilegeDTO.setDescription(privilege.getDescription());
        return privilegeDTO;
    }

    private Privilege mapToEntity(final PrivilegeDTO privilegeDTO, final Privilege privilege) {
        privilege.setName(privilegeDTO.getName());
        privilege.setDescription(privilegeDTO.getDescription());
        return privilege;
    }

}
