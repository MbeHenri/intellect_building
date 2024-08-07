package io.btp.btp.repos;

import io.btp.btp.domain.Profile;
import io.btp.btp.domain.Role;
import io.btp.btp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByRole(Role role);

    User findFirstByProfile(Profile profile);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByProfileId(Long id);

}
