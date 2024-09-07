package io.btp.btp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



import jakarta.persistence.OneToMany;
import java.util.Set;


@Entity
@Table(name = "Comments")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Comment {

        @Id
        @Column(nullable = false, updatable = false)
        @SequenceGenerator(
                name = "primary_sequence",
                sequenceName = "primary_sequence",
                allocationSize = 1,
                initialValue = 10000
        )
        @GeneratedValue(
                strategy = GenerationType.SEQUENCE,
                generator = "primary_sequence"
        )
        private Long id;
    
        @Column(nullable = false)
        private String content;
    
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "publication_id", nullable = false)
        private Publication publication;
    
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        private User user;
    
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "visitor_id")
        private Visitor visitor;
    
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "comment_parent_id")
        private Comment commentParent;
    
        @OneToMany(mappedBy = "commentParent")
        private Set<Comment> commentResponses;
    
        @CreatedDate
        @Column(nullable = false, updatable = false)
        private OffsetDateTime dateCreated;
    
        @LastModifiedDate
        @Column(nullable = false)
        private OffsetDateTime lastUpdated;
}
 