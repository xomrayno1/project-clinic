package com.tampro.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.tampro.entity.Patients;
import com.tampro.entity.Schedule;
import com.tampro.exception.ApplicationException;
import com.tampro.model.Pagination;
import com.tampro.model.ScheduleSearchPagination;
import com.tampro.model.search.ScheduleSearch;
import com.tampro.request.NotificationRequest;
import com.tampro.request.SendScheduleRequest;
import com.tampro.request.UpdateStatusScheduleRequest;
import com.tampro.response.APIResponse;
import com.tampro.response.ScheduleResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.NotificationService;
import com.tampro.service.PatientService;
import com.tampro.service.ScheduleService;
import com.tampro.service.UserService;
import com.tampro.utils.ApiStatus;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_SCHEDULE)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class ScheduleController {
	
	@Autowired
	ScheduleService scheduleService;
	@Autowired
	DoctorService doctorService;
	@Autowired
	PatientService patientService;
	@Autowired
	UserService userService;
	@Autowired
	NotificationService notificationService;
	
	
	SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final Logger log = LoggerFactory.getLogger(ScheduleController.class);

 
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
 
	@PostMapping("/send")
	public ResponseEntity<Object> sendSchedule(@RequestBody SendScheduleRequest sendScheduleRequest){
		 
		Patients patients =	patientService.findById(sendScheduleRequest.getPatientId());
		if(patients == null) {
			Map<String, Object> data = new HashMap<>();
			data.put("code" ,ApiStatus.UNREGISTED_INFO.getCode());
			data.put("message" ,ApiStatus.UNREGISTED_INFO.getMessage());		
			return new ResponseEntity<Object>(data,HttpStatus.NOT_FOUND);
		}
		try {
			if(date.parse(sendScheduleRequest.getTime()).before(new Date())) {
				throw new ApplicationException("Ngày đặt đã qua, Vui lòng chọn ngày khác", HttpStatus.BAD_REQUEST);
			}
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
//			List<Schedule> list = 	scheduleService.findByTimeAndStatus(date.parse(sendScheduleRequest.getTime()),Constant.WAITING, sendScheduleRequest.getDoctorId());
//			if(!list.isEmpty()) {
//				throw new ApplicationException("Lịch đã tồn tại", HttpStatus.BAD_REQUEST);
//			}
			int countSche = scheduleService.countByTimeAndStatus(date.parse(sendScheduleRequest.getTime()),Constant.WAITING, sendScheduleRequest.getDoctorId());
			if(countSche >= Constant.MAX_BOONGKING) {
				throw new ApplicationException("Giờ đã đầy", HttpStatus.BAD_REQUEST);
			}
			
			Schedule schedule = new Schedule();
			schedule.setTime(date.parse(sendScheduleRequest.getTime()));
			schedule.setDoctor(doctorService.getOne(sendScheduleRequest.getDoctorId()));
			schedule.setPatients(patients);
			schedule.setType(Constant.RE_EXAMINATION);
			schedule.setStatus(Constant.WAITING);
			schedule.setReason("Gửi lịch hẹn");
			schedule = scheduleService.save(schedule);
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			// send notification
			StringBuilder messageBuilder = new StringBuilder();
			messageBuilder.append(" Bạn nhận được một lịch hẹn khám vào ngày : ")
							.append(sdf.format(schedule.getTime()))
							.append(". Từ ")
							.append(schedule.getDoctor().getDocName());
			
			NotificationRequest notificationRequest = new NotificationRequest();
			notificationRequest.setMessage(messageBuilder.toString());
			notificationRequest.setSeen(Constant.SEEN_FALSE);
			notificationRequest.setSender("Hệ thống");
			notificationRequest.setTitle("Lịch hẹn");
		 
			notificationRequest.setUserId(schedule.getPatients().getUsers().getId());
			notificationService.saveNotification(notificationRequest);
			
			
			Map<String,String> data = new HashMap<String, String>();
			data.put("message", "Gửi thành công");
			return new ResponseEntity<Object>(data,HttpStatus.OK);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			throw new ApplicationException("Gửi thất bại", HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/cancel/{id}")
	public ResponseEntity<Object> cancelBooking(@PathVariable("id") int id){
		Schedule schedule =	scheduleService.findById(id);
		if(schedule == null) {
			throw new ApplicationException("Không tìm lấy lịch với id :"+id, HttpStatus.NOT_FOUND);
		}
		if(schedule.getStatus() !=  Constant.WAITING) {
			Map<String, Object> data = new HashMap<>();
			 
			data.put("message" ,"Lịch đã hoàn thành");	
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (schedule.getTime().before(new Date())) {
			throw new ApplicationException("Lịch đã quá hạn", HttpStatus.BAD_REQUEST);
		} // chưa test

		// nếu hôm nay khám mà hôm nay huỷ thì => false
		if (schedule.getTime().after(new Date())) {
			throw new ApplicationException("Bạn không thể huỷ lịch khám trong ngày", HttpStatus.BAD_REQUEST);
		} // chưa test
		
		scheduleService.cancel(schedule);
		
		Map<String,String> data = new HashMap<String, String>();
		data.put("message", "Huỷ thành công ");
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		// send notification
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append(" Lịch khám của bạn đã bị huỷ : ")
						.append(". Từ bác sĩ :")
						.append(schedule.getDoctor().getDocName());
		
		NotificationRequest notificationRequest = new NotificationRequest();
		notificationRequest.setMessage(messageBuilder.toString());
		notificationRequest.setSeen(Constant.SEEN_FALSE);
		notificationRequest.setSender("Hệ thống");
		notificationRequest.setTitle("Huỷ lịch khám");
	 
		notificationRequest.setUserId(schedule.getPatients().getUsers().getId());
		notificationService.saveNotification(notificationRequest);
		
		
		return new ResponseEntity<Object>(data,HttpStatus.OK);
	}
}
