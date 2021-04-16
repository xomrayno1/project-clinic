package com.tampro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>, JpaSpecificationExecutor<Schedule>{
	
 
	@Query(value = "SELECT SC FROM Schedule SC WHERE SC.time BETWEEN :dateFrom and :dateTo and doctor.id = :doctorId" )
	List<Schedule> findByTime(
			@Param("dateFrom") Date dateFrom,
			@Param("dateTo") Date dateTo,
			@Param("doctorId") long doctorId);
	
	@Modifying
	@Query(value="UPDATE Schedule sc set sc.status = ?1 where sc.id = ?2 ")
	Schedule updateStatusSchedule(int status, int id); ///sai cmnr
}
 
	