package com.tampro.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Schedule;
import com.tampro.exception.ApplicationException;
import com.tampro.model.Pagination;
import com.tampro.model.ScheduleSearchPagination;
import com.tampro.model.search.ScheduleSearch;
import com.tampro.request.UpdateStatusScheduleRequest;
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
	
 
	@PostMapping(value = Constant.API_GET_SCHEDULE_FILTER_PAGINATION)
	public ResponseEntity<APIResponse> findAllSearchFilterPagination(
			@RequestBody ScheduleSearchPagination ssp
			){
		Pageable pageable =	PageRequest.of(ssp.getPage() - 1, ssp.getLimit());
		Page<Schedule> pageData = scheduleService.findAllSchedulePaginationFilter(
				new ScheduleSearch(ssp.getKeySearch(),ssp.getDateFrom() 
						,ssp.getDateTo() , ssp.getType(), ssp.getStatus()
						,ssp.getKeyId(),ssp.getKey())
				, pageable);
		List<ScheduleResponse> data = new ArrayList<ScheduleResponse>();
		for(Schedule schedule  : pageData.getContent()) {
			ScheduleResponse response = AppUtils.convertScheduleEntityToResponse(schedule);
			data.add(response);
		}
		APIResponse apiResponse = new APIResponse(
					data, 
					new Pagination(pageData.getTotalElements(),ssp.getLimit(), ssp.getPage())
			);
		return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteSchedule(@PathVariable("id") long id){
		//kiểm tra xem có tồn tại không
		Schedule schedule = scheduleService.findById(id);
		if(schedule == null ) {
			throw new ApplicationException("Không tìm thấy lịch với id là : "+ id, HttpStatus.NOT_FOUND);
		}
		// check xem status có hoàn thành chưa
		try {
			scheduleService.delete(schedule);
			Map<String, String> data = new HashMap();
			data.put("message", "Xóa thành công");
			return new ResponseEntity<Object>(data, HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			throw new ApplicationException("Xóa thất bại", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/status/update")
	public ResponseEntity<Object> updateStatusSchedule(@RequestBody UpdateStatusScheduleRequest updateStatusScheduleRequest){
		 
		try {
			Schedule schedule = scheduleService.findById(updateStatusScheduleRequest.getScheduleId());
			Map<String, Object> data = new HashMap();
			if(schedule == null) {
				throw new ApplicationException("Không tìm thấy lịch",HttpStatus.NOT_FOUND);
			}
			schedule.setStatus(updateStatusScheduleRequest.getStatus());
			scheduleService.save(schedule);
			//scheduleService.updateStatusSchedule(updateStatusScheduleRequest);
			data.put("message", "Cập nhật thành công");
			return new ResponseEntity(data,HttpStatus.OK);
		}catch(Exception e) {
			throw new ApplicationException("Cập nhật thất bại",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
 

}