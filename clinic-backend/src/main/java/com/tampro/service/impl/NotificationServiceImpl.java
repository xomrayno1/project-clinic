package com.tampro.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tampro.entity.Notification;
import com.tampro.entity.Users;
import com.tampro.repository.NotificationRepository;
import com.tampro.repository.UserRepository;
import com.tampro.request.NotificationRequest;
import com.tampro.service.NotificationService;
import com.tampro.utils.Constant;

@Service
public class NotificationServiceImpl implements NotificationService{
	@Autowired
	NotificationRepository notificationRepo;
	@Autowired
	UserRepository userRepo;

	@Override
	public Notification findById(long id) {
		// TODO Auto-generated method stub
		return notificationRepo.findById(id).orElse(null);
	}

	@Override
	public List<Notification> findByUsers(Users users) {
		// TODO Auto-generated method stub
		return notificationRepo.findByUserReceiverOrderByIdDesc(users);
	}

	@Override
	public void save(Notification notification) {
		// TODO Auto-generated method stub
		notificationRepo.save(notification);
	}

	@Override
	public void saveNotification(NotificationRequest notificationRequest) {
		// TODO Auto-generated method stub
		Notification notification = new Notification();
		notification.setDate(new Date());
		notification.setMessage(notificationRequest.getMessage());
		notification.setSeen(Constant.SEEN_FALSE);
		notification.setSender(notificationRequest.getSender());
		notification.setTitle(notificationRequest.getTitle());
		 
		notification.setUserReceiver(userRepo.getOne(notificationRequest.getUserId()));
		notificationRepo.save(notification);
	}

}
