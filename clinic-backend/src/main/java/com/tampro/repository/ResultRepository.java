package com.tampro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Results;
import com.tampro.entity.Schedule;

@Repository
public interface ResultRepository extends JpaRepository<Results, Long>, 
											JpaSpecificationExecutor<Results>{
	
	
	Results findBySchedule(Schedule schedule);

}
