package com.tampro.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Notification;
import com.tampro.entity.Users;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long>{
 
	List<Notification> findByUserReceiver(Users users);
 

}
