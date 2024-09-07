package io.btp.btp.model.output;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReplyDTOOutput {
    OwnerDTOOuput owner;
    Date date;
    String content;
}
