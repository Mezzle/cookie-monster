chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.cookies.getAll({url: activeTab.url}, function (cookies) {
        $.each(cookies, function (index, cookie) {
            console.log(cookie);
            chrome.cookies.remove({
                    url: activeTab.url,
                    name: cookie.name
                }
            );
        });
    });

    alert('omnomnom');
});
