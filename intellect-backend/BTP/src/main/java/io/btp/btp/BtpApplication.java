package io.btp.btp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@SpringBootApplication
@OpenAPIDefinition
public class BtpApplication {

    public static void main(final String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(BtpApplication.class, args);
        Initialisation initialisation =  applicationContext.getBean(Initialisation.class);
        initialisation.rolesPrivileges();
        initialisation.addDefaultCategory();
        initialisation.addDefaultAdmin();
    }

}
