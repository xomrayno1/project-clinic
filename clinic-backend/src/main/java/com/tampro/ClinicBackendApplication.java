package com.tampro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.tampro.repository.ScheduleRepository;

@SpringBootApplication(scanBasePackages = "com.tampro")
@EnableJpaAuditing
@EnableJpaRepositories
public class ClinicBackendApplication implements CommandLineRunner{
	
	@Autowired
	ScheduleRepository scheduleRepository;

	public static void main(String[] args) {
		SpringApplication.run(ClinicBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		scheduleRepository.findAllScheduleDate("2021-04-08","2021-04-08", PageRequest.of(0, 10))
							.forEach(item -> {
								System.out.println(item.getDoctorName() +'-'+ item.getPatientName());
							});
	}

}