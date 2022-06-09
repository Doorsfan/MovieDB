package com.example.CodeLibrary.repositories;

import com.example.CodeLibrary.entitites.Article;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The structure that handles persistance to the database in Spring, are Repositories.
 * A standardized way to integrate CRUD operations then, is to extend the CrudRepository
 * interface, where we feed in a Entity and the type of the Id on the Entity.
 * <p>
 * This CRUD Repository allows us to inherently do most standardized operations, akin to
 * Get, Delete, counting, etc.
 * <p>
 * We can of course also do custom queries, but the Crud Repository is there to allow us to
 * to baseline operations of CRUD.
 */
@Repository
public interface ArticleRepo extends CrudRepository<Article, Integer> {

    /**
     * When we wish to declare something to be utilizing a custom Query, we have to annotate it
     * with @Query, along with the value of the Query and that it's a nativeQuery.
     * <p>
     * The : declaration in the query means to denote a placeholder of the value in terms of a
     * parameter that it is being fed in. So in this case, we wish to feed in a custom value of
     * a id, so we denote it as :id in terms of passing through a value for it.
     * <p>
     * In addition to this, when we pass down a modifying Query, that is oriented around somehow
     * changing the data - we must add the @Modifying annotation along with clearing the underlying
     * caching automatically - to ensure that values are updated and synchronized.
     * <p>
     * Further more, the @Transactional annotation is needed as well - to ensure that the Transaction
     * in the Database is started and ended correctly.
     * <p>
     * When we modify/update values, we may wish to rollback if a failure state occurs - so we isolate
     * the Query execution in a Transaction - which allows us to roll it back, should the need arise -
     * and only if the entire transaction completes, do we actually fully persist the change and execute
     * the change.
     */
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE articles SET likes = (likes + 1) WHERE id = :id", nativeQuery = true)
    int updateLikesOfArticle(@Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE articles SET likes = (likes - 1) WHERE id = :id", nativeQuery = true)
    int decreaseLikesOfArticle(@Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE articles SET dislikes = (dislikes - 1) WHERE id = :id", nativeQuery = true)
    int decreaseDislikesOfArticle(@Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE articles SET dislikes = (dislikes + 1) WHERE id = :id", nativeQuery = true)
    int updateDislikesOfArticle(@Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE articles SET maintitle = :maintitle, firsttag = :firsttag, secondtag = :secondtag, thirdtag = :thirdtag, firstprerequisite = :firstprereq, secondprerequisite = :secondprereq, thirdprerequisite = :thirdprereq, difficulty = :difficulty, language = :language, firstdescription = :firstdescription, firsttitle = :firsttitle, firstsection = :firstsection, seconddescription = :seconddescription, secondtitle = :secondtitle, secondsection = :secondsection, thirddescription = :thirddescription, thirdtitle = :thirdtitle, thirdsection = :thirdsection WHERE id = :id", nativeQuery = true)
    int updateArticle(@Param("id") Integer id, @Param("maintitle") String maintitle, @Param("firsttag") String firsttag, @Param("secondtag") String secondtag, @Param("thirdtag") String thirdtag, @Param("firstprereq") String firstprereq, @Param("secondprereq") String secondprereq, @Param("thirdprereq") String thirdprereq, @Param("difficulty") String difficulty, @Param("language") String language, @Param("firstdescription") String firstdescription, @Param("firsttitle") String firsttitle, @Param("firstsection") String firstsection, @Param("seconddescription") String seconddescription, @Param("secondtitle") String secondtitle, @Param("secondsection") String secondsection, @Param("thirddescription") String thirddescription, @Param("thirdtitle") String thirdtitle, @Param("thirdsection") String thirdsection);

    @Query(value = "SELECT likes FROM articles WHERE id = :id", nativeQuery = true)
    int findLikesForArticleWithId(@Param("id") Integer id);

    @Query(value = "SELECT dislikes FROM articles WHERE id = :id", nativeQuery = true)
    int findDislikesForArticleWithId(@Param("id") Integer id);

    @Query(value = "SELECT * FROM articles WHERE id = :id", nativeQuery = true)
    Article findBySpecificId(@Param("id") Integer id);

    @Query(value = "SELECT * FROM articles WHERE author = :author", nativeQuery = true)
    List<Article> findArticlesByAuthor(@Param("author") String author);

    Article findByAuthor(String author);

    List<Article> findBymaintitleContainingIgnoreCase(String maintitle);

    List<Article> findByAuthorContainingIgnoreCase(String author);

    List<Article> findByfirsttagContainingIgnoreCase(String firsttag);

    List<Article> findBysecondtagContainingIgnoreCase(String secondtag);

    List<Article> findBythirdtagContainingIgnoreCase(String thirdtag);

}
