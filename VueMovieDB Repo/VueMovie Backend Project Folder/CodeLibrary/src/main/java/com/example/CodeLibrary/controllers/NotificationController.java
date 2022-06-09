package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Notification;
import com.example.CodeLibrary.services.NotificationService;
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
public class NotificationController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private NotificationService notificationService;

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/notification/addNewNotification")
    public Notification createNewNotification(@RequestBody Notification newNotification) {
        return notificationService.saveNewNotification(newNotification);
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @GetMapping("/notification/notificationsFrom/{authorname}")
    public List<Notification> getNotifications(@PathVariable String authorname) {
        return notificationService.getNotificationsForAuthor(authorname);
    }
}
