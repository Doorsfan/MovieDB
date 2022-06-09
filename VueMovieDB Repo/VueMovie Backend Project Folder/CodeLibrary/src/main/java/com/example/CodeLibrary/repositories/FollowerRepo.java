package com.example.CodeLibrary.repositories;

import com.example.CodeLibrary.entitites.Follower;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

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
public interface FollowerRepo extends CrudRepository<Follower, Integer> {

    /**
     * When we wish to declare something to be utilizing a custom Query, we have to annotate it
     * with @Query, along with the value of the Query and that it's a nativeQuery.
     * <p>
     * The : declaration in the query means to denote a placeholder of the value in terms of a
     * parameter that it is being fed in. So in this case, we wish to feed in a custom value of
     * the targetusername, so we denote it as :targetusername in terms of passing through a value for it.
     */
    @Query(value = "SELECT * FROM followers WHERE targetusername = :targetusername", nativeQuery = true)
    List<Follower> findFollowersForUserByUsername(@Param("targetusername") String targetusername);

    @Query(value = "SELECT * FROM followers WHERE followersusername = :followersusername", nativeQuery = true)
    List<Follower> findFollowedUsersBasedOnUsername(@Param("followersusername") String followersusername);
}
