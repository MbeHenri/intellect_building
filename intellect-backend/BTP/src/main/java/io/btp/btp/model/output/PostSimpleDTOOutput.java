package io.btp.btp.model.output;

import java.time.OffsetDateTime;
import io.btp.btp.util.FileSystemStorage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostSimpleDTOOutput {
    byte[] img;
    String publisher;
    OffsetDateTime date;
    int nbreComment;
    String title;
    String summary;

    public PostSimpleDTOOutput(String publisher, String imgPath, String title, String summary, OffsetDateTime date, int nbreComment){
        this.publisher = publisher;
        this.img = FileSystemStorage.toByte(imgPath);
        this.title = title;
        this.summary = summary;
        this.date = date;
        this.nbreComment = nbreComment;
    }

    public PostSimpleDTOOutput(String publisher, byte[] img, String title, String summary, OffsetDateTime date, int nbreComment){
        this.publisher = publisher;
        this.img = img;
        this.title = title;
        this.summary = summary;
        this.date = date;
        this.nbreComment = nbreComment;
    }

    public PostSimpleDTOOutput(String publisher, String imgPath, String title, String summary){
        this.publisher = publisher;
        this.img = FileSystemStorage.toByte(imgPath);
        this.title = title;
        this.summary = summary;
    }
}
