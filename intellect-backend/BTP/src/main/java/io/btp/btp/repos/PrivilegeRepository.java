package io.btp.btp.repos;

import io.btp.btp.domain.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
}
