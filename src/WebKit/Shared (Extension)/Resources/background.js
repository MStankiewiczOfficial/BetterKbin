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

browser.contextMenus.create(kbinSelected);
browser.contextMenus.create(kbinPage);

browser.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "kbinSelected" && clickData.linkUrl) {
        browser.storage.local.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + clickData.linkUrl;
                browser.tabs.create({ url: newURL });
            }
        );
    }
    else
    if (clickData.menuItemId == "kbinSelected" && clickData.selectionText) {
        browser.storage.local.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + clickData.pageUrl;
                browser.tabs.create({ url: newURL });
            }
        );
    }
});

browser.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "kbinPage") {
        browser.storage.local.get(
            { instance: 'instance' },
            (items) => {
                var instance = items.instance;
                var newURL = "https://" + instance + "/new?url=" + clickData.pageUrl;
                browser.tabs.create({ url: newURL });
            }
        );
    }
});

browser.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        browser.runtime.openOptionsPage();
    }
} );