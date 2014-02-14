var removeArticles = function( blockedURLs ){
        console.log( blockedURLs )
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
    },
    startNewInterval = function( blockedURLs ){
        return setInterval( function(){ removeArticles( blockedURLs ) }, 2000 )
    },
    mainLoop = startNewInterval( [] ),
    defaultBlockedURLs = [
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
    ]

chrome.storage.sync.get( "unworthyURLsToBlock", function(data) {
    if (!Object.keys(data).length) {
        chrome.storage.sync.set( {unworthyURLsToBlock: defaultBlockedURLs} )
    }
})

chrome.storage.sync.get( "unworthyURLsToBlock", function(data){
    blockedURLs = data.unworthyURLsToBlock
    clearInterval( mainLoop )
    mainLoop = startNewInterval( blockedURLs )
})

chrome.storage.onChanged.addListener( function( keys, namespace ){
    for (key in keys) {
        if (key === "unworthyURLsToBlock") {
            chrome.storage.sync.get( "unworthyURLsToBlock", function(data){
                blockedURLs = data.unworthyURLsToBlock
                clearInterval( mainLoop )
                mainLoop = startNewInterval( blockedURLs )
            })
        }
    }
})


