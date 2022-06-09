package com.example.CodeLibrary.services;

import com.example.CodeLibrary.entitites.Dislike;
import com.example.CodeLibrary.repositories.DislikesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * When we wish to denote something as being the delegated Service handler, we put a @Service annotation.
 * This is to denote the parts of the respective layer that passes on requests to the Repository, and is
 * wired/mapped to the Repository through the @Autowired annotation, along with the Repo class notation.
 */
@Service
public class DislikeService {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private DislikesRepo dislikeRepo;

    /**
     * Methods in the Service layer enact as methods to call when you wish to further down the request unto the
     * Repo to persist in the DB and get a response from there, which then returns it back to the calling Controllers.
     */
    public List<Dislike> findDislikesByUserId(int id) {
        List<Dislike> dislike = dislikeRepo.findDislikesByUserId(id);

        return dislike;
    }

    public void deleteDislikesByArticleId(int articleid) {
        try {
            dislikeRepo.deleteByarticleid(articleid);

        } catch (Exception e) {
            System.out.println(e);

        }
    }

    public List<Dislike> getDislikesForArticle(Integer id) {
        return dislikeRepo.findDislikesByArticleId(id);
    }

    public Dislike saveNewDislikeToDB(Dislike dislike) {
        return dislikeRepo.save(dislike);
    }

    public String deleteLikeByID(int articleid, int userid) {
        try {
            dislikeRepo.deleteDislikeByArticleIdAndUserId(articleid, userid);
            return "Success";
        } catch (Exception e) {
            return "Failed";
        }
    }

    public Optional<List<Dislike>> getDislikeByArticleIdAndUserId(int articleid, int userid) {
        return dislikeRepo.findDislikesByUserIdAndArticleId(articleid, userid);
    }

}
