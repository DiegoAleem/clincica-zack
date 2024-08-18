package com.zack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ZackApplication extends SpringBootServletInitializer{
    
    
	public static void main(String[] args) throws Exception {
		SpringApplication.run(ZackApplication.class, args); 
	}
	
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(ZackApplication.class);
    }
	
	
}
