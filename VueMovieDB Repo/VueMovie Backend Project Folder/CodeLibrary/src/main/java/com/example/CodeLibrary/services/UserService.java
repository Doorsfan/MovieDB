package com.example.CodeLibrary.services;

import com.example.CodeLibrary.entitites.User;
import com.example.CodeLibrary.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


/**
 * When we wish to denote something as being the delegated Service handler, we put a @Service annotation.
 * This is to denote the parts of the respective layer that passes on requests to the Repository, and is
 * wired/mapped to the Repository through the @Autowired annotation, along with the Repo class notation.
 */
@Service
public class UserService {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Methods in the Service layer enact as methods to call when you wish to further down the request unto the
     * Repo to persist in the DB and get a response from there, which then returns it back to the calling Controllers.
     */
    public List<User> findAllUsers() {
        return (List<User>) userRepo.findAll();
    }

    public Optional<User> findOneUser(int id) {
        Optional<User> user = userRepo.findById(id);

        return user;
    }

    public String addFollowerForUser(String username) {
        userRepo.updateFollowsOfUser(username);
        return userRepo.findFollowersForUserByUsername(username);
    }

    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public List<User> getUsersContaining(String username) {
        return userRepo.findByUsernameContainingIgnoreCase(username);
    }

    public User saveNewUserToDB(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String deleteUserByID(int id) {
        try {
            userRepo.deleteById(id);
            return "Success";
        } catch (Exception e) {
            return "Failed";
        }
    }

    public String updateUser(User user) {
        try {
            userRepo.save(user);
            return "Success";
        } catch (Exception e) {
            return "Failed";
        }
    }

}
