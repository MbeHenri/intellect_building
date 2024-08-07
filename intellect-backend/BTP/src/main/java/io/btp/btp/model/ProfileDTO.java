package io.btp.btp.model;

import jakarta.validation.constraints.Size;
import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class ProfileDTO {

    private Long id;

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String sexe;

    private LocalDate dateOfbirth;

    @Size(max = 255)
    private String description;

    @Size(max = 255)
    private String photo;

}
