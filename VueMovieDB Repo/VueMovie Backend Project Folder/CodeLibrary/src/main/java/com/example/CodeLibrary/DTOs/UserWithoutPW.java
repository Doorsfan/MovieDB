package com.example.CodeLibrary.DTOs;

/**
 * A DTO is just a Object that represents another entity/class, but with certain attributes omitted.
 * In this case, the PW of a User.
 */
public class UserWithoutPW {
    String username, profileURL;
    Integer id;

    public UserWithoutPW(Integer id, String username, String profileURL) {
        this.id = id;
        this.username = username;
        this.profileURL = profileURL;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileURL() {
        return profileURL;
    }

    public void setProfileURL(String profileURL) {
        this.profileURL = profileURL;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "UserWithoutPW{" +
                "username='" + username + '\'' +
                ", profileURL='" + profileURL + '\'' +
                ", id=" + id +
                '}';
    }
}
