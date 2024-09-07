package io.btp.btp.model.output;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestDTO {
    String title;
    String summary;

    public TestDTO(String title, String summary){
        this.title = title;
        this.summary = summary;
    }
}
