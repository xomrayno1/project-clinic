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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Users;
import com.tampro.model.Pagination;
import com.tampro.response.APIResponse;
import com.tampro.response.UserResponse;
import com.tampro.service.UserService;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_USER)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class UserController {
	@Autowired
	UserService userService;
	
	@GetMapping
	public ResponseEntity<APIResponse> getAllSearchPagination(
			@RequestParam("search") String search, 
			@RequestParam("limit") int limit,
			@RequestParam("page") int page){
		
		Pageable pageable =	PageRequest.of(page - 1, limit);
		//get value
		Page<Users> users = userService.findAllSearchPagination(search, pageable);
		//convert entity to response
		List<UserResponse> data = new ArrayList<UserResponse>();
		for(Users user : users.getContent()) {
			UserResponse userReponse = AppUtils.convertUserEntityToResponse(user);
			data.add(userReponse);
		}
		//create api response
		APIResponse apiResponse = new APIResponse(data,
									new Pagination(users.getTotalElements(), limit, page));
		return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
	}

}
