package com.tampro;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.tampro.model.specification.ScheduleSpecification;
import com.tampro.repository.ScheduleRepository;
import com.tampro.service.ScheduleService;

@SpringBootApplication(scanBasePackages = "com.tampro")
@EnableJpaAuditing
@EnableJpaRepositories
public class ClinicBackendApplication implements CommandLineRunner{
//	
	@Autowired
	ScheduleRepository scheduleRepository;
	@Autowired
	ScheduleService scheduleService;
	
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	public static void main(String[] args) {
		SpringApplication.run(ClinicBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
//		
//		scheduleRepository
//				.findAll(new ScheduleSpecification("A", "2021-04-08 08:00:00", "2021-04-08 08:00:00", 1, 1))
//				.forEach(item -> {
//					System.out.println(item.getReason());
//				});
		
//		scheduleRepository.findAllScheduleDate("2021-04-08","2021-04-08", PageRequest.of(0, 10))
//							.forEach(item -> {
//								System.out.println(item.getDoctorName() +'-'+ item.getPatientName());
//							});
//		String dateString = "2021-04-08 08:00:00";
//		scheduleService.findByTime(simpleDateFormat.parse(dateString)).forEach(item -> {
//			System.out.println(item.getReason());
//		});
//		String dateString = "2021-15-08 08:00:00";
//		Date date = simpleDateFormat.parse(dateString);
//		System.out.println(date.after(new Date()));
	}

}
