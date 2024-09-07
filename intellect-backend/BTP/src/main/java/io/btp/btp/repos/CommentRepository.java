package io.btp.btp.repos;

import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Publication;
import io.btp.btp.domain.User;
import io.btp.btp.domain.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findFirstByPublication(Publication publication);

    Comment findFirstByUser(User user);

    Comment findFirstByVisitor(Visitor visitor);

    Comment findFirstByCommentParentAndIdNot(Comment comment, final Long id);
}
