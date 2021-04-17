package com.tampro.model.specification;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.tampro.entity.Doctor;
import com.tampro.entity.Patients;
import com.tampro.entity.Results;
import com.tampro.entity.Schedule;

public class ResultSpecification implements Specification<Results>{
	private final String searchKey;
	private final Date dateFrom;
	private final Date dateTo;
	private final long userId;

	
	public ResultSpecification(String searchKey, Date dateFrom, Date dateTo,long userId) {
		super();
		this.searchKey = searchKey;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.userId = userId;

	}


	@Override
	public Predicate toPredicate(Root<Results> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		

		Join<Results, Doctor> doctor  =  root.join("doctor", JoinType.INNER); //entity
		Join<Results, Patients> patient = root.join("patients", JoinType.INNER); //entity
		Join<Results, Schedule> schedule = root.join("schedule", JoinType.INNER); //entity
		 
		List<Predicate> predicates = new LinkedList<>();
		
		if(searchKey != null && !searchKey.trim().isEmpty()) {
			String key = '%' + searchKey + '%';
			Predicate prePati = criteriaBuilder.like(patient.get("patiName"), key);//patiName property jpa
			predicates.add(prePati);
		}
		if( dateTo != null  && dateFrom != null) {		    //root.<Date>get("time") //criteriaBuilder.function("date", null, null)
			Predicate predicate = criteriaBuilder.between(criteriaBuilder.function("date", Date.class, schedule.<Date>get("time")), dateFrom, dateTo);
			predicates.add(predicate);							//date la ten cua 1 function sql
		}
		//Su dung function SQL
		//Criteria API defines function expression to execute native SQL functions in the CriteriaBuilder interface as follows:
		//<T> Expression<T> function(String name, Class<T> type, Expression<?>... args);
		//where name is the name of the SQL function, type is the expected return type and args is a variable list of arguments (if any).
		//Here is an example how to use it in a Criteria query:
		//link : https://stackoverflow.com/questions/40007354/jpa-criteria-api-how-to-retrieve-date-in-mm-dd-yyyy-format
 	
		Authentication  authentication = SecurityContextHolder.getContext().getAuthentication();
		String authority  = authentication.getAuthorities().iterator().next().toString();
		if(authority.equals("ROLE_DOCTOR")) {
			Predicate preDoc = criteriaBuilder.equal(doctor.get("users"), userId);
			predicates.add(preDoc);
		}else if(authority.equals("ROLE_PATIENT")) {
			Predicate prePatient = criteriaBuilder.equal(patient.get("users"), userId);
			predicates.add(prePatient);
		} 
  
		query.orderBy(criteriaBuilder.desc(root.get("id")));
		 
		Predicate preActive = criteriaBuilder.equal(root.get("activeFlag"),  1);
		predicates.add(preActive);
		
		
		
		return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
	}


	public String getSearchKey() {
		return searchKey;
	}


	public Date getDateFrom() {
		return dateFrom;
	}


	public Date getDateTo() {
		return dateTo;
	}


	public long getUserId() {
		return userId;
	}


	
	
}
