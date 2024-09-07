package io.btp.btp.repos;

import io.btp.btp.domain.Category;
import io.btp.btp.domain.Publication;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findFirstByPublications(Publication publication);

    List<Category> findAllByPublications(Publication publication);

    Optional<Category> findFirstByLabel(String label); 

}
