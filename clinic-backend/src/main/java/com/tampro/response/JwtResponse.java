package com.tampro.response;

import java.io.Serializable;

public class JwtResponse implements Serializable{
	private static final long serialVersionUID = -8091879091924046844L;
	private final long id;
	private final String token;
	private final String username;
	private final Object[] roles;
	
	
	 


	public JwtResponse(long id, String token, String username, Object[] roles) {
		 
		this.token = token;
		this.username = username;
		this.roles = roles;
		this.id =  id;
		 
	}





	public static long getSerialversionuid() {
		return serialVersionUID;
	}





	public String getUsername() {
		return username;
	}





	public Object[] getRoles() {
		return roles;
	}





 



	public long getId() {
		return id;
	}





	public String getToken() {
		return token;
	}
	
	
	 
}
