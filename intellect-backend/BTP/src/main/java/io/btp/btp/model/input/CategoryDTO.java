package io.btp.btp.model.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CategoryDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String label;

    @Size(max = 255)
    private String description;

    private List<Long> publications;


    public CategoryDTO(){
       
    }


    public CategoryDTO(String label, String description){
        this.label = label;
        this.description = description;
    }

 

}
