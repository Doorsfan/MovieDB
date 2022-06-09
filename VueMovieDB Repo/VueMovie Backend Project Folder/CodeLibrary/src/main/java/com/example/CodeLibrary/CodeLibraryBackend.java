package com.example.CodeLibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.example"})
public class CodeLibraryBackend {

    public static void main(String[] args) {
        SpringApplication.run(CodeLibraryBackend.class, args);

    }

}
