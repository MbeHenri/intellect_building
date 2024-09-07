package io.btp.btp.model.output;

import java.util.ArrayList;
import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentDTOOuptut {
    OwnerDTOOuput owner;
    Date date;
    String content;
    ArrayList<ReplyDTOOutput> replies;
}
