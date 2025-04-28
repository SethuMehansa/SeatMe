package edu.icet.ecom.config;

import org.jasypt.util.text.BasicTextEncryptor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config {
    @Bean
    public ModelMapper getMapper(){
        return new ModelMapper();
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
    @Bean
    public BasicTextEncryptor textEncryptor() {
        BasicTextEncryptor encryptor = new BasicTextEncryptor();
        encryptor.setPassword("1234"); // 🔥 Secret key for encryption
        return encryptor;
    }
}