package io.btp.btp.model;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CartDTO {

    private Long id;

    @NotNull
    private Long user;

    private List<Long> formations;

}
