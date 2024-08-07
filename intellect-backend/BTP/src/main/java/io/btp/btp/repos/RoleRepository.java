package io.btp.btp.repos;

import io.btp.btp.domain.Privilege;
import io.btp.btp.domain.Role;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findFirstByPrivileges(Privilege privilege);

    List<Role> findAllByPrivileges(Privilege privilege);

}
