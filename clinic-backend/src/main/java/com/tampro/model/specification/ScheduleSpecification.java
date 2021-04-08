package com.tampro.model.specification;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.tampro.entity.Schedule;
import com.tampro.model.Status;
import com.tampro.model.Type;
 
public class ScheduleSpecification implements Specification<Schedule> {
	private final String searchKey;
	private final String dateTo;
	private final String dateFrom;
	private final Type type;
	private final Status status;
	
	public ScheduleSpecification(String searchKey, String dateTo, String dateFrom, Type type, Status status) {
		this.searchKey = searchKey;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.type = type;
		this.status = status;
	}

	@Override
	public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
		// TODO Auto-generated method stub
		List<Predicate> predicates = new LinkedList<>();
		if(searchKey != null && !searchKey.trim().isEmpty()) {
			String key = '%' + searchKey + '%';
			Predicate predicate = criteriaBuilder.like(root.get("name"), key);
			predicates.add(predicate);
		}
		
		return criteriaBuilder.and(predicates.toArray(new Predicate[] {}));
	}

}
