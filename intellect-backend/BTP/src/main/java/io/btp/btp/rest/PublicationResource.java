package io.btp.btp.rest;

import io.btp.btp.config.StorageProperties;
import io.btp.btp.model.input.PublicationDTO;
import io.btp.btp.model.output.PostDTOOutput;
import io.btp.btp.model.output.PostSimpleDTOOutput;
import io.btp.btp.service.PublicationService;
import io.btp.btp.util.FileSystemStorage;
import io.btp.btp.util.ReferencedWarning;
import io.btp.btp.util.StorageType;
import io.btp.btp.util.exception.ReferencedException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping(value = "/api/publications", produces = MediaType.APPLICATION_JSON_VALUE)
public class PublicationResource {

    private final PublicationService publicationService;
    private final StorageProperties storageProperties;

    public PublicationResource(final PublicationService publicationService, final StorageProperties storageProperties) {
        this.publicationService = publicationService;
        this.storageProperties = storageProperties;
    }

    // @GetMapping
    // public ResponseEntity<List<PostSimpleDTOOutput>> getAllPublications() {
    //     return ResponseEntity.ok(publicationService.findAll(Optional.ofNullable(null)));
    // }
    

    @GetMapping("user/{userId}")
    public ResponseEntity<List<PostSimpleDTOOutput>> getAllPublications(@PathVariable(name="userId") final Long userId) {
        return ResponseEntity.ok(publicationService.findAll(Optional.of(userId)));
    }

    @GetMapping
    public ResponseEntity<List<PostSimpleDTOOutput>> getAllPublications() {
        return ResponseEntity.ok(publicationService.findAll(Optional.ofNullable(null)));
    }


    @GetMapping("/{id}")
    public ResponseEntity<PostDTOOutput> getPublication(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(publicationService.get(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createPublication(
            @RequestParam("title") String title,
            @RequestParam("content") String content,  
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("user") Long user
            ) throws IOException{ 

        String imagePath = FileSystemStorage.store(image, Paths.get(storageProperties.getLocation()), StorageType.PUBLICATION_IMAGE);
        PublicationDTO publicationDTO = new PublicationDTO(title, content, imagePath, user);
        final Long createdId = publicationService.create(publicationDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> updatePublication(@PathVariable(name = "id") final Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,  
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("user") Long user) throws IOException {
        
        String imagePath = FileSystemStorage.store(image, Paths.get(storageProperties.getLocation()), StorageType.PUBLICATION_IMAGE);
        PublicationDTO publicationDTO = new PublicationDTO(title, content, imagePath, user);
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
