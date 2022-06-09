package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Comment;
import com.example.CodeLibrary.services.CommentService;
import com.example.CodeLibrary.utility.StringFormatter;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * RestController allows us to map RequestBody to the respective Rest Path
 * and the RequestMapping allows us to denote what mapping of a path we wish
 * to have - along with allowed methods.
 */
@RestController
@RequestMapping(value = "/rest", method = RequestMethod.POST)
public class CommentsController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private CommentService commentService;

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/comments/postNewComment")
    public Comment createNewUser(@RequestBody String comment) {
        Gson gson = new Gson();
        JsonObject jsonObject = new JsonParser().parse(comment).getAsJsonObject();
        Comment newComment = new Comment();
        newComment.setArticleid(Integer.parseInt(StringFormatter.removeFirstAndLastChar(jsonObject.get("articleid").toString())));
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        newComment.setTimestamp(Timestamp.from(ZonedDateTime.now().toInstant()));
        newComment.setTimestamp(timestamp);
        newComment.setContent(StringFormatter.removeFirstAndLastChar(jsonObject.get("content").toString()));
        newComment.setAuthorname(StringFormatter.removeFirstAndLastChar(jsonObject.get("authorname").toString()));
        newComment.setAuthorurl(StringFormatter.removeFirstAndLastChar(jsonObject.get("authorurl").toString()));

        return commentService.saveNewCommentToDB(newComment);
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @GetMapping("/comments/getCommentsForArticle/{articleid}")
    public List<Comment> getCommentsByArticleId(@PathVariable Integer articleid) {
        return commentService.getCommentsForArticleId(articleid);
    }

    @DeleteMapping("/comments/deleteComment/{id}")
    public void deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
    }

    @PutMapping("/comments/updateComment/{id}/{content}")
    public void decreaseArticleLike(@PathVariable int id, @PathVariable String content) {
        commentService.updateComment(id, content);
    }

}
