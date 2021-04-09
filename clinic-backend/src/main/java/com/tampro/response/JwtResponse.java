package com.tampro.response;

import java.io.Serializable;

public class JwtResponse implements Serializable{
	private static final long serialVersionUID = -8091879091924046844L;
	private final String token;
	private final String username;
	private final Object[] roles;
	
	
	 


	public JwtResponse(String token, String username, Object[] roles) {
		super();
		this.token = token;
		this.username = username;
		this.roles = roles;
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





	public String getToken() {
		return token;
	}
	 
}
