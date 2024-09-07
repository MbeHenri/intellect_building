package io.btp.btp.service;

import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Publication;
import io.btp.btp.domain.User;
import io.btp.btp.domain.Visitor;
import io.btp.btp.model.input.CommentDTO;
import io.btp.btp.repos.CommentRepository;
import io.btp.btp.repos.PublicationRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.repos.VisitorRepository;
import io.btp.btp.util.exception.NotFoundException;
import io.btp.btp.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PublicationRepository publicationRepository;
    private final UserRepository userRepository;
    private final VisitorRepository visitorRepository;

    public CommentService(final CommentRepository commentRepository,
            final PublicationRepository publicationRepository, final UserRepository userRepository,
            final VisitorRepository visitorRepository) {
        this.commentRepository = commentRepository;
        this.publicationRepository = publicationRepository;
        this.userRepository = userRepository;
        this.visitorRepository = visitorRepository;
    }

    public List<CommentDTO> findAll() {
        final List<Comment> comments = commentRepository.findAll(Sort.by("id"));
        return comments.stream()
                .map(comment -> mapToDTO(comment, new CommentDTO()))
                .toList();
    }

    public CommentDTO get(final Long id) {
        return commentRepository.findById(id)
                .map(comment -> mapToDTO(comment, new CommentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final CommentDTO commentDTO) {
        final Comment comment = new Comment();
        mapToEntity(commentDTO, comment);
        return commentRepository.save(comment).getId();
    }

    public void update(final Long id, final CommentDTO commentDTO) {
        final Comment comment = commentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(commentDTO, comment);
        commentRepository.save(comment);
    }

    public void delete(final Long id) {
        commentRepository.deleteById(id);
    }

    private CommentDTO mapToDTO(final Comment comment, final CommentDTO commentDTO) {
        commentDTO.setId(comment.getId());
        commentDTO.setContent(comment.getContent());
        commentDTO.setPublication(comment.getPublication() == null ? null : comment.getPublication().getId());
        commentDTO.setUser(comment.getUser() == null ? null : comment.getUser().getId());
        commentDTO.setVisitor(comment.getVisitor() == null ? null : comment.getVisitor().getId());
        commentDTO.setCommentParent(comment.getCommentParent() == null ? null : comment.getCommentParent().getId());
        return commentDTO;
    }

    private Comment mapToEntity(final CommentDTO commentDTO, final Comment comment) {
        comment.setContent(commentDTO.getContent());
        final Publication publication = commentDTO.getPublication() == null ? null : publicationRepository.findById(commentDTO.getPublication())
                .orElseThrow(() -> new NotFoundException("publication not found"));
        comment.setPublication(publication);
        final User user = commentDTO.getUser() == null ? null : userRepository.findById(commentDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        comment.setUser(user);
        final Visitor visitor = commentDTO.getVisitor() == null ? null : visitorRepository.findById(commentDTO.getVisitor())
                .orElseThrow(() -> new NotFoundException("visitor not found"));
        comment.setVisitor(visitor);
        final Comment commentParent = commentDTO.getCommentParent() == null ? null : commentRepository.findById(commentDTO.getCommentParent())
                .orElseThrow(() -> new NotFoundException("commentParent not found"));
        comment.setCommentParent(commentParent);
        return comment;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Comment comment = commentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Comment commentParentComment = commentRepository.findFirstByCommentParentAndIdNot(comment, comment.getId());
        if (commentParentComment != null) {
            referencedWarning.setKey("comment.comment.commentParent.referenced");
            referencedWarning.addParam(commentParentComment.getId());
            return referencedWarning;
        }
        return null;
    }

}
 