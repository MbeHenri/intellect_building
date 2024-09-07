package io.btp.btp.model.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RoleDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String description;

    private List<Long> privileges;

    public RoleDTO(){
        
    }

    public RoleDTO(String name, String description){
        this.name = name;
        this.description = description;
    }

}
