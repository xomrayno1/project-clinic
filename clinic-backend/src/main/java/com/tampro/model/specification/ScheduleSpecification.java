package com.tampro.model.specification;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

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
import com.tampro.entity.Schedule;
 
public class ScheduleSpecification implements Specification<Schedule> {

	private static final long serialVersionUID = 1L;
	private final String searchKey;
	private final Date dateTo;
	private final Date dateFrom;
	private final int type;
	private final int status;
	private final String key; //doctor  , patient  
	private final long keyId; //doctorId patient id
	
	 
	
	public ScheduleSpecification(String searchKey, Date dateFrom, Date dateTo, int type, int status, String key,
			long keyId) {
		super();
		this.searchKey = searchKey;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.type = type;
		this.status = status;
		this.key = key;
		this.keyId = keyId;
	}


	public ScheduleSpecification(String searchKey, Date dateFrom, Date dateTo, int type, int status) {
		this.searchKey = searchKey;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.type = type;
		this.status = status;
		this.key = "";
		this.keyId = 0;
	}
	 
	@Override
	public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		
		Join<Schedule, Doctor> doctor  =  root.join("doctor", JoinType.INNER); //entity
		Join<Schedule, Patients> patient = root.join("patients", JoinType.INNER); //entity
		 
		List<Predicate> predicates = new LinkedList<>();
		
		if(searchKey != null && !searchKey.trim().isEmpty()) {
			String key = '%' + searchKey + '%';
			Predicate prePatientName = criteriaBuilder.like(doctor.get("docName"), key);//docName property jpa
			Predicate preDoctorName = criteriaBuilder.like(patient.get("patiName"), key);//patiName property jpa
			Predicate  predicate = criteriaBuilder.or(prePatientName,preDoctorName);
			predicates.add(predicate);
		}
		
		if( dateTo != null  && dateFrom != null) {		    //root.<Date>get("time") //criteriaBuilder.function("date", null, null)
			Predicate predicate = criteriaBuilder.between(criteriaBuilder.function("date", Date.class, root.<Date>get("time")), dateFrom, dateTo);
			predicates.add(predicate);
		}
		//Su dung function SQL
		//Criteria API defines function expression to execute native SQL functions in the CriteriaBuilder interface as follows:
		//<T> Expression<T> function(String name, Class<T> type, Expression<?>... args);
		//where name is the name of the SQL function, type is the expected return type and args is a variable list of arguments (if any).
		//Here is an example how to use it in a Criteria query:
		//link : https://stackoverflow.com/questions/40007354/jpa-criteria-api-how-to-retrieve-date-in-mm-dd-yyyy-format
 
		if(type != 0) {
			Predicate preType = criteriaBuilder.equal(root.get("type"), type);
			predicates.add(preType);
		}
		if(status != 0) {
			Predicate preStatus = criteriaBuilder.equal(root.get("status"), status);
			predicates.add(preStatus);
		}
		Authentication  authentication = SecurityContextHolder.getContext().getAuthentication();
		String authority  = authentication.getAuthorities().iterator().next().toString();
		Predicate predicate;
		 if(authority.equals("ROLE_DOCTOR")){ //user id
			 System.out.println(authority + "Filter");
			 predicate = criteriaBuilder.equal(doctor.get("users"), keyId);
			 predicates.add(predicate);
		 }else if(authority.equals("ROLE_PATIENT")){
			 System.out.println(authority + "Filter");
			 predicate = criteriaBuilder.equal(patient.get("users"),  keyId);
			 predicates.add(predicate);
		 }
		
		query.orderBy(criteriaBuilder.asc(root.get("status")),criteriaBuilder.desc(root.get("id")));
		
		Predicate preActive = criteriaBuilder.equal(root.get("activeFlag"),  1);
		predicates.add(preActive);
		
		return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
	}

}
