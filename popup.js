var markAsUnworthy = function(){
        var input = document.getElementById( "unworthy-url" ),
            newValue = input.value

        if (newValue != "") {
            urlsToBlock.push( newValue )
            localStorage.unworthyURLsToBlock = JSON.stringify( urlsToBlock )
            updateURLs( urlsToBlock )
            input.value = ""
            renderURLsList()
        }
    },
    removeArticles = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[ 0 ]
            chrome.tabs.sendRequest( tab.id, {event: "removeArticles"} )
        })
        renderURLsList()
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
    resetList = function(){
        urlsToBlock = []
        localStorage.unworthyURLsToBlock = JSON.stringify( urlsToBlock )
        updateURLs( urlsToBlock )
        renderURLsList()
    },
    urlsToBlock = JSON.parse( localStorage.unworthyURLsToBlock ),
    removeItemFromList = function( url ){
        urlsToBlock.splice( urlsToBlock.indexOf( url ), 1 )
        localStorage.unworthyURLsToBlock = JSON.stringify( urlsToBlock )
        updateURLs( urlsToBlock )
    },
    renderURLsList = function(){
        var list = document.getElementById( "saved" )

        list.innerText = ""

        for (i = 0; i < urlsToBlock.length; i++) {
            var urlItem = document.createElement( "li" ),
                removeItem = document.createElement( "span" )

            urlItem.innerText = urlsToBlock[ i ]
            urlItem.setAttribute( "data-url", urlsToBlock[ i ] )

            removeItem.innerText = " X "
            removeItem.addEventListener( "click", function(){
                    removeItemFromList( urlsToBlock[ i ] )
                    renderURLsList()
            } )

            urlItem.appendChild( removeItem )
            list.appendChild( urlItem )
        }
    }


// When we're ready to go, do the thing
document.addEventListener('DOMContentLoaded', function () {

    // bind to the click of the submit
    document.getElementById( "deem-unworthy" ).addEventListener( "click", markAsUnworthy )

    // bind to the reset
    document.getElementById( "reset" ).addEventListener( "click", resetList )

    renderURLsList()

});

