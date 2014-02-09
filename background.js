var firstLaunch = false,
    shouldRun = function (tabId, changeInfo, tab) {
        if (tab.url.indexOf('facebook') > -1) {
            chrome.pageAction.show(tabId)
        }
    },
    updateURLs = function( urlsToBlock ){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[ 0 ]
            chrome.tabs.sendMessage( tab.id, {
                event: "updateURLs",
                urlsToBlock: urlsToBlock
            } )
        })
    },
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
    ]

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

chrome.tabs.onUpdated.addListener( shouldRun )

chrome.extension.onMessage.addListener( function( message, sender, sendResponse ){
    if (message.text == "getBlockedURLs") {
        updateURLs( urlsToBlock )
    }
})



