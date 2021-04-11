package com.tampro.model.specification;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tampro.entity.Schedule;

public class BookingSpecification implements Specification<Schedule>{
	private final String searchKey;
	private final Date dateTo;
	private final Date dateFrom;
	private final long patientId;
	private final int status;
	
 
	public BookingSpecification(String searchKey, Date dateTo, Date dateFrom, long patientId, int status) {
		super();
		this.searchKey = searchKey;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.patientId = patientId;
		this.status = status;
	}
	
	
	
	@Override
	public Predicate toPredicate(Root<Schedule> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		 
		return null;
	}
	public String getSearchKey() {
		return searchKey;
	}
	public Date getDateTo() {
		return dateTo;
	}
	public Date getDateFrom() {
		return dateFrom;
	}
	public long getPatientId() {
		return patientId;
	}
	public int getStatus() {
		return status;
	}
	 
	
	
	
}
