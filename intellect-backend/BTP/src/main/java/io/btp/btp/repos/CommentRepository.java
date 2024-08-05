package io.btp.btp.repos;

import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Publication;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findFirstByPublication(Publication publication);

}
