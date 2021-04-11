package com.tampro.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Schedule;

@Repository
public interface ScheduleRepository extends PagingAndSortingRepository<Schedule, Long>, JpaSpecificationExecutor<Schedule>{
	
 
	@Query(value = "SELECT SC FROM Schedule SC WHERE SC.time BETWEEN :dateFrom and :dateTo" )
	//@Query(value = "SELECT * FROM Schedule SC WHERE SC.time BETWEEN :dateFrom and :dateTo", nativeQuery = true)
	List<Schedule> findByTime(@Param("dateFrom") Date dateFrom,@Param("dateTo") Date dateTo);
	
	 
}
 
	