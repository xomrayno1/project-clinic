package com.tampro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackages = "com.tampro	")
@EnableJpaAuditing
public class ClinicBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClinicBackendApplication.class, args);
	}

}
