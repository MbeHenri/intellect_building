package io.btp.btp.domain.projection;

import java.time.OffsetDateTime;
import java.util.List;

public interface PostProjection {
    String getImage();
    PostUserOwner getUser();
    OffsetDateTime getDateCreated();
    List<CommentSummary> getComments();
    String getTitle();
    String getContent();

    
    interface PostUserOwner {
        PostUserProfileOwner getProfile();
        
        interface PostUserProfileOwner {
            String getName();
            String getPhoto();
        }
    }

   
    interface CommentSummary {
        OffsetDateTime getDateCreated();
        String getContent();
        List<CommentRepliesCount> getCommentResponses();
        CommentOwnerVisitor getVisitor();
        CommentOwner getUser();

        interface CommentRepliesCount {
            Long getId();
        }

        
        public interface CommentOwnerVisitor {
            String getEmail();
        }

       
        interface CommentOwner {
            String getEmail();
            UserProfileOwner getProfile();
                       
            interface UserProfileOwner {
                String getName();
                String getPhoto();
            }
                
        }
    }
}
