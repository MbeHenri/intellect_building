package io.btp.btp.service;

import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Publication;
import io.btp.btp.domain.User;
import io.btp.btp.domain.projection.PostProjection;
import io.btp.btp.model.input.PublicationDTO;
import io.btp.btp.model.output.CommentSimpleDTOOutput;
import io.btp.btp.model.output.OwnerDTOOuput;
import io.btp.btp.model.output.PostDTOOutput;
import io.btp.btp.model.output.PostSimpleDTOOutput;
import io.btp.btp.model.output.UserProfileDTOOutput;
import io.btp.btp.repos.CategoryRepository;
import io.btp.btp.repos.CommentRepository;
import io.btp.btp.repos.PublicationRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.util.FileSystemStorage;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

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


    public List<PostSimpleDTOOutput> findAll(Optional<Long> userId) {
        return userId.isPresent() ? publicationRepository.findAllPublications(userId.get())
                .stream()
                .map(postSimpleProjection -> new PostSimpleDTOOutput(postSimpleProjection.getUser().getEmail(),
                        postSimpleProjection.getImage(), postSimpleProjection.getTitle(),
                        postSimpleProjection.getContent(), postSimpleProjection.getDateCreated(),
                        postSimpleProjection.getComments().size()))
                .toList()
                : publicationRepository.findAllPublications()
                        .stream()
                        .map(postSimpleProjection -> new PostSimpleDTOOutput(postSimpleProjection.getUser().getEmail(),
                                postSimpleProjection.getImage(), postSimpleProjection.getTitle(),
                                postSimpleProjection.getContent(), postSimpleProjection.getDateCreated(),
                                postSimpleProjection.getComments().size()))
                        .toList();

    }

    public PostDTOOutput get(final Long id) {
        PostProjection postProjection = publicationRepository.findByIdTest(id).orElseThrow(NotFoundException::new);
        return PostDTOOutput.builder()
                .title(postProjection.getTitle())
                .Content(postProjection.getContent())
                .img(FileSystemStorage.toByte(postProjection.getImage()))
                .publisher(new UserProfileDTOOutput(postProjection.getUser().getProfile().getName(),
                        postProjection.getUser().getProfile().getPhoto()))
                .date(postProjection.getDateCreated())
                .comments(postProjection.getComments().stream().map(commentSummary -> CommentSimpleDTOOutput.builder()
                        .owner(commentSummary.getVisitor() == null
                                ? new OwnerDTOOuput(commentSummary.getUser().getProfile().getName(),
                                        commentSummary.getUser().getProfile().getPhoto())
                                : new OwnerDTOOuput(commentSummary.getVisitor().getEmail(), null))
                        .date(commentSummary.getDateCreated())
                        .content(commentSummary.getContent())
                        .nbrReplies(commentSummary.getCommentResponses().size())
                        .build()).toList())
                .build();

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

    // private PublicationDTO mapToDTO(final Publication publication,
    // final PublicationDTO publicationDTO) {
    // publicationDTO.setId(publication.getId());
    // publicationDTO.setTitle(publication.getTitle());
    // publicationDTO.setContent(publication.getContent());
    // publicationDTO.setImage(publication.getImage());
    // publicationDTO.setImageData(FileSystemStorage.toByte(publication.getImage()));
    // publicationDTO.setUser(publication.getUser() == null ? null :
    // publication.getUser().getId());
    // return publicationDTO;
    // }

    private Publication mapToEntity(final PublicationDTO publicationDTO,
            final Publication publication) {
        publication.setContent(publicationDTO.getContent());
        publication.setTitle(publicationDTO.getTitle());
        publication.setImage(publicationDTO.getImage());
        final User user = publicationDTO.getUser() == null ? null
                : userRepository.findById(publicationDTO.getUser())
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
