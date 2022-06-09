package com.example.CodeLibrary.services;

import com.example.CodeLibrary.entitites.Article;
import com.example.CodeLibrary.repositories.ArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * When we wish to denote something as being the delegated Service handler, we put a @Service annotation.
 * This is to denote the parts of the respective layer that passes on requests to the Repository, and is
 * wired/mapped to the Repository through the @Autowired annotation, along with the Repo class notation.
 */
@Service
public class ArticleService {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private ArticleRepo articleRepo;

    /**
     * Methods in the Service layer enact as methods to call when you wish to further down the request unto the
     * Repo to persist in the DB and get a response from there, which then returns it back to the calling Controllers.
     */
    public List<Article> findAllArticles() {
        return (List<Article>) articleRepo.findAll();
    }

    public Article findOneArticle(int id) {
        Article article = articleRepo.findBySpecificId(id);

        return article;
    }

    public Article findArticleByAuthor(String author) {
        return articleRepo.findByAuthor(author);
    }

    public List<Article> getArticlesContaining(String maintitle) {
        ArrayList<Article> myList = new ArrayList<Article>();
        ArrayList<Integer> coveredIds = new ArrayList<Integer>();
        var searchBasedOnTitle = articleRepo.findBymaintitleContainingIgnoreCase(maintitle);
        for (int i = 0; i < searchBasedOnTitle.size(); i++) {
            myList.add(searchBasedOnTitle.get(i));
            coveredIds.add(searchBasedOnTitle.get(i).getId());
        }

        var searchBasedOnAuthor = articleRepo.findByAuthorContainingIgnoreCase(maintitle);
        for (int a = 0; a < searchBasedOnAuthor.size(); a++) {
            if (!coveredIds.contains(searchBasedOnAuthor.get(a).getId())) {
                myList.add(searchBasedOnAuthor.get(a));
                coveredIds.add(searchBasedOnAuthor.get(a).getId());
            }
        }

        var searchBasedOnFirstTag = articleRepo.findByfirsttagContainingIgnoreCase(maintitle);
        for (int b = 0; b < searchBasedOnFirstTag.size(); b++) {
            if (!coveredIds.contains(searchBasedOnFirstTag.get(b).getId())) {
                myList.add(searchBasedOnFirstTag.get(b));
                coveredIds.add(searchBasedOnFirstTag.get(b).getId());
            }
        }

        var searchBasedOnSecondTag = articleRepo.findBysecondtagContainingIgnoreCase(maintitle);
        for (int c = 0; c < searchBasedOnSecondTag.size(); c++) {
            if (!coveredIds.contains(searchBasedOnSecondTag.get(c).getId())) {
                myList.add(searchBasedOnSecondTag.get(c));
                coveredIds.add(searchBasedOnSecondTag.get(c).getId());
            }
        }

        var searchBasedOnThirdTag = articleRepo.findBythirdtagContainingIgnoreCase(maintitle);
        for (int d = 0; d < searchBasedOnThirdTag.size(); d++) {
            if (!coveredIds.contains(searchBasedOnThirdTag.get(d).getId())) {
                myList.add(searchBasedOnThirdTag.get(d));
                coveredIds.add(searchBasedOnThirdTag.get(d).getId());
            }
        }

        return myList;
    }

    public int likeArticle(int id) {
        articleRepo.updateLikesOfArticle(id);
        return articleRepo.findLikesForArticleWithId(id);
    }

    public int decreaseLikesOfArticle(int id) {
        return articleRepo.decreaseLikesOfArticle(id);
    }

    public int decreaseDislikesOfArticle(int id) {
        return articleRepo.decreaseDislikesOfArticle(id);
    }

    public List<Article> findArticlesByAuthor(String author) {
        return articleRepo.findArticlesByAuthor(author);
    }

    public int dislikeArticle(int id) {
        articleRepo.updateDislikesOfArticle(id);
        return articleRepo.findDislikesForArticleWithId(id);
    }

    public int updateArticle(int id, String maintitle, String firsttag, String secondtag, String thirdtag, String firstprereq, String secondprereq, String thirdprereq, String difficulty, String language, String firstdescription, String firsttitle, String firstsection, String seconddescription, String secondtitle, String secondsection, String thirddescription, String thirdtitle, String thirdsection) {
        return articleRepo.updateArticle(id, maintitle, firsttag, secondtag, thirdtag, firstprereq, secondprereq, thirdprereq, difficulty, language, firstdescription, firsttitle, firstsection, seconddescription, secondtitle, secondsection, thirddescription, thirdtitle, thirdsection);
    }

    public Article saveNewArticleToDB(Article newArticle) {
        return articleRepo.save(newArticle);
    }

    public String deleteArticleByID(int id) {
        try {
            articleRepo.deleteById(id);
            return "Success";
        } catch (Exception e) {
            return "Failed";
        }
    }

}
