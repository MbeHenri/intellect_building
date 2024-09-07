package io.btp.btp.service;

import io.btp.btp.domain.Privilege;
import io.btp.btp.domain.Role;
import io.btp.btp.domain.User;
import io.btp.btp.model.input.RoleDTO;
import io.btp.btp.repos.PrivilegeRepository;
import io.btp.btp.repos.RoleRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;
    private final UserRepository userRepository;

    public RoleService(final RoleRepository roleRepository,
            final PrivilegeRepository privilegeRepository, final UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.privilegeRepository = privilegeRepository;
        this.userRepository = userRepository;
    }

    public List<RoleDTO> findAll() {
        final List<Role> roles = roleRepository.findAll(Sort.by("id"));
        return roles.stream()
                .map(role -> mapToDTO(role, new RoleDTO()))
                .toList();
    }

    public RoleDTO get(final Long id) {
        return roleRepository.findById(id)
                .map(role -> mapToDTO(role, new RoleDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final RoleDTO roleDTO) {
        final Role role = new Role();
        mapToEntity(roleDTO, role);
        return roleRepository.save(role).getId();
    }

    public void update(final Long id, final RoleDTO roleDTO) {
        final Role role = roleRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(roleDTO, role);
        roleRepository.save(role);
    }

    public void delete(final Long id) {
        roleRepository.deleteById(id);
    }

    public long count() {
    	return roleRepository.count();
    }

    public RoleDTO findByName(String name){
        Role role = roleRepository.findByName(name).orElseThrow(NotFoundException::new);
    	return mapToDTO(role, new RoleDTO());
    }
    
    public void addPrivilegeToRole(long roleId,  long privilegeId) {
    
    	Privilege privilege =  privilegeRepository
    			.findById(privilegeId)
    			.orElseThrow(() -> new NotFoundException("Not found privilege with id = " + privilegeId));
    	
    	Role role  = roleRepository
    			.findById(roleId)
                .orElseThrow(() -> new NotFoundException("Not found role with id = " + roleId));
    
    	privilege.getRoles().add(role);
    	role.getPrivileges().add(privilege);
    }

    private RoleDTO mapToDTO(final Role role, final RoleDTO roleDTO) {
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        roleDTO.setDescription(role.getDescription());
        roleDTO.setPrivileges(role.getPrivileges().stream()
                .map(privilege -> privilege.getId())
                .toList());
        return roleDTO;
    }

    private Role mapToEntity(final RoleDTO roleDTO, final Role role) {
        role.setName(roleDTO.getName());
        role.setDescription(roleDTO.getDescription());
        final List<Privilege> privileges = privilegeRepository.findAllById(
                roleDTO.getPrivileges() == null ? Collections.emptyList() : roleDTO.getPrivileges());
        if (privileges.size() != (roleDTO.getPrivileges() == null ? 0 : roleDTO.getPrivileges().size())) {
            throw new NotFoundException("one of privileges not found");
        }
        role.setPrivileges(new HashSet<>(privileges));
        return role;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Role role = roleRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final User roleUser = userRepository.findFirstByRole(role);
        if (roleUser != null) {
            referencedWarning.setKey("role.user.role.referenced");
            referencedWarning.addParam(roleUser.getId());
            return referencedWarning;
        }
        return null;
    }

}
