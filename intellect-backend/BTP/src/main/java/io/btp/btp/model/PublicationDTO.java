package io.btp.btp.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PublicationDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String content;

    @Size(max = 255)
    private String image;

    @NotNull
    private Long user;

    public PublicationDTO(){
        
    }

    public PublicationDTO(String content, String image, Long user){
        this.content = content;
        this.image = image;
        this.user = user;
    }

}
