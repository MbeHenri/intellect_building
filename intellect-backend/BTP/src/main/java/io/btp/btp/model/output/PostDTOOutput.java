package io.btp.btp.model.output;

import java.time.OffsetDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PostDTOOutput {
    byte[] img;
    UserProfileDTOOutput publisher;
    OffsetDateTime date;
    List<CommentSimpleDTOOutput> comments;
    String title;
    String Content;
}
