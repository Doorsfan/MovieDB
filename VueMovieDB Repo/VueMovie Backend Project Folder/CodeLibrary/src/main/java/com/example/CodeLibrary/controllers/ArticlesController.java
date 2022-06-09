package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Article;
import com.example.CodeLibrary.services.ArticleService;
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
public class ArticlesController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private ArticleService articleService;

    @GetMapping("/articles")
    public List<Article> getAllArticles() {
        return articleService.findAllArticles();
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @GetMapping("/articles/findArticleByTerm/{term}")
    public List<Article> getArticlesContaining(@PathVariable String term) {
        return articleService.getArticlesContaining(term);
    }

    @GetMapping("/articles/findArticlesByAuthor/{author}")
    public List<Article> getArticlesByAuthor(@PathVariable String author) {
        return articleService.findArticlesByAuthor(author);
    }

    @GetMapping("/articles/{id}")
    public Article getOneArticle(@PathVariable int id) {
        return articleService.findOneArticle(id);
    }

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/articles/publish")
    public Article createNewArticle(@RequestBody Article article) {
        return articleService.saveNewArticleToDB(article);
    }

    @DeleteMapping("/articles/deleteArticle/{id}")
    public String deletearticleByID(@PathVariable int id) {
        return articleService.deleteArticleByID(id);
    }


    @PutMapping("/articles/updateArticle/{id}/{maintitle}/{firsttag}/{secondtag}/{thirdtag}/{firstprereq}/{secondprereq}/{thirdprereq}/{difficulty}/{language}/{firstdescription}/{firsttitle}/{firstsection}/{seconddescription}/{secondtitle}/{secondsection}/{thirddescription}/{thirdtitle}/{thirdsection}")
    public int updateArticle(@PathVariable int id, @PathVariable String maintitle, @PathVariable String firsttag, @PathVariable String secondtag, @PathVariable String thirdtag, @PathVariable String firstprereq, @PathVariable String secondprereq, @PathVariable String thirdprereq, @PathVariable String difficulty, @PathVariable String language, @PathVariable String firstdescription, @PathVariable String firsttitle, @PathVariable String firstsection, @PathVariable String seconddescription, @PathVariable String secondtitle, @PathVariable String secondsection, @PathVariable String thirddescription, @PathVariable String thirdtitle, @PathVariable String thirdsection) {
        return articleService.updateArticle(id, maintitle, firsttag, secondtag, thirdtag, firstprereq, secondprereq, thirdprereq, difficulty, language, firstdescription, firsttitle, firstsection, seconddescription, secondtitle, secondsection, thirddescription, thirdtitle, thirdsection);
    }

    @PutMapping("/articles/decreaseLikeOfArticle/{id}")
    public int decreaseArticleLike(@PathVariable int id) {
        return articleService.decreaseLikesOfArticle(id);
    }

    @PutMapping("/articles/decreaseDislikeOfArticle/{id}")
    public int decreaseArticleDislike(@PathVariable int id) {
        return articleService.decreaseDislikesOfArticle(id);
    }


    @PutMapping("/articles/likeArticle/{id}")
    public int updateArticleLikes(@PathVariable int id) {
        return articleService.likeArticle(id);
    }

    @PutMapping("/articles/dislikeArticle/{id}")
    public int updateArticleDislikes(@PathVariable int id) {
        return articleService.dislikeArticle(id);
    }
}



