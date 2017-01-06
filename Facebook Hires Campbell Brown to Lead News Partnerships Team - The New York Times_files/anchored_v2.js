// Anchored Ad (NYT5 only) ~dj.paris

(function (window) {
    "use strict";

    var $;
    require(['foundation/main'], function () {
        require(['jquery/nyt', 'foundation/models/user-data'], function(jQuery, userInfo) {
            $ = jQuery;
            userInfo.ready(function () {
                var ad = new AnchoredAd(userInfo);
                ad.init();
            });
        });
    });


    function AnchoredAd(userInfo) {
        this.userInfo = userInfo;
    }

    AnchoredAd.prototype.init = function() {
        var that = this;
        this.show();

        // Bind a click event that will close container
        $(".nytdGrowlUIContainer").on('click', '.nytdGrowlNotifyCross', function () {
            $(".nytdGrowlUIContainer").fadeOut('slow');
        });

        $("#anchor-ad").on("mouseenter", function () {
            that.expand();
        });
        $("#anchor-container").on("mouseleave", function () {
            that.collapse();
        });

        window.setTimeout(function() {
            that.collapse(function () {
                // showing 'close' icon
                $('#anchor-close').css({ visibility: 'visible' }); 
            });
        }, 2000);
    };

    AnchoredAd.prototype.show = function(){

        if (!this.userInfo.isLoggedIn()) {
            // show the login button
            $('#anchor-login').addClass("show_login");      
        }    

        // hiding close button initially
        $('#anchor-close').css({ visibility: 'hidden' }); 

        // Remove hidden class
        $("#Anchor").removeClass("hidden");
        // Show the container after 1 second (fixes NYT5 display glitch)
        window.setTimeout(function () {
            $('#anchor-container').css("opacity", "1");
        }, 1000);

        $('#anchor-container').show();
    }

    AnchoredAd.prototype.expand = function() {
        $("#anchor-container").animate({
            bottom: '0'
        }, {
            queue: false
        });
    };

    AnchoredAd.prototype.collapse = function(onComplete) {
        $("#anchor-container").animate({
            bottom: '-147px'
        }, {
            queue: false,
            complete: onComplete
        });
    };

})(window);