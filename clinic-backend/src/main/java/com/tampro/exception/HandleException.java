package com.tampro.exception;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
		ErrorDetails errorDetails = 
				new ErrorDetails("Validated failed", new Date(), HttpStatus.BAD_REQUEST.value(),request.getDescription(false) );
		return new ResponseEntity<Object>(errorDetails,HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(ApplicationException.class)
	private ResponseEntity<ErrorDetails> handleApplicationException(ApplicationException ae,
			WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(ae.getMsg(), new Date(), ae.getStatus().value(),request.getDescription(false) );
		return new ResponseEntity<ErrorDetails>(errorDetails,ae.getStatus());
	}
}
