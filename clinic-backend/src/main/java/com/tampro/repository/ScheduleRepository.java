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
import com.tampro.model.StatisticalSchedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>, JpaSpecificationExecutor<Schedule>{
	
 
	@Query(value = "SELECT SC FROM Schedule SC WHERE SC.time BETWEEN :dateFrom and :dateTo and doctor.id = :doctorId" )
	List<Schedule> findByTime(
			@Param("dateFrom") Date dateFrom,
			@Param("dateTo") Date dateTo,
			@Param("doctorId") long doctorId);
	
	@Query(value = "SELECT SC FROM Schedule SC WHERE SC.time BETWEEN :dateFrom and :dateTo and doctor.id = :doctorId and status = :status" )
	List<Schedule> findByTimeAndStatus(
			@Param("dateFrom") Date dateFrom,
			@Param("dateTo") Date dateTo,
			@Param("status") int status,
			@Param("doctorId") long doctorId);
	
	@Modifying
	@Query(value="UPDATE Schedule sc set sc.status = ?1 where sc.id = ?2 ")
	Schedule updateStatusSchedule(int status, int id); ///sai cmnr
	
	@Query(value = "SELECT COUNT(SC) FROM Schedule SC WHERE SC.time BETWEEN :dateFrom and :dateTo and doctor.id = :doctorId and status = :status" )
	int countByTimeAndStatus(
			@Param("dateFrom") Date dateFrom,
			@Param("dateTo") Date dateTo,
			@Param("status") int status,
			@Param("doctorId") long doctorId);
	
	
	@Query("SELECT COUNT(sc)  from Schedule sc where sc.activeFlag = ?1 and sc.status = ?2 and Month(sc.time)  =  ?3 ")
	long countByActiveFlagAndStatusAndTime(int activeFlag, int status, int month);
	
	@Query(value = "select month(sc.create_date) as 'month', sc.status as 'status', count(*) as 'count' from schedule sc "
			+ " where YEAR(sc.create_date) = ?1"
			+ " group by month(sc.create_date),sc.status"
			+ " having sc.status != 1", 
			nativeQuery = true)
	List<StatisticalSchedule> statisticalScheduleByYear(int year);
	
}
 
	