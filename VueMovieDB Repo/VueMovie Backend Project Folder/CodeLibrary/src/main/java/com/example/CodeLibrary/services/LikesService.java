package com.example.CodeLibrary.services;

import com.example.CodeLibrary.entitites.Like;
import com.example.CodeLibrary.repositories.LikesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This service class handles the logic of writing and reading from the database.
 * The Repo is only used for direct queries to the Database.
 * Built-in methods through 'extends CrudRepository'
 * The Controller classes handles receiving requests from the frontend.
 */
@Service
public class LikesService {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private LikesRepo likeRepo;


    /**
     * Methods in the Service layer enact as methods to call when you wish to further down the request unto the
     * Repo to persist in the DB and get a response from there, which then returns it back to the calling Controllers.
     */
    public List<Like> findLikesByUserId(int id) {
        List<Like> like = likeRepo.findLikesByUserId(id);

        return like;
    }

    public List<Like> getLikesForArticle(Integer id) {
        return likeRepo.findLikesByArticleId(id);
    }

    public Like saveNewLikeToDB(Like like) {
        return likeRepo.save(like);
    }

    public void deleteLikesByArticleId(int articleid) {
        try {
            likeRepo.deleteByarticleid(articleid);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void deleteLikeByID(int articleid, int userid) {
        try {
            likeRepo.deleteLikeByArticleIdAndUserId(articleid, userid);
        } catch (Exception e) {

        }
    }

    public List<Like> getLikeByArticleIdAndUserId(int articleid, int userid) {
        return likeRepo.findLikesByUserIdAndArticleId(articleid, userid);
    }

}
