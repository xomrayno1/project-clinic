package com.tampro.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Notification;
import com.tampro.entity.Users;
import com.tampro.exception.ApplicationException;
import com.tampro.request.UpdateSeenNotification;
import com.tampro.response.NotificationResponse;
import com.tampro.service.NotificationService;
import com.tampro.service.UserService;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_NOTIFICATION)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class NotificationController {
	
	@Autowired
	NotificationService notificationService;
	@Autowired
	UserService userService;
 
	
	@GetMapping
	public ResponseEntity<Object> getAll(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users users =	userService.findByUsername(authentication.getName());
		List<Notification> notifications = 	notificationService.findByUsers(users);
		List<NotificationResponse> responses = 	new ArrayList<NotificationResponse>();
		for(Notification notification : notifications) {
			NotificationResponse notificationResponse = AppUtils.convertNotificationEntityToResponse(notification);
			responses.add(notificationResponse);
		}
		Map<String, Object>  data = new HashMap<>();
		data.put("data", responses);
		return new ResponseEntity<Object>(data,HttpStatus.OK);
	}
	
	@PutMapping("/seen/update")
	public ResponseEntity<?> updateStatusNotification(@RequestBody UpdateSeenNotification updateSeenNotification){
		 
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		Users users =	userService.findByUsername(authentication.getName());
		Notification notification = notificationService.findById(updateSeenNotification.getNotiId());
		if(notification == null) {
			throw new ApplicationException("Không tìm thấy thông báo", HttpStatus.NOT_FOUND);
		}
		notification.setSeen(Constant.SEEN_TRUE);
		notificationService.save(notification);
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
}
