package com.example.CodeLibrary.controllers;

import com.example.CodeLibrary.entitites.Activity;
import com.example.CodeLibrary.services.ActivityService;
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
public class ActivityController {

    /**
     * Acts as the mapping annotation in terms of what Repository it should be delegating parameters further unto.
     */
    @Autowired
    private ActivityService activityService;

    /**
     * Path variables are the variables we put in the URL in terms of {} encapsulation
     */
    @GetMapping("/activity/findActivityByUsername/{username}")
    public List<Activity> getActivityByUsername(@PathVariable String username) {
        return activityService.findActivityByUsername(username);
    }

    /**
     * RequestBody allows us to access the body sent to this path through the request
     */
    @PostMapping("/activity/saveNewActivity")
    public Activity createNewActivity(@RequestBody Activity activity) {
        return activityService.saveNewActivityToDb(activity);
    }
}
