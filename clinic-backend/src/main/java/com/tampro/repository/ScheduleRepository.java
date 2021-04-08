package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Schedule;
import com.tampro.model.ScheduleInterface;

@Repository
public interface ScheduleRepository extends PagingAndSortingRepository<Schedule, Long>{
	
	@Query(value="SELECT SC.REASON, SC.STATUS, SC.TIME, SC.TYPE, SC.DOCTOR_ID as DoctorId, SC.PATIENT_ID as PatientId, DT.NAME AS DoctorName,PT.NAME  AS PatientName , SC.ID "
			+ " FROM SCHEDULE  AS SC "
			+ " INNER JOIN DOCTOR DT ON DT.ID = SC.DOCTOR_ID "
			+ " INNER JOIN PATIENTS PT ON PT.ID = SC.PATIENT_ID ",
			countQuery = " SELECT COUNT(*) FROM SCHEDULE  AS SC ",
			nativeQuery = true)
	Page<ScheduleInterface> findAllSchedule(Pageable pageable);
	 
}
