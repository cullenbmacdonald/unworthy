var shouldRun = function (tabId, changeInfo, tab) {
        if (tab.url.indexOf('facebook') > -1) {
            chrome.pageAction.show(tabId)
        }
    }

chrome.tabs.onUpdated.addListener( shouldRun )




