package com.tampro.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.model.ChartDashBoard;
import com.tampro.model.DataChart;
import com.tampro.model.StatisticalSchedule;
import com.tampro.response.StatisticalResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.PatientService;
import com.tampro.service.ScheduleService;
import com.tampro.utils.Constant;

@RestController
@CrossOrigin(Constant.CROSS_ORIGIN)
@RequestMapping(Constant.API_DASHBOARD)
public class DashBoardController {
	
	@Autowired
	private PatientService patientService;
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private ScheduleService scheduleService;
	
	@GetMapping("/statistical")
	public ResponseEntity<StatisticalResponse> statis(){
 
		int month = LocalDateTime.now().getMonthValue();
		long countPatient = patientService.countByActiveFlag(Constant.ACTIVE);
		long doctorPatient = doctorService.countByActiveFlag(Constant.ACTIVE);
		long scheduleWaiting = scheduleService.countByActiveFlagAndStatusAndTime(Constant.ACTIVE, Constant.WAITING, month);
		long scheduleSuccess = scheduleService.countByActiveFlagAndStatusAndTime(Constant.ACTIVE, Constant.COMPLETE, month);
		
		StatisticalResponse statisticalResponse = new StatisticalResponse(doctorPatient, countPatient, scheduleWaiting, scheduleSuccess);
		return new ResponseEntity<StatisticalResponse>(statisticalResponse,HttpStatus.OK);
	}
	@GetMapping("/chart")
	public ResponseEntity<Object> getChart(){
 
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		List<StatisticalSchedule> chart	=	scheduleService.statisticalScheduleByYear(calendar.get(Calendar.YEAR));
		
		//create chart

		List<ChartDashBoard> charts = createChart(chart);
		return new ResponseEntity<Object>(charts,HttpStatus.OK);
	}
	public List<ChartDashBoard> createChart(List<StatisticalSchedule> chart) {
		Map<Integer, List<DataChart>> mapChart = new HashMap<Integer, List<DataChart>>(); 
		
		for(int i = 1 ; i <= 12 ; i++) { // fake 12 month
			mapChart.put(i, null);
		}
 
		for(Integer key : mapChart.keySet()) { //apply giá trị từ database vào map
			DataChart dataChart2 = new DataChart(2,0);
			DataChart dataChart3 = new DataChart(3,0);
			
			List<DataChart> dataCharts = Arrays.asList(dataChart2, dataChart3);
			
			for(StatisticalSchedule item : chart) {
				 if(item.getMonth() == key) {
					 dataCharts.forEach(result -> {
						 if(result.getStatus() == item.getStatus()) {
							 result.setCount(item.getCount());
						 }
					 });
				 }
			}
			mapChart.put(key, dataCharts);
		}
		
		//format
		List<ChartDashBoard> listChartDashBoard = new ArrayList<ChartDashBoard>();
		
		for(Integer key : mapChart.keySet()) {
			ChartDashBoard chartDashBoard = new ChartDashBoard(key, mapChart.get(key));
			listChartDashBoard.add(chartDashBoard);
		}
		 	
		return listChartDashBoard;
	}
 
}
