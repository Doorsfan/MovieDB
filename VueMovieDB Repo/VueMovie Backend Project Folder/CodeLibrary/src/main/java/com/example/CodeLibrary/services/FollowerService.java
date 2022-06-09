package com.example.CodeLibrary.services;

import com.example.CodeLibrary.entitites.Follower;
import com.example.CodeLibrary.repositories.FollowerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * When we wish to denote something as being the delegated Service handler, we put a @Service annotation.
 * This is to denote the parts of the respective layer that passes on requests to the Repository, and is
 * wired/mapped to the Repository through the @Autowired annotation, along with the Repo class notation.
 */
@Service
public class FollowerService {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired // Exempelvis för att importera spring klasser som @Service, @Repository etc
    private FollowerRepo followerRepo;

    /**
     * Methods in the Service layer enact as methods to call when you wish to further down the request unto the
     * Repo to persist in the DB and get a response from there, which then returns it back to the calling Controllers.
     */
    public Follower addFollower(Follower follower) {
        return followerRepo.save(follower);
    }

    public List<Follower> findOwnFollowersFor(String followersusername) {
        return followerRepo.findFollowedUsersBasedOnUsername(followersusername);
    }

    public List<Follower> getFollowersForUser(String targetusername) {
        return followerRepo.findFollowersForUserByUsername(targetusername);
    }
}
