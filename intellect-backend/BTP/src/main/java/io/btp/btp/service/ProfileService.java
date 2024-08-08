package io.btp.btp.service;

import io.btp.btp.domain.Profile;
import io.btp.btp.domain.User;
import io.btp.btp.model.ProfileDTO;
import io.btp.btp.repos.ProfileRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.service.storage.FileSystemStorageService;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.exception.NotFoundException;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final FileSystemStorageService fileSystemStorageService;

    public ProfileService(final ProfileRepository profileRepository,
            final UserRepository userRepository, final FileSystemStorageService fileSystemStorageService) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.fileSystemStorageService = fileSystemStorageService;
    }

    public List<ProfileDTO> findAll() {
        final List<Profile> profiles = profileRepository.findAll(Sort.by("id"));
        return profiles.stream()
                .map(profile -> mapToDTO(profile, ProfileDTO.builder().build()))
                .toList();
    }

    public ProfileDTO get(final Long id) {
        return profileRepository.findById(id)
                .map(profile -> mapToDTO(profile, ProfileDTO.builder().build()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final ProfileDTO profileDTO) {
        final Profile profile = new Profile();
        mapToEntity(profileDTO, profile);
        return profileRepository.save(profile).getId();
    }

    public void update(final Long id, final ProfileDTO profileDTO) {
        final Profile profile = profileRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(profileDTO, profile);
        profileRepository.save(profile);
    }

    public void delete(final Long id) {
        profileRepository.deleteById(id);
    }

    private ProfileDTO mapToDTO(final Profile profile, final ProfileDTO profileDTO) {
        profileDTO.setId(profile.getId());
        profileDTO.setName(profile.getName());
        profileDTO.setSexe(profile.getSexe());
        profileDTO.setDateOfbirth(profile.getDateOfbirth());
        profileDTO.setDescription(profile.getDescription());
        profileDTO.setPhoto(profile.getPhoto());
        profileDTO.setPhotoData(fileSystemStorageService.toByte(profile.getPhoto()));
        return profileDTO;
    }

    private Profile mapToEntity(final ProfileDTO profileDTO, final Profile profile) {
        profile.setName(profileDTO.getName());
        profile.setSexe(profileDTO.getSexe());
        profile.setDateOfbirth(profileDTO.getDateOfbirth());
        profile.setDescription(profileDTO.getDescription());
        profile.setPhoto(profileDTO.getPhoto());
        return profile;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Profile profile = profileRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final User profileUser = userRepository.findFirstByProfile(profile);
        if (profileUser != null) {
            referencedWarning.setKey("profile.user.profile.referenced");
            referencedWarning.addParam(profileUser.getId());
            return referencedWarning;
        }
        return null;
    }

}
