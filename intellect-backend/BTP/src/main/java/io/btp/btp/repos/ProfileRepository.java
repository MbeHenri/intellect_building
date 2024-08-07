package io.btp.btp.repos;

import io.btp.btp.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
