package com.tampro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Booking;

@Repository
public interface ScheduleRepository extends JpaRepository<Booking, Long>{

}
