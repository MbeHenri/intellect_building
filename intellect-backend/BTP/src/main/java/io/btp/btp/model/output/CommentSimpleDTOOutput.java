package io.btp.btp.model.output;

import java.time.OffsetDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentSimpleDTOOutput {
    OwnerDTOOuput owner;
    OffsetDateTime date;
    String content;
    int nbrReplies; 

    public CommentSimpleDTOOutput(OwnerDTOOuput owner, OffsetDateTime date, String content, int nbrReplies){
        this.owner = owner;
        this.date = date;
        this.content = content;
        this.nbrReplies = nbrReplies;
    }
}
