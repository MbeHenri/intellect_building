package io.btp.btp.model.output;

import java.time.LocalDate;

import io.btp.btp.util.FileSystemStorage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileDTOOutput {
    byte[] photo;
    String name;
    private String sexe;
    private LocalDate dateOfBirth;
    private String description;



    public UserProfileDTOOutput(String name, String photoPath){
        this.name = name;
        this.photo = FileSystemStorage.toByte(photoPath);
    }

    public UserProfileDTOOutput(String name, String sexe, String description, LocalDate dateOfBirth, String photoPath){
        this(name, photoPath);
        this.sexe = sexe;
        this.description = description;
        this.dateOfBirth = dateOfBirth;
    }

}
