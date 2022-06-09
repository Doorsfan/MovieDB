package com.example.CodeLibrary.entitites;

import javax.persistence.*;

/**
 * A entity will always be annotated with a @Entity annotation, to denote it being a persisted
 * entity in the Database, followed by the @Table annotation - telling us which table it is to be
 * persisted in.
 */
@Entity
@Table(name = "users")
public class User {

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
    private Integer id;
    private String username;
    private String password;
    private String image;

    /**
     * In Spring, we must have a empty Constructor to allow for creation of Entities
     * when they are to be persisted to the DB.
     */
    public User() {

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
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

    /**
     * Getters and Setters allows Spring to put values through Reflection when persistance
     * becomes relevant for the respective entity.
     */
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
