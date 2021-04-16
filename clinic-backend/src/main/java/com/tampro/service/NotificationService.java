package com.tampro.service;

import java.util.List;

import com.tampro.entity.Notification;
import com.tampro.entity.Users;
import com.tampro.request.NotificationRequest;

public interface NotificationService {
	
	Notification findById(long id);
	
	List<Notification> findByUsers(Users users);
	
	void save(Notification notification);
	
	void saveNotification(NotificationRequest notificationRequest);
}
