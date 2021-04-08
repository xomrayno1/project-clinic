package com.tampro.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.model.Pagination;
import com.tampro.model.ScheduleInterface;
import com.tampro.model.ScheduleSearch;
import com.tampro.model.ScheduleSearchPagination;
import com.tampro.response.APIResponse;
import com.tampro.response.ScheduleResponse;
import com.tampro.service.ScheduleService;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_SCHEDULE)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class ScheduleController {
	
	@Autowired
	ScheduleService scheduleService;
	
	@PostMapping(Constant.API_GET_SCHEDULE_FILTER_PAGINATION)
	public ResponseEntity<APIResponse> findAllSearchFilterPagination(
			@RequestBody ScheduleSearchPagination ssp
			){
		Pageable pageable =	PageRequest.of(ssp.getPage() - 1, ssp.getLimit());
		Page<ScheduleInterface> scheduleInterfaces = scheduleService.findAllSchedule(
			new ScheduleSearch(ssp.getKeySearch(), ssp.getDateTo(), ssp.getDateFrom()), pageable
					);
		List<ScheduleResponse> data = new ArrayList<ScheduleResponse>();
		for(ScheduleInterface si  : scheduleInterfaces.getContent()) {
			ScheduleResponse response = AppUtils.convertScheduleEntityToResponse(si);
			data.add(response);
		}
		APIResponse apiResponse =
			new APIResponse(
					data, 
					new Pagination(scheduleInterfaces.getTotalElements(),ssp.getLimit(), ssp.getPage())
					);
		return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
	}
	
	

}
