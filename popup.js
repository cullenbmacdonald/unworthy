var firstLaunch = false,
    urlsToBlock = [],
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
    ],
    markAsUnworthy = function(){
        var input = document.getElementById( "unworthy-url" ),
            newValue = input.value

        urlsToBlock.push( newValue )
        localStorage.unworthyURLsToBlock = JSON.stringify( urlsToBlock )

        input.value = ""
        updateURLs( urlsToBlock )
    },
    removeArticles = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[ 0 ]
            chrome.tabs.sendRequest( tab.id, {event: "removeArticles"} )
        })
    },
    updateURLs = function( urlsToBlock ){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[ 0 ]
            chrome.tabs.sendMessage( tab.id, {
                event: "updateURLs",
                urlsToBlock: urlsToBlock
            } )
        })
    }

    // Check for local storage of saved jamz
    if ( !localStorage.unworthyURLsToBlock ) {
        // If we not has, lets save the blocked urls
        localStorage.savedUnworthyURLs = JSON.stringify( defaultBlockedURLs )
        firstLaunch = true
    }

    if ( firstLaunch ) {
        urlsToBlock = defaultBlockedURLs
    } else {
        urlsToBlock = JSON.parse( localStorage.unworthyURLsToBlock )
    }

// When we're ready to go, do the thing
document.addEventListener('DOMContentLoaded', function () {

    // Send down the urls to block
    updateURLs( urlsToBlock )

    setInterval( function(){ removeArticles() }, 4000 )

    // bind to the click of the submit
    document.getElementById( "deem-unworthy" ).addEventListener( "click", markAsUnworthy )

});

