function suspendTab(tabData) {
    let currentTab = tabData.tab;
    let suspendedUrl = browser.extension.getURL("suspended.html#"+encodeURIComponent(currentTab.url));
    browser.storage.local.get("suspendedTabs", (items)=> {
        let suspendedTabs = items.suspendedTabs ? items.suspendedTabs : {};
        suspendedTabs[currentTab.id] = { tabId: currentTab.id, tabUrl: currentTab.url};
        browser.storage.local.set({suspendedTabs});
    });

    browser.tabs.update(currentTab.id, {url: suspendedUrl}, (tab) => {
        browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status == 'complete') {
                browser.tabs.onUpdated.removeListener(listener);
                browser.tabs.sendMessage(
                        tabId, 
                        {actionType: "load_suspender", data: {tab: currentTab}}
                );
               /* browser.tabs.executeScript(
                    {
                        tabId: tab.id,
                        file: "/suspended.bundle.js",
                    },
                    () => { 
                        browser.tabs.sendMessage(
                            tabId, 
                            {actionType: "load_suspender", data: {tab: currentTab}}
                        );
                    }
                );*/
                
            }
        });
    });
}

function unsuspendTab(tabData) {
    let tabId = tabData.tab.id;
    browser.storage.local.get("suspendedTabs", (items) => {
        let suspendedTabs = items.suspendedTabs ? items.suspendedTabs : {};
        let originalUrl = suspendedTabs[tabId].tabUrl;
        delete suspendedTabs[tabId];
        browser.storage.local.set({suspendedTabs});
        // go back to previous url
        browser.tabs.update(tabId, {url: originalUrl});
    });
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.actionType) {
        case "suspend_automatically":
            suspendTab(sender);
            break;
        
        case "suspend_from_popup":
            suspendTab(request.data);
            break;

        case "unsuspend_from_tab":
            unsuspendTab(sender);
            break;

        case "unsuspend_from_popup":
            unsuspendTab(request.data);
            break;
    }
    // And respond back to the sender.
    sendResponse('success');
});

console.log("sri");