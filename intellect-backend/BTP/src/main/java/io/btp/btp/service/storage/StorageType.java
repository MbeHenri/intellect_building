package io.btp.btp.service.storage;

public enum StorageType {
    PROFILE_PHOTO("profile_photo"),
    PUBLICATION_IMAGE("publication_image"),
    FORMATION_PDF("formation_pdf");



    private String folder;

    private StorageType(String folder){
        this.folder = folder;
    }


    public String getFolder(){
        return this.folder;
    }
}
