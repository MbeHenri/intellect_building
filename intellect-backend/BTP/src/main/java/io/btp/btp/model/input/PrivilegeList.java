package io.btp.btp.model.input;


public enum PrivilegeList {

    PUBLISH("publier un post"),
    COMMENT("emmettre un commentaire sur un post"),
    ADD_USER("ajouter un utilisateur"),
    DELETE_USER("supprimer le compte d'un utilisateur"),
    UPDATE_PRIVILEGE_ROLE ("mettre à jour les privileges d'un role"),
    UPDATE_USER_ROLE ("mettre a jour le role d'un utilisateur"),
    UPDATE_PROFILE ("mettre a jour le profile d'un utilisateur"),
    MAKE_PAYEMENT ("effectuer un payement"),
    ADD_PRODUCT ("ajouter un produit"),
    UPDATE_PRODUCT ("mettre a jour un produit"),
    DELETE_PRODUCT ("supprimer un produit");


    

    private final String description;

    PrivilegeList(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
