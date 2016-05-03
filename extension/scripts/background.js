chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.cookies.getAll({url: activeTab.url}, function (cookies) {
        $.each(cookies, function (index, cookie) {
            chrome.cookies.remove({
                    url: activeTab.url,
                    name: cookie.name
                }
            );
        });
    });

    chrome.notifications.create(options = {
        type: "basic",
        iconUrl: "images/icon128.png",
        message: "Omnomnomnom",
        title: "Cookie Monster says"
    });
});
