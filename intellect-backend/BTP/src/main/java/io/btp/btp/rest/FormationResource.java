package io.btp.btp.rest;

import io.btp.btp.config.StorageProperties;
import io.btp.btp.model.input.FormationDTO;
import io.btp.btp.service.FormationService;
import io.btp.btp.util.FileSystemStorage;
import io.btp.btp.util.StorageType;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
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
@RequestMapping(value = "/api/formations", produces = MediaType.APPLICATION_JSON_VALUE)
public class FormationResource {

    private final FormationService formationService;
    private final StorageProperties storageProperties;

    public FormationResource(final FormationService formationService, final StorageProperties storageProperties) {
        this.formationService = formationService;
        this.storageProperties = storageProperties;
    }

    @GetMapping
    public ResponseEntity<List<FormationDTO>> getAllFormations() {
        return ResponseEntity.ok(formationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationDTO> getFormation(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(formationService.get(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createFormation(
        @RequestParam("name") String name,
        @RequestParam("price") float price,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam("pdfFile") MultipartFile pdfFile) throws IOException {

        String pdfFilePath = FileSystemStorage.store(pdfFile, Paths.get(storageProperties.getLocation()), StorageType.FORMATION_PDF);
        
        FormationDTO formationDTO = description != null ? new FormationDTO(name, price, description, pdfFilePath) : new FormationDTO(name, price, pdfFilePath);

        final Long createdId = formationService.create(formationDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> updateFormation(@PathVariable(name = "id") final Long id,
        @RequestParam("name") String name,
        @RequestParam("price") float price,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam("pdfFile") MultipartFile pdfFile) throws IOException {
        
        String pdfFilePath = FileSystemStorage.store(pdfFile, Paths.get(storageProperties.getLocation()), StorageType.FORMATION_PDF);
        FormationDTO formationDTO = description != null ? new FormationDTO(name, price, description, pdfFilePath) : new FormationDTO(name, price, pdfFilePath);
        formationService.update(id, formationDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteFormation(@PathVariable(name = "id") final Long id) {
        formationService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
