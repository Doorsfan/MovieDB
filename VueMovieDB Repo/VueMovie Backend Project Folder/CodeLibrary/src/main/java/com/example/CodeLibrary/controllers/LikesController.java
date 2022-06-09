package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Like;
import com.example.CodeLibrary.services.LikesService;
import com.google.gson.JsonParser;
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
public class LikesController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private LikesService likesService;

    @DeleteMapping("/likes/takeBackLike/{userid}/{articleid}")
    public void deletelikeByID(@PathVariable int userid, @PathVariable int articleid) {
        likesService.deleteLikeByID(userid, articleid);
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @DeleteMapping("/likes/deleteLikesByArticleId/{articleid}")
    public void deleteLikesByArticleId(@PathVariable int articleid) {
        likesService.deleteLikesByArticleId(articleid);
    }

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/likes/likeArticle/{articleid}")
    public Like likeArticle(@PathVariable int articleid, @RequestBody String userid) {
        Like myLike = new Like();
        myLike.setArticleId(articleid);
        myLike.setUserid(JsonParser.parseString(userid).getAsJsonObject().get("userid").getAsInt());
        return likesService.saveNewLikeToDB(myLike);
    }

    @GetMapping("/likes/findLikedArticle/{userid}/{articleid}")
    public List<Like> findLikeForArticle(@PathVariable int userid, @PathVariable int articleid) {
        return likesService.getLikeByArticleIdAndUserId(userid, articleid);
    }

}
