var markAsUnworthy = function(){
        var input = document.getElementById( "unworthy-url" ),
            newValue = input.value

        if (newValue != "") {
            urlsToBlock.push( newValue )
            localStorage.unworthyURLsToBlock = JSON.stringify( urlsToBlock )
            updateURLs( urlsToBlock )
            input.value = ""
        }
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
    },
    currentList = function(){

    },
    resetList = function(){
        urlsToBlock = []
        localStorage.unworthyURLsToBlock = JSON.stringify( urlsToBlock )
        updateURLs( urlsToBlock )
    },
    urlsToBlock = JSON.parse( localStorage.unworthyURLsToBlock )


// When we're ready to go, do the thing
document.addEventListener('DOMContentLoaded', function () {

    // bind to the click of the submit
    document.getElementById( "deem-unworthy" ).addEventListener( "click", markAsUnworthy )

    // bind to the reset
    document.getElementById( "reset" ).addEventListener( "click", resetList )

});

