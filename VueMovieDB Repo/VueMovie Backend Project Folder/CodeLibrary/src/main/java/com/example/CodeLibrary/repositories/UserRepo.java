package com.example.CodeLibrary.repositories;

import com.example.CodeLibrary.entitites.User;
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
public interface UserRepo extends CrudRepository<User, Integer> {

    /**
     * When we wish to declare something to be utilizing a custom Query, we have to annotate it
     * with @Query, along with the value of the Query and that it's a nativeQuery.
     * <p>
     * The : declaration in the query means to denote a placeholder of the value in terms of a
     * parameter that it is being fed in. So in this case, we wish to feed in a custom value of
     * a username, so we denote it as :username in terms of passing
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
     * <p>
     * In addition to this, values can be reused, as seen below - to self reference - in terms of followers,
     * so we just add 1 more to the already existing followers, along with the () denoting as "take this section
     * first"
     */
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE users SET followers = (followers + 1) WHERE username = :username", nativeQuery = true)
    int updateFollowsOfUser(@Param("username") String username);

    @Query(value = "SELECT followers FROM users WHERE username = :username", nativeQuery = true)
    String findFollowersForUserByUsername(@Param("username") String username);

    /**
     * A query that is passed on through the CRUD repository but also has no further requirements,
     * can simply be called on with no delegation of a Query, Transaction or denoted as modifying.
     */
    User findByUsername(String username);

    List<User> findByUsernameContainingIgnoreCase(String title);

}
