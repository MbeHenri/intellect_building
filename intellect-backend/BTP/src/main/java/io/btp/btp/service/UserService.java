package io.btp.btp.service;

import io.btp.btp.domain.Cart;
import io.btp.btp.domain.Comment;
import io.btp.btp.domain.Profile;
import io.btp.btp.domain.Publication;
import io.btp.btp.domain.Role;
import io.btp.btp.domain.User;
import io.btp.btp.model.input.UserDTO;
import io.btp.btp.repos.CartRepository;
import io.btp.btp.repos.CommentRepository;
import io.btp.btp.repos.ProfileRepository;
import io.btp.btp.repos.PublicationRepository;
import io.btp.btp.repos.RoleRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.util.exception.NotFoundException;
import io.btp.btp.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final PublicationRepository publicationRepository;
    private final CartRepository cartRepository;
    private final CommentRepository commentRepository;

    public UserService(final UserRepository userRepository, final RoleRepository roleRepository,
            final ProfileRepository profileRepository,
            final PublicationRepository publicationRepository, final CartRepository cartRepository,
            final CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.profileRepository = profileRepository;
        this.publicationRepository = publicationRepository;
        this.cartRepository = cartRepository;
        this.commentRepository = commentRepository;
    }

    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("id"));
        return users.stream()
                .map(user -> mapToDTO(user, UserDTO.builder().build()))
                .toList();
    }

    public UserDTO get(final Long id) {
        return userRepository.findById(id)
                .map(user -> mapToDTO(user, UserDTO.builder().build()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getId();
    }

    public void update(final Long id, final UserDTO userDTO) {
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final Long id) {
        userRepository.deleteById(id);
    }

    private UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole() == null ? null : user.getRole().getId());
        userDTO.setProfile(user.getProfile() == null ? null : user.getProfile().getId());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        final Role role = userDTO.getRole() == null ? null : roleRepository.findById(userDTO.getRole())
                .orElseThrow(() -> new NotFoundException("role not found"));
        user.setRole(role);
        final Profile profile = userDTO.getProfile() == null ? null : profileRepository.findById(userDTO.getProfile())
                .orElseThrow(() -> new NotFoundException("profile not found"));
        user.setProfile(profile);
        return user;
    }

    public boolean emailExists(final String email) {
        return userRepository.existsByEmailIgnoreCase(email);
    }

    public boolean profileExists(final Long id) {
        return userRepository.existsByProfileId(id);
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final User user = userRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Publication userPublication = publicationRepository.findFirstByUser(user);
        if (userPublication != null) {
            referencedWarning.setKey("user.publication.user.referenced");
            referencedWarning.addParam(userPublication.getId());
            return referencedWarning;
        }
        final Cart userCart = cartRepository.findFirstByUser(user);
        if (userCart != null) {
            referencedWarning.setKey("user.cart.user.referenced");
            referencedWarning.addParam(userCart.getId());
            return referencedWarning;
        }
        final Comment userComment = commentRepository.findFirstByUser(user);
        if (userComment != null) {
            referencedWarning.setKey("user.comment.user.referenced");
            referencedWarning.addParam(userComment.getId());
            return referencedWarning;
        }
        return null;
    }

}
