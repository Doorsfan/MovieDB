package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Dislike;
import com.example.CodeLibrary.services.DislikeService;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
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
public class DislikesController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private DislikeService dislikeService;

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @DeleteMapping("/dislikes/takeBackDislike/{userid}/{articleId}")
    public String deletedislikeByID(@PathVariable int userid, @PathVariable int articleId) {
        return dislikeService.deleteLikeByID(userid, articleId);
    }

    @DeleteMapping("/dislikes/deleteDislikesByArticleId/{articleid}")
    public void deleteDislikesByArticleId(@PathVariable int articleid) {
        dislikeService.deleteDislikesByArticleId(articleid);
    }

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/dislikes/dislikeArticle/{articleid}")
    public Dislike dislikeArticle(@PathVariable int articleid, @RequestBody String userid) {
        Dislike myDislike = new Dislike();
        myDislike.setArticleId(articleid);
        myDislike.setUserid(JsonParser.parseString(userid).getAsJsonObject().get("userid").getAsInt());
        return dislikeService.saveNewDislikeToDB(myDislike);
    }

    @GetMapping("/dislikes/findDislikedArticle/{userid}/{articleid}")
    public Optional<List<Dislike>> findDislikeForArticle(@PathVariable int userid, @PathVariable int articleid) {
        return dislikeService.getDislikeByArticleIdAndUserId(userid, articleid);
    }

}
