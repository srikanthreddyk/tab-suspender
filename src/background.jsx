browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Do something with the message!
    if(request.type=="unsuspend") {
        browser.tabs.update(request.data.tabId, {url: request.data.suspendedUrl});
    }
  
    // And respond back to the sender.
    //sendResponse('got your message, thanks!');
});