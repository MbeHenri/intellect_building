package io.btp.btp.rest;

import io.btp.btp.model.PublicationDTO;
import io.btp.btp.service.PublicationService;
import io.btp.btp.service.storage.FileSystemStorageService;
import io.btp.btp.service.storage.StorageType;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.exception.ReferencedException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;

import java.io.IOException;
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
@RequestMapping(value = "/api/publications", produces = MediaType.APPLICATION_JSON_VALUE)
public class PublicationResource {

    private final PublicationService publicationService;
    private final FileSystemStorageService fileSystemStorageService;

    public PublicationResource(final PublicationService publicationService, final FileSystemStorageService fileSystemStorageService) {
        this.publicationService = publicationService;
        this.fileSystemStorageService = fileSystemStorageService;
    }

    @GetMapping
    public ResponseEntity<List<PublicationDTO>> getAllPublications() {
        return ResponseEntity.ok(publicationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationDTO> getPublication(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(publicationService.get(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createPublication(
            @RequestParam("content") String content,  
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("user") Long user
            ) throws IOException{ 

        String imagePath = fileSystemStorageService.store(image, StorageType.PUBLICATION_IMAGE);
        PublicationDTO publicationDTO = new PublicationDTO(content, imagePath, user);
        final Long createdId = publicationService.create(publicationDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> updatePublication(@PathVariable(name = "id") final Long id,
            @RequestParam("content") String content,  
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("user") Long user) throws IOException {
        
        String imagePath = fileSystemStorageService.store(image, StorageType.PUBLICATION_IMAGE);
        PublicationDTO publicationDTO = new PublicationDTO(content, imagePath, user);
        publicationService.update(id, publicationDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePublication(@PathVariable(name = "id") final Long id) {
        final ReferencedWarning referencedWarning = publicationService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        publicationService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
