package io.btp.btp.service;

import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Publication;
import io.btp.btp.domain.User;
import io.btp.btp.model.PublicationDTO;
import io.btp.btp.repos.CategoryRepository;
import io.btp.btp.repos.CommentRepository;
import io.btp.btp.repos.PublicationRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class PublicationService {

    private final PublicationRepository publicationRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;

    public PublicationService(final PublicationRepository publicationRepository,
            final UserRepository userRepository, final CategoryRepository categoryRepository,
            final CommentRepository commentRepository) {
        this.publicationRepository = publicationRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
    }

    public List<PublicationDTO> findAll() {
        final List<Publication> publications = publicationRepository.findAll(Sort.by("id"));
        return publications.stream()
                .map(publication -> mapToDTO(publication, new PublicationDTO()))
                .toList();
    }

    public PublicationDTO get(final Long id) {
        return publicationRepository.findById(id)
                .map(publication -> mapToDTO(publication, new PublicationDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final PublicationDTO publicationDTO) {
        final Publication publication = new Publication();
        mapToEntity(publicationDTO, publication);
        return publicationRepository.save(publication).getId();
    }

    public void update(final Long id, final PublicationDTO publicationDTO) {
        final Publication publication = publicationRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(publicationDTO, publication);
        publicationRepository.save(publication);
    }

    public void delete(final Long id) {
        final Publication publication = publicationRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        // remove many-to-many relations at owning side
        categoryRepository.findAllByPublications(publication)
                .forEach(category -> category.getPublications().remove(publication));
        publicationRepository.delete(publication);
    }

    private PublicationDTO mapToDTO(final Publication publication,
            final PublicationDTO publicationDTO) {
        publicationDTO.setId(publication.getId());
        publicationDTO.setContent(publication.getContent());
        publicationDTO.setImage(publication.getImage());
        publicationDTO.setUser(publication.getUser() == null ? null : publication.getUser().getId());
        return publicationDTO;
    }

    private Publication mapToEntity(final PublicationDTO publicationDTO,
            final Publication publication) {
        publication.setContent(publicationDTO.getContent());
        publication.setImage(publicationDTO.getImage());
        final User user = publicationDTO.getUser() == null ? null : userRepository.findById(publicationDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        publication.setUser(user);
        return publication;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Publication publication = publicationRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Comment publicationComment = commentRepository.findFirstByPublication(publication);
        if (publicationComment != null) {
            referencedWarning.setKey("publication.comment.publication.referenced");
            referencedWarning.addParam(publicationComment.getId());
            return referencedWarning;
        }
        return null;
    }

}
