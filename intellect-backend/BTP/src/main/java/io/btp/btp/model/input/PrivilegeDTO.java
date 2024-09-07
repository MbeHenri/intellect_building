package io.btp.btp.model.input;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PrivilegeDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String description;

    public PrivilegeDTO(){
        
    }


    public PrivilegeDTO(String name, String description){
        this.name = name;
        this.description = description;
    }
}
