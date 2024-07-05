var kbinSelected = {
    "id": "kbinSelected",
    "title": "Share \"%s\" with /kbin",
    "contexts": ["selection", "link"]
};

var kbinPage = {
    "id": "kbinPage",
    "title": "Share this page with /kbin",
    "contexts": ["page"]
};

chrome.contextMenus.create(kbinSelected);
chrome.contextMenus.create(kbinPage);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "kbinSelected" && clickData.linkUrl) {
        chrome.storage.sync.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + clickData.linkUrl;
                chrome.tabs.create({ url: newURL });
            }
        );
    }
    else
    if (clickData.menuItemId == "kbinSelected" && clickData.selectionText) {
        chrome.storage.sync.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + clickData.pageUrl;
                chrome.tabs.create({ url: newURL });
            }
        );
    }
});

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "kbinPage") {
        chrome.storage.sync.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + clickData.pageUrl;
                chrome.tabs.create({ url: newURL });
            }
        );
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        chrome.runtime.openOptionsPage();
    }
} );