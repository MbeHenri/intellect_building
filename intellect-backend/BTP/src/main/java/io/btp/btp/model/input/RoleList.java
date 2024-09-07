package io.btp.btp.model.input;


public enum RoleList {

   
    ADMIN("le role plus élevé de la plateform"),
    USER("les membres de la plateform");

    private final String description;

    RoleList(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
