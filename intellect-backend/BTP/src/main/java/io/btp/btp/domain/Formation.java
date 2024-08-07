package io.btp.btp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "Formations")
@Getter
@Setter
public class Formation extends Product {

    @Column(nullable = false)
    private String pdfFile;

    @ManyToMany(mappedBy = "formations")
    private Set<Cart> carts;

}
