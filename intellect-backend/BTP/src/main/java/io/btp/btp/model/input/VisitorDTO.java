package io.btp.btp.model.input;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class VisitorDTO {

    private Long id;

    @Size(max = 255)
    private String email;

}
