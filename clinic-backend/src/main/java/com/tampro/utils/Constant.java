package com.tampro.utils;

public class Constant {

	
	public static final String API_PREFIX = "/api/v1";
	public static final String API_PORT = "http://localhost:8080";
	//doctor
	public static final String API_DOCTOR = API_PREFIX + "/doctors";
	public static final String API_GET_ALL_DOCTOR ="/getAll";
	
	 
	public static final String API_USER = API_PREFIX + "/users";
	public static final String API_PATIENT = API_PREFIX + "/patients";
	
	public static final String CROSS_ORIGIN = "http://localhost:3000";
	//schedules
	public static final String API_SCHEDULE = API_PREFIX + "/schedules";
	public static final String API_GET_SCHEDULE_FILTER_PAGINATION ="/search_filter_pagination";
	
	public static final String UPLOAD_IMAGE = "C:\\Users\\Administrator\\git\\project-clinic\\clinic-backend\\src\\main\\resources\\static\\upload\\";
	 
	public static final int ACTIVE = 1;
	public static final int NOT_ACTIVE = 2;
	
	 
	public static final int AVAILABLE = 1;
	public static final int NOT_AVAILABLE = 2;
}
