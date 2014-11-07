/*  File: navigation.js
 91.461 GUI Programming 1, Assignment 7: Creating a Single-Page Navigation Interface
 David Lordan, UMass Lowell Computer Science, david_lordan@student.uml.edu
 Created on November 1st, 2014, Updated on November 6th, 2014 10:05 PM.
 
 This file contains Javascript which allows the index page to load and display partial HTML files using AJAX 
 and JQuery. 
 
 IMPORTANT NOTE: Other than very slight modifications, none of the code below was written by me. 
 Virtually all of this code was written by Curran Kelleher for Prof. Jesse Heines' GUI Programming 1 class at UML. 
 */

// // This script implements simple routing by loading partial HTML files 
// named corresponding to fragment identifiers.
//
// By Curran Kelleher October 2014

// Wrap everything in an immediately invoked function expression,
// so no global variables are introduced.
(function () {

    // Stores the cached partial HTML pages.
    // Keys correspond to fragment identifiers.
    // Values are the text content of each loaded partial HTML file.
    var partialsCache = {};

    // Gets the appropriate content for the given fragment identifier.
    // This function implements a simple cache.
    function getContent(fragmentId, callback) {

        // If the page has been fetched before,
        if (partialsCache[fragmentId]) {

            // pass the previously fetched content to the callback.
            callback(partialsCache[fragmentId]);

        } else {
            // If the page has not been fetched before, fetch it.
            $.get(fragmentId + ".html", function (content) {

                // Store the fetched content in the cache.
                partialsCache[fragmentId] = content;

                // Pass the newly fetched content to the callback.
                callback(content);
            });
        }
    }

    // Sets the "active" class on the active navigation link.
    function setActiveLink(fragmentId) {
        $("#navbar a").each(function (i, linkElement) {
            var link = $(linkElement),
                    pageName = link.attr("href").substr(1);
            if (pageName === fragmentId) {
                link.attr("class", "active");
            } else {
                link.removeAttr("class");
            }
        });
    }

    // Updates dynamic content based on the fragment identifier.
    function navigate() {

        // Isolate the fragment identifier using substr.
        // This gets rid of the "#" character.
        var fragmentId = location.hash.substr(1);


        // Set the "content" div innerHTML based on the fragment identifier.
        // NOTE: This was changed to '#fragmentId' in order to work with the UI Tab placeholder divs. 
        getContent(fragmentId, function (content) {
            $('#' + fragmentId).html(content);
        });

        // Toggle the "active" class on the link currently navigated to.
        setActiveLink(fragmentId);
    }

    // If no fragment identifier is provided,
    if (!location.hash) {

        // default to #home.
        location.hash = "#home";
    }

    // Navigate once to the initial fragment identifier.
    navigate();

    // Navigate whenever the fragment identifier value changes.
    $(window).bind('hashchange', navigate);
}());


// NOTE: This was added to allow the JQuery UI tabs to work with Curran Kelleher's code. 
// Function to update the location hash with jQuery UI tabs. Found at:
// http://www.dynamicdrive.com/forums/showthread.php?74291-jQuery-UI-TABS-Update-URL-Hash
$('#tabs ul li a').click(function () {
    location.hash = $(this).attr('href');
});
