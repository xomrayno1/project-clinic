package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Schedule;
import com.tampro.model.ScheduleInterface;

@Repository
public interface ScheduleRepository extends PagingAndSortingRepository<Schedule, Long>{
	
	@Query(value="SELECT SC.REASON, SC.STATUS, SC.TIME, SC.TYPE, SC.DOCTOR_ID as DoctorId, SC.PATIENT_ID as PatientId, DT.NAME AS DoctorName,PT.NAME  AS PatientName , SC.ID "
			+ " FROM SCHEDULE  AS SC "
			+ " INNER JOIN DOCTOR DT ON DT.ID = SC.DOCTOR_ID "
			+ " INNER JOIN PATIENTS PT ON PT.ID = SC.PATIENT_ID "
			+ " WHERE   DATE(SC.TIME) between  :dateTo AND :dateFrom "
			+ "	AND UPPER(DT.NAME) LIKE CONCAT('%',UPPER(:name),'%') "
			+ "	OR    UPPER(PT.NAME) LIKE CONCAT('%',UPPER(:name),'%') "
			,
			countQuery = " SELECT COUNT(*) FROM SCHEDULE  "
					+ " WHERE   DATE(SC.TIME) between  :dateTo AND :dateFrom "
					+ "	AND UPPER(DT.NAME) LIKE CONCAT('%',UPPER(:name),'%') "
					+ "	OR    UPPER(PT.NAME) LIKE CONCAT('%',UPPER(:name),'%') ",
			nativeQuery = true)
	Page<ScheduleInterface> findAllSchedule(@Param("name")String name,
			@Param("dateTo") String dateTo, 
			@Param("dateFrom") String dateFrom,Pageable pageable);
	 
	@Query(value="SELECT SC.REASON, SC.STATUS, SC.TIME, SC.TYPE, SC.DOCTOR_ID as DoctorId, SC.PATIENT_ID as PatientId, DT.NAME AS DoctorName,PT.NAME  AS PatientName , SC.ID "
			+ " FROM SCHEDULE  AS SC "
			+ " INNER JOIN DOCTOR DT ON DT.ID = SC.DOCTOR_ID "
			+ " INNER JOIN PATIENTS PT ON PT.ID = SC.PATIENT_ID "
			+ "	WHERE UPPER(DT.NAME) LIKE CONCAT('%',UPPER(:name),'%') "
			+ "	OR    UPPER(PT.NAME) LIKE CONCAT('%',UPPER(:name),'%') "
			,
			countQuery = " SELECT COUNT(*) FROM SCHEDULE  "
					+ "	WHERE UPPER(DT.NAME) LIKE CONCAT('%',UPPER(:name),'%') "
					+ "	OR    UPPER(PT.NAME) LIKE CONCAT('%',UPPER(:name),'%') ",
			nativeQuery = true)
	Page<ScheduleInterface> findAllScheduleSearchName(@Param("name")String name,Pageable pageable);
	
	
	@Query(value="SELECT SC.REASON, SC.STATUS, SC.TIME, SC.TYPE, SC.DOCTOR_ID as DoctorId, SC.PATIENT_ID as PatientId, DT.NAME AS DoctorName,PT.NAME  AS PatientName , SC.ID "
			+ " FROM SCHEDULE  AS SC "
			+ " INNER JOIN DOCTOR DT ON DT.ID = SC.DOCTOR_ID "
			+ " INNER JOIN PATIENTS PT ON PT.ID = SC.PATIENT_ID "
			+ " WHERE   DATE(SC.TIME) between  :dateTo AND :dateFrom "
			,
			countQuery = " SELECT COUNT(*) FROM SCHEDULE  "
					+ " WHERE   DATE(SC.TIME) between  :dateTo AND :dateFrom ",
			nativeQuery = true)
	Page<ScheduleInterface> findAllScheduleDate( 
			@Param("dateTo") String dateTo, 
			@Param("dateFrom") String dateFrom,Pageable pageable);
	
}
