package io.btp.btp.model.input;

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
    private String title;

    @NotNull
    @Size(max = 255)
    private String content;

    @Size(max = 255)
    private String image;

    @NotNull
    private Long user;

    private byte[] imageData;

    public PublicationDTO(){
        
    }


    public PublicationDTO(String title, String content, String image, Long user){
        this.title = title;
        this.content = content;
        this.image = image;
        this.user = user;
    }

    public PublicationDTO(String title, String content, String image, Long user, byte[] imageData){
        this(title, content, image, user);
        this.imageData = imageData;
    }

}
