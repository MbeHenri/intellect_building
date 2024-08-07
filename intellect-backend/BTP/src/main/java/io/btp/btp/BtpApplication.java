package io.btp.btp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@SpringBootApplication
@OpenAPIDefinition
public class BtpApplication {

    public static void main(final String[] args) {
        SpringApplication.run(BtpApplication.class, args);
    }

}
