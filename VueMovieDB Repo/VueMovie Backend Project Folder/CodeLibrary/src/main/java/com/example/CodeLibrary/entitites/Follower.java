package com.example.CodeLibrary.entitites;

import javax.persistence.*;

/**
 * A entity will always be annotated with a @Entity annotation, to denote it being a persisted
 * entity in the Database, followed by the @Table annotation - telling us which table it is to be
 * persisted in.
 */
@Entity
@Table(name = "followers")
public class Follower {

    /**
     * The @Id annotation denotes this value to be the id value of the entity when persisted.
     * The @GeneratedValue annotation with the option of stratergy = GenerationType.IDENTITY,
     * is a option expressed through a ENUM - to denote that this is a attribute to utilize in
     * terms of Id generation of indexing in numbering - which in this case is a Autoincrement.
     * <p>
     * All of these values are case sensitive in their namings. Failure to adhere to this, won't
     * allow for mapping of the Entity in Persistance in terms of the DB values expected in terms
     * of Columns.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String followersusername;
    String targetusername;

    /**
     * In Spring, we must have a empty Constructor to allow for creation of Entities
     * when they are to be persisted to the DB.
     */
    public Follower() {
    }

    /**
     * Getters and Setters allows Spring to put values through Reflection when persistance
     * becomes relevant for the respective entity.
     */
    public String getFollowersusername() {
        return followersusername;
    }

    public void setFollowersusername(String followersusername) {
        this.followersusername = followersusername;
    }

    public String getTargetusername() {
        return targetusername;
    }

    public void setTargetusername(String targetusername) {
        this.targetusername = targetusername;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * The ToString becomes the serialized pattern when a Object gets forced into a String
     * format - and is utilized when expressing the object in terms of Paths through the Backend
     * to allow for Object destructuring through property mapping - akin to JavaScripts object
     * attribute mapping or Destructuring - this is similar, except we map the String to a JSON
     * format later on.
     */
    @Override
    public String toString() {
        return "Follower{" +
                "id=" + id +
                ", followersusername='" + followersusername + '\'' +
                ", targetusername='" + targetusername + '\'' +
                '}';
    }

}
