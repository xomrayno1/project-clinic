package com.tampro.exception;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class HandleException extends ResponseEntityExceptionHandler{

  
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		// TODO Auto-generated method stub
		 BindingResult result = ex.getBindingResult();
		 List<org.springframework.validation.FieldError> fieldErrors = result.getFieldErrors();
		 
		 ErrorDetails errorDetails = 
					new ErrorDetails("Validated failed", new Date(), HttpStatus.BAD_REQUEST.value(),request.getDescription(false) );
		 
		 if(!fieldErrors.isEmpty()) {
			 Map<String,String> field = new HashMap<>();
			 fieldErrors.forEach(item -> {
				 field.put(item.getField(), item.getDefaultMessage());
			 });
			 errorDetails.setFieldErrors(field);
		 }
		return new ResponseEntity<Object>(errorDetails, HttpStatus.BAD_REQUEST);
	}
	@Override
		protected ResponseEntity<Object> handleBindException(BindException ex,
				HttpHeaders headers, HttpStatus status,
				WebRequest request) {
			// TODO Auto-generated method stub
		 BindingResult result = ex.getBindingResult();
		 List<org.springframework.validation.FieldError> fieldErrors = result.getFieldErrors();
		 
		 ErrorDetails errorDetails = 
					new ErrorDetails("Validated failed", new Date(), HttpStatus.BAD_REQUEST.value(),request.getDescription(false) );
		 
		 if(!fieldErrors.isEmpty()) {
			 Map<String,String> field = new HashMap<>();
			 fieldErrors.forEach(item -> {
				 field.put(item.getField(), item.getDefaultMessage());
			 });
			 errorDetails.setFieldErrors(field);
		 }
		   
		return new ResponseEntity<Object>(errorDetails, HttpStatus.BAD_REQUEST);
		}
	@ExceptionHandler(ApplicationException.class)
	private ResponseEntity<ErrorDetails> handleApplicationException(ApplicationException ae,
			WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(ae.getMsg().toString(), new Date(), ae.getStatus().value(),request.getDescription(false) );
		return new ResponseEntity<ErrorDetails>(errorDetails,ae.getStatus());
	}
	
	
}
