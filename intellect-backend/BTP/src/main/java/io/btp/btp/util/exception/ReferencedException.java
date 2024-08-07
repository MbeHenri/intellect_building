package io.btp.btp.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.btp.btp.util.ReferencedWarning;


@ResponseStatus(HttpStatus.CONFLICT)
public class ReferencedException extends RuntimeException {

    public ReferencedException() {
        super();
    }

    public ReferencedException(final ReferencedWarning referencedWarning) {
        super(referencedWarning.toMessage());
    }

}
