package com.tampro.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Roles;
import com.tampro.entity.Users;
import com.tampro.exception.ApplicationException;
import com.tampro.model.Pagination;
import com.tampro.request.UserRequest;
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
	public ResponseEntity<APIResponse> getAllSearchPagination(@RequestParam("search") String search,
			@RequestParam("limit") int limit, @RequestParam("page") int page
			) {
		Pageable pageable = PageRequest.of(page - 1, limit);
		// get value
		Page<Users> users = userService.findAllSearchPagination(search, pageable);
		// convert entity to response
		List<UserResponse> data = new ArrayList<UserResponse>();
		for (Users user : users.getContent()) {
			UserResponse userReponse = AppUtils.convertUserEntityToResponse(user);
			data.add(userReponse);
		}
		// create api response
		APIResponse apiResponse = new APIResponse(data, new Pagination(users.getTotalElements(), limit, page));
		return new ResponseEntity<APIResponse>(apiResponse, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> getById(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			throw new ApplicationException("users not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		UserResponse userResponse = AppUtils.convertUserEntityToResponse(users);
		return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			throw new ApplicationException("users not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		try {
			userService.delete(users);
		} catch (Exception e) {
			throw new ApplicationException("Delete failed", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@GetMapping("/restore/{id}")
	public ResponseEntity<Void> restoreUser(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			throw new ApplicationException("users not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		try {
			userService.restore(users);
		} catch (Exception e) {
			throw new ApplicationException("Restore failed", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
		boolean flag = userService.isExistEmail(userRequest.getEmail());

		if (flag) {
			throw new ApplicationException("Email is exist", HttpStatus.CONFLICT);
		}
		flag = userService.isExistUsername(userRequest.getUsername());
		if (flag) {
			throw new ApplicationException("Username is exist", HttpStatus.CONFLICT);
		}
		try {
			Users users = new Users();
			users.setEmail(userRequest.getEmail());
			users.setPassword(userRequest.getPassword());
			Set<Roles> roles = new HashSet<>();
			for (Long id : userRequest.getRoles()) {
				Roles role = new Roles(id);
				roles.add(role);
			}
			users.setRoles(roles);
			users.setUsername(userRequest.getUsername());
			users = userService.save(users);
			UserResponse userResponse = AppUtils.convertUserEntityToResponse(users);
			return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Create failed", HttpStatus.CONFLICT);
		}

	}
	@PutMapping
	public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest) {
		Users users = userService.findById(userRequest.getId());
		if(users == null) {
			throw new ApplicationException("user not found with id : "+ userRequest.getId(), HttpStatus.NOT_FOUND);
		}
		boolean flag = userService.isExistEmail(userRequest.getEmail());
		if (flag) {
			if(!users.getEmail().equals(userRequest.getEmail())) {
				throw new ApplicationException("Email is exist", HttpStatus.CONFLICT);
			} 
		}
		flag = userService.isExistUsername(userRequest.getUsername());
		if (flag) {
			if(!users.getUsername().equals(userRequest.getUsername())) {
				throw new ApplicationException("Username is exist", HttpStatus.CONFLICT);
			} 
		}
		try {
			users.setEmail(userRequest.getEmail());
			users.setPassword(userRequest.getPassword());
			Set<Roles> roles = new HashSet<>();
			for (Long id : userRequest.getRoles()) {
				Roles role = new Roles(id);
				roles.add(role);
			}
			users.setRoles(roles);
			users.setId(userRequest.getId());
			users.setUsername(userRequest.getUsername());
			users = userService.save(users);
			UserResponse userResponse = AppUtils.convertUserEntityToResponse(users);
			return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Update failed", HttpStatus.CONFLICT);
		}

	}
}
