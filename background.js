var removeArticles = function( blockedURLs ){
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
blockedURLs = []

chrome.extension.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.event == "removeArticles") {
        removeArticles( blockedURLs )
    } else if (request.event == "updateURLs") {
        blockedURLs = request.urlsToBlock
        removeArticles( blockedURLs )
    }
})
