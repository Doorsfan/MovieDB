package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.DTOs.UserWithoutPW;
import com.example.CodeLibrary.entitites.User;
import com.example.CodeLibrary.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * RestController allows us to map RequestBody to the respective Rest Path
 * and the RequestMapping allows us to denote what mapping of a path we wish
 * to have - along with allowed methods.
 */
@RestController
@RequestMapping(value = "/rest", method = RequestMethod.POST)
public class UsersController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getOneUser(@PathVariable int id) {
        return userService.findOneUser(id);
    }

    @GetMapping("/users/username/{username}/{password}")
    public UserWithoutPW getUsersContaining(@PathVariable String username, @PathVariable String password) {
        UserWithoutPW userDTO = new UserWithoutPW(0, "", "");
        List<User> relevantUsers = userService.getUsersContaining(username);
        for (int i = 0; i < relevantUsers.size(); i++) {
            if (relevantUsers.get(i).getUsername().equals(username) && passwordEncoder.matches(password, relevantUsers.get(i).getPassword())) {
                userDTO.setId(relevantUsers.get(i).getId());
                userDTO.setUsername(relevantUsers.get(i).getUsername());
                userDTO.setProfileURL(relevantUsers.get(i).getImage());
            }
        }
        return userDTO;
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     * and RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/users/register/{username}/{password}")
    public UserWithoutPW createNewUser(@PathVariable String username, @PathVariable String password, @RequestBody String image) {
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setImage(image.substring(1, image.length() - 1));
        try {
            newUser = userService.saveNewUserToDB(newUser);
            UserWithoutPW relevantUser = new UserWithoutPW(newUser.getId(), newUser.getUsername(), newUser.getImage());
            return relevantUser;
        } catch (Exception e) {
            newUser.setUsername("");
        }
        return new UserWithoutPW(newUser.getId(), newUser.getUsername(), newUser.getImage());
    }

    @DeleteMapping("/users/{id}")
    public String deleteUserByID(@PathVariable int id) {
        return userService.deleteUserByID(id);
    }

    @PutMapping("/users/addFollower/{username}")
    public String addFollower(@PathVariable String username) {
        return userService.addFollowerForUser(username);
    }

    @PutMapping("/users")
    public String updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }


}



