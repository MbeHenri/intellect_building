package io.btp.btp.domain.projection;

import java.time.OffsetDateTime;
import java.util.List;

public interface PostSimpleProjection {
    String getImage();
    UserSummary getUser();
    OffsetDateTime getDateCreated();
    List<CommentCount> getComments();
    String getTitle();
    String getContent();


    
    interface UserSummary {
        String getEmail();

        ProfileSummary getProfile();

    
        interface ProfileSummary {
            
            String getName();
        }
    }

    public interface CommentCount {
        Long getId();
    }
}
