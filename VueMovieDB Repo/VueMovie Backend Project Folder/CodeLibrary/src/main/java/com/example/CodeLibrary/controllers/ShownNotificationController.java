package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.ShownNotification;
import com.example.CodeLibrary.services.ShownNotificationService;
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
public class ShownNotificationController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private ShownNotificationService shownNotificationService;

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/shownnotification/addNewShownNotification")
    public ShownNotification createNewNotification(@RequestBody ShownNotification newNotification) {
        return shownNotificationService.saveNewShownNotification(newNotification);
    }

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @GetMapping("/shownnotification/getNotificationsFor/{showntousername}")
    public List<ShownNotification> getShownNotifications(@PathVariable String showntousername) {
        return shownNotificationService.getShownNotificationsForUsername(showntousername);
    }
}
