package com.example.CodeLibrary.repositories;

import com.example.CodeLibrary.entitites.Like;
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
public interface LikesRepo extends CrudRepository<Like, Integer> {

    /**
     * When we wish to declare something to be utilizing a custom Query, we have to annotate it
     * with @Query, along with the value of the Query and that it's a nativeQuery.
     * <p>
     * The : declaration in the query means to denote a placeholder of the value in terms of a
     * parameter that it is being fed in. So in this case, we wish to feed in a custom value of
     * the userid and articleid, so we denote it as :userid and articleid in terms of passing through a value for it.
     */
    @Query(value = "SELECT * FROM likes WHERE userid = :userid AND articleId = :articleId", nativeQuery = true)
    List<Like> findLikesByUserIdAndArticleId(@Param("userid") Integer userid, @Param("articleId") Integer articleId);

    @Query(value = "SELECT * FROM likes WHERE articleId = :articleId", nativeQuery = true)
    List<Like> findLikesByArticleId(@Param("articleId") Integer articleId);

    @Query(value = "SELECT * FROM likes WHERE userid = :userid", nativeQuery = true)
    List<Like> findLikesByUserId(@Param("userid") Integer userid);

    /**
     * When we wish to declare something to be utilizing a custom Query, we have to annotate it
     * with @Query, along with the value of the Query and that it's a nativeQuery.
     * <p>
     * The : declaration in the query means to denote a placeholder of the value in terms of a
     * parameter that it is being fed in. So in this case, we wish to feed in a custom value of
     * a userid and articleid, so we denote it as :userid and articleid in terms of passing
     * through a value for it.
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
    @Query(value = "DELETE FROM likes WHERE userid = :userid AND articleId = :articleId", nativeQuery = true)
    void deleteLikeByArticleIdAndUserId(@Param("userid") Integer userid, @Param("articleId") Integer articleId);

    /**
     * In addition to the above, we can also opt to not have the custom Query declaration, since we are basing
     * this off of the CRUD Repository structure - so we can skip the Query notation.
     */
    @Modifying(clearAutomatically = true)
    @Transactional
    void deleteByarticleid(Integer articleId);
}
