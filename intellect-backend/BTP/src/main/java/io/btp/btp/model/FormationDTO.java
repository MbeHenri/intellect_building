package io.btp.btp.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FormationDTO {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

    @NotNull
    private Double price;

    @Size(max = 255)
    private String description;

    @NotNull
    @Size(max = 255)
    private String pdfFile;

    public FormationDTO(){

    }

    public FormationDTO(String name, double price, String pdfFile){
        this.name = name;
        this.price = price;
        this.pdfFile = pdfFile;
    }

    public FormationDTO(String name, double price, String description, String pdfFile){
        this(name, price, pdfFile);
        this.description = description;
    }

}
