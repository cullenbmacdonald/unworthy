(function( window, document ){

    var blockedURLs = [
        "faithit.com",
        "elitedaily.com",
        "upworthy.com",
        "www.upworthy.com",
        "distractify.com",
        "viralnova.com",
        "twistedsifter.com",
        "knowmore.washingonpost.com",
        "ijreview.com",
        "buzzfeed.com",
        "www.buzzfeed.com",
        "jolt24.com",
        "zimbio.com",
        "totalfratmove.com",
        "brobible.com",
        "boredpanda.com",
        "lawlzone.com"
    ],
    removeArticles = function(){
        var articles = document.querySelectorAll( "._5uch._5jmm._5pat" )

        for (i=0; i<articles.length; i++)
        {
            var derp = articles[ i ].querySelectorAll( ".fcg" )

            for (x=0; x<derp.length; x++)
            {
                var text = derp[ x ].innerText

                for (y=0; y<blockedURLs.length; y++) {
                    if (text === blockedURLs[ y ] )
                    {
                        console.log( "Removed an article from: " + blockedURLs[ y ] )
                        articles[ i ].remove()
                    }
                }
            }
        }
    }

    // Run run run
    removeArticles()

    // And continue to run every 4 seconds
    setInterval( removeArticles, 4000 )

})( window, document )

