package io.btp.btp.repos;

import io.btp.btp.domain.Publication;
import io.btp.btp.domain.User;
import io.btp.btp.domain.projection.PostProjection;
import io.btp.btp.domain.projection.PostSimpleProjection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PublicationRepository extends JpaRepository<Publication, Long> {

        Publication findFirstByUser(User user);

        // @Query("SELECT new
        // io.btp.btp.model.output.PostSimpleDTOOutput(p.user.profile.name, p.image,
        // p.title, p.content, p.dateCreated , COUNT(c)) " +
        // "FROM Publication p " +
        // "LEFT JOIN p.comments c " +
        // "GROUP BY p.id, p.user.profile.name, p.image, p.title, p.content,
        // p.dateCreated")
        // List<PostSimpleDTOOutput> findAllPublications();

        // @Query("SELECT new
        // io.btp.btp.model.output.PostSimpleDTOOutput(p.user.profile.name, p.image,
        // p.title, p.content, p.dateCreated, COUNT(c)) " +
        // "FROM Publication p " +
        // "LEFT JOIN p.comments c " +
        // "WHERE p.user.id = :userId " +
        // "GROUP BY p.id, p.user.profile.name, p.image, p.title, p.content,
        // p.dateCreated")
        // List<PostSimpleDTOOutput> findAllPublications(@Param("userId") Long userId);

        @Query("SELECT p " +
                        "FROM Publication p")
        List<PostSimpleProjection> findAllPublications();

        @Query("SELECT p " +
                        "FROM Publication p " +
                        "WHERE p.user.id = :userId")
        List<PostSimpleProjection> findAllPublications(@Param("userId") Long userId);

        @Query("SELECT p " +
                        "FROM Publication p " +
                        "WHERE p.id = :publicationId")
        Optional<PostProjection> findByIdTest(Long publicationId);
}
