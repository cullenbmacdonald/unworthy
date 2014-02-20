var urlsToBlock = JSON.parse( localStorage.unworthyURLsToBlock ),
    markAsUnworthy = function(){
        var input = document.getElementById( "unworthy-url" ),
            newValue = input.value

        if (newValue != "") {
            urlsToBlock.push( newValue )
            chrome.storage.sync.set( {unworthyURLsToBlock: urlsToBlock} )
            input.value = ""
            renderURLsList()
        }
    },
    resetList = function(){
        urlsToBlock = []
        chrome.storage.sync.set( {unworthyURLsToBlock: urlsToBlock} )
        renderURLsList()
    },
    removeItemFromList = function( url ){
        urlsToBlock.splice( urlsToBlock.indexOf( url ), 1 )
        chrome.storage.sync.set( {unworthyURLsToBlock: urlsToBlock} )
        renderURLsList()
    },
    renderURLsList = function(){
        var list = document.getElementById( "saved" )

        list.innerText = ""

        for (i = 0; i < urlsToBlock.length; i++) {
            var urlItem = document.createElement( "li" ),
                removeItem = document.createElement( "span" )
                callRemoveWithURL = function( url ){
                    return function(){ removeItemFromList( url ) }
                }

            urlItem.innerText = urlsToBlock[ i ]

            removeItem.innerText = " X "
            removeItem.setAttribute( "class", "exit" )
            removeItem.addEventListener( "click", callRemoveWithURL( urlsToBlock[ i ] ) )

            urlItem.appendChild( removeItem )
            list.appendChild( urlItem )
        }
    }


chrome.storage.onChanged.addListener( function( keys, namespace ){
    for (key in keys) {
        if (key === "unworthyURLsToBlock") {
            chrome.storage.sync.get( "unworthyURLsToBlock", function(data){
                urlsToBlock = data.unworthyURLsToBlock
                renderURLsList()
            })
        }
    }
})

// When we're ready to go, do the thing
document.addEventListener('DOMContentLoaded', function () {

    // bind to the click of the submit
    document.getElementById( "deem-unworthy" ).addEventListener( "click", markAsUnworthy )

    // bind to the reset
    document.getElementById( "reset" ).addEventListener( "click", resetList )

    chrome.storage.sync.get( "unworthyURLsToBlock", function(data){
        urlsToBlock = data.unworthyURLsToBlock
        renderURLsList()
    })

});

