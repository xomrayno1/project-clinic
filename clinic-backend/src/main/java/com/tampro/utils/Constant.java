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
	
	//booking
	public static final String API_BOOKING = API_PREFIX + "/booking";
	public static final String API_GET_BOOKING_FILTER_PAGINATION = API_PREFIX + "/booking/search_filter_pagination";
 
	//result
	public static final String API_RESULTS = API_PREFIX + "/results";
	
	public static final String UPLOAD_IMAGE = "C:\\Users\\Administrator\\git\\project-clinic\\clinic-backend\\src\\main\\resources\\static\\upload\\";
	 
	public static final int ACTIVE = 1;
	public static final int NOT_ACTIVE = 2;
	
	 
	public static final int AVAILABLE = 1;
	public static final int NOT_AVAILABLE = 2;
	
	public static final int FIRST_EXAMINATION = 1;
	public static final int RE_EXAMINATION = 2;
	
	public static final int WAITING = 1;
	public static final int COMPLETE = 2;
	public static final int CANCEL = 3;
	
	//role
	public static final int ROLE_ADMIN = 1;
	public static final int ROLE_DOCTOR = 2;
	public static final int ROLE_PATIENT = 3;
	
	//Gender
	
	public static final int GENDER_MALE = 0;
	public static final int GENDER_FEMALE = 1;
}
