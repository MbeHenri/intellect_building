package io.btp.btp.model.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CommentDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String content;

    @NotNull
    private Long publication;

    private Long user;

    private Long visitor;

    private Long commentParent;

}
