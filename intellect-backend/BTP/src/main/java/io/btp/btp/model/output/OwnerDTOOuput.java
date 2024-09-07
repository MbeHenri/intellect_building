package io.btp.btp.model.output;

import io.btp.btp.util.FileSystemStorage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OwnerDTOOuput {
    String name;
    byte[] img;

    public OwnerDTOOuput(String name, String imgPath){
        this.name = name;
        this.img = FileSystemStorage.toByte(imgPath);
    }
}
