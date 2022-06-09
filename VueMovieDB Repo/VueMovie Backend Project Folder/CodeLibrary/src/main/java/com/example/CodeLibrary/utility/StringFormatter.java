package com.example.CodeLibrary.utility;

public class StringFormatter {

    public static String removeFirstAndLastChar(String myString) {
        return myString.substring(1, myString.length() - 1);
    }
}
