package com.tampro.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.config.JwtTokenUtil;
import com.tampro.entity.Roles;
import com.tampro.entity.Users;
import com.tampro.request.JwtRequest;
import com.tampro.request.UserRequest;
import com.tampro.response.JwtResponse;
import com.tampro.service.JwtUserDetailsService;
import com.tampro.service.RoleSevice;
import com.tampro.service.UserService;
import com.tampro.utils.ApiStatus;
import com.tampro.utils.Constant;

@RestController
@CrossOrigin(Constant.CROSS_ORIGIN)
public class JwtAuthenticationController {
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    RoleSevice roleService;
    
    @Autowired
	private PasswordEncoder bcryptEncoder;


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Object> saveUser(@RequestBody UserRequest userRequest) throws Exception {
    	boolean flag = userService.isExistEmail(userRequest.getEmail());
    	Map<String, Object> data = new HashMap();
    	if (flag) {
    		data.put("code", ApiStatus.EMAIL_IS_EXIST.getCode());
    		data.put("message", ApiStatus.EMAIL_IS_EXIST.getMessage());
			return new ResponseEntity<Object>(data, HttpStatus.CONFLICT);
		}
		flag = userService.isExistUsername(userRequest.getUsername());
		if (flag) {
			data.put("code", ApiStatus.USERNAME_IS_EXIST.getCode());
    		data.put("message", ApiStatus.USERNAME_IS_EXIST.getMessage());
			return new ResponseEntity<Object>(data, HttpStatus.CONFLICT);
		}
    	
    	Users user = new Users();
    	user.setEmail(userRequest.getEmail());
    	user.setActiveFlag(Constant.ACTIVE);
    	user.setPassword(bcryptEncoder.encode(userRequest.getPassword()));
    	Set<Roles> roles = new HashSet();
    	Roles role = roleService.findById(Constant.ROLE_PATIENT);
    	roles.add(role);
    	user.setRoles(roles);
    	user.setUsername(userRequest.getUsername());
        return ResponseEntity.ok(userService.save(user));
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

    	 
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        
        Users users = userService.findByUsername(userDetails.getUsername());
        
        final String token = jwtTokenUtil.generateToken(userDetails);
 
        return ResponseEntity.ok(new JwtResponse(
        		users.getId()
        		,token
        		,userDetails.getUsername()
        		,userDetails.getAuthorities().toArray()
        		));
    }


    private void authenticate(String username, String password) throws Exception {
        try {
        	//dùng authenticationManager.authenticate để xác thực password và username
        	//nó nhận vào authentication và trả về authencation 
        	// sử dung UsernamePasswordAuthenticationToken 
        	// UsernamePasswordAuthenticationToken là 1 cái bản thiết kế, 
        	//nó extends từ AbstractAuthenticationToken,
        	//AbstractAuthenticationToken implement Authentication
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) { // nếu user bị khoa
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
            //thông tin đăng nhập sai 
        }
    }
}
