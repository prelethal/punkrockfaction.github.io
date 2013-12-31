$(document).ready(function() {
    
    /**
     * Set an array of objects to store all the information about the order of the divs to scroll to,
     * this way, you could scroll back up to one if you wanted
     * 
     * id is the id of the object to scroll to
     * duration is the duration of the animation
     * delay is how long to wait (in milliseconds) before scrolling (after the previous scroll has ended)
     */
    var scrollOrder = [
        { id: 'section-one',   duration: 0, delay: 0 }, // Set this one to 0 to start scrolling straight away
        { id: 'section-three',   duration: 700,  delay: 200 },
        { id: 'section-four', duration: 2000, delay: 500 },
        { id: 'section-three',  duration: 300, delay: 1000 },
        { id: 'section-two',   duration: 1000, delay: 500 },
        { id: 'section-one',   duration: 1000, delay: 1000 } 
    ];

    // We'll use a simple counter to keep tabs of where we're at in scrollOrder
    var scrollElement = 0;
    
    /**
     * Bind the auto scroll to the play link click event
     */
    $('#play-btn').on('click', function(e){
        // Scroll to the first element after a short delay
        scrollWithDelay(scrollElement, true);
        // Prevent default stops the browser from fulfilling the normal action, in this case going to the # anchor link
        e.preventDefault();
    });

    /**
     * Function scrollToElement
     * Perform a slight delay, then do the scroll
     * 
     * scrollOrderIndex int The array index of scrollOrder to target
     */
    function scrollWithDelay(scrollOrderIndex, auto){
        /**
         * Call the scrollToElement function on the first element in scrollOrder
         * Needs to be an anonymous function in order to pass params via setTimeout
         */
        setTimeout(function(){
            scrollToElement( scrollOrder[scrollOrderIndex].id, scrollOrder[scrollOrderIndex].duration, auto );
        }, scrollOrder[scrollOrderIndex].delay );
    }

    /**
     * Function scrollToElement
     * Scroll the page to the required element
     * 
     * targetId str The id of the target to scroll the page to
     */
    function scrollToElement(targetId, scrollDuration, auto){
        // Set the target as a jQuery object via the id
        var target = $('#' + targetId);
        // Use the animate method to move the page via scrollTop
        // 'swing' is simply the easing effect to use
        $('body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollDuration, 'swing', function (){
            // Set the hash location in the url (think this breaks in IE < 9!)
            window.location.hash = targetId;
            // Increment the next section counter and do the next scroll if auto
            if(auto){
                console.log(scrollElement);
                if(scrollElement < scrollOrder.length - 1){
                    scrollElement++;
                    scrollWithDelay(scrollElement, true);
                }
            }
        });
    }

});