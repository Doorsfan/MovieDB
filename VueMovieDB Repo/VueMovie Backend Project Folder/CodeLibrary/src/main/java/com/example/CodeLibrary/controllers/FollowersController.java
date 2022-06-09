package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Follower;
import com.example.CodeLibrary.services.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RestController allows us to map RequestBody to the respective Rest Path
 * and the RequestMapping allows us to denote what mapping of a path we wish
 * to have - along with allowed methods.
 */
@RestController
@RequestMapping(value = "/rest", method = RequestMethod.POST)
public class FollowersController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    FollowerService followerService;

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/followers/addNewFollower")
    public Follower addNewfollow(@RequestBody Follower newFollower) {
        return followerService.addFollower(newFollower);
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @GetMapping("/followers/getFollowersOf/{targetusername}")
    public List<Follower> getFollowers(@PathVariable String targetusername) {
        return followerService.getFollowersForUser(targetusername);
    }

    @GetMapping("/followers/getOwnFollowersOf/{followersusername}")
    public List<Follower> getMyOwnFollowers(@PathVariable String followersusername) {
        return followerService.findOwnFollowersFor(followersusername);
    }
}
