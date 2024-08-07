package io.btp.btp.rest;

import io.btp.btp.model.ProfileDTO;
import io.btp.btp.service.ProfileService;
import io.btp.btp.service.storage.FileSystemStorageService;
import io.btp.btp.service.storage.StorageType;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.exception.ReferencedException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping(value = "/api/profiles", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProfileResource {

    private final ProfileService profileService;
    private final FileSystemStorageService fileSystemStorageService;

    public ProfileResource(final ProfileService profileService, final FileSystemStorageService fileSystemStorageService) {
        this.profileService = profileService;
        this.fileSystemStorageService = fileSystemStorageService;
    }

    @GetMapping
    public ResponseEntity<List<ProfileDTO>> getAllProfiles() {
        return ResponseEntity.ok(profileService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(profileService.get(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createProfile(
        @RequestParam(value = "name", required = false) String name,
        @RequestParam(value = "dateOfBirth", required = false) LocalDate dateOfBirth,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "photo", required = false) MultipartFile photo) throws IOException {
        
        ProfileDTO profileDTO =  ProfileDTO.builder().name(name)
                            .dateOfbirth(dateOfBirth)
                            .description(description)
                            .photo(photo != null && !photo.isEmpty() ? fileSystemStorageService.store(photo, StorageType.PROFILE_PHOTO):null)
                            .build();
        final Long createdId = profileService.create(profileDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> updateProfile(@PathVariable(name = "id") final Long id,
        @RequestParam(value = "name", required = false) String name,
        @RequestParam(value = "dateOfBirth", required = false) LocalDate dateOfBirth,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "photo", required = false) MultipartFile photo) throws IOException {
        
        ProfileDTO profileDTO =  ProfileDTO.builder().name(name)
            .dateOfbirth(dateOfBirth)
            .description(description)
            .photo(photo != null && !photo.isEmpty() ? fileSystemStorageService.store(photo, StorageType.PROFILE_PHOTO):null)
            .build();
            
        profileService.update(id, profileDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteProfile(@PathVariable(name = "id") final Long id) {
        final ReferencedWarning referencedWarning = profileService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        profileService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
