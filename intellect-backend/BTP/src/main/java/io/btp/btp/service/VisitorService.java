package io.btp.btp.service;

import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Visitor;
import io.btp.btp.model.input.VisitorDTO;
import io.btp.btp.repos.CommentRepository;
import io.btp.btp.repos.VisitorRepository;
import io.btp.btp.util.exception.NotFoundException;
import io.btp.btp.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;
    private final CommentRepository commentRepository;

    public VisitorService(final VisitorRepository visitorRepository,
            final CommentRepository commentRepository) {
        this.visitorRepository = visitorRepository;
        this.commentRepository = commentRepository;
    }

    public List<VisitorDTO> findAll() {
        final List<Visitor> visitors = visitorRepository.findAll(Sort.by("id"));
        return visitors.stream()
                .map(visitor -> mapToDTO(visitor, new VisitorDTO()))
                .toList();
    }

    public VisitorDTO get(final Long id) {
        return visitorRepository.findById(id)
                .map(visitor -> mapToDTO(visitor, new VisitorDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final VisitorDTO visitorDTO) {
        final Visitor visitor = new Visitor();
        mapToEntity(visitorDTO, visitor);
        return visitorRepository.save(visitor).getId();
    }

    public void update(final Long id, final VisitorDTO visitorDTO) {
        final Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(visitorDTO, visitor);
        visitorRepository.save(visitor);
    }

    public void delete(final Long id) {
        visitorRepository.deleteById(id);
    }

    private VisitorDTO mapToDTO(final Visitor visitor, final VisitorDTO visitorDTO) {
        visitorDTO.setId(visitor.getId());
        visitorDTO.setEmail(visitor.getEmail());
        return visitorDTO;
    }

    private Visitor mapToEntity(final VisitorDTO visitorDTO, final Visitor visitor) {
        visitor.setEmail(visitorDTO.getEmail());
        return visitor;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Comment visitorComment = commentRepository.findFirstByVisitor(visitor);
        if (visitorComment != null) {
            referencedWarning.setKey("visitor.comment.visitor.referenced");
            referencedWarning.addParam(visitorComment.getId());
            return referencedWarning;
        }
        return null;
    }

}
