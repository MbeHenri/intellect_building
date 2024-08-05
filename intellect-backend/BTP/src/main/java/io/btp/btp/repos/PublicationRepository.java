package io.btp.btp.repos;

import io.btp.btp.domain.Publication;
import io.btp.btp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PublicationRepository extends JpaRepository<Publication, Long> {

    Publication findFirstByUser(User user);

}
