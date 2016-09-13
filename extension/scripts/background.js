chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.permissions.request({
            permissions: ['cookies'],
            origins: [activeTab.url]
        },
        function (granted) {
            var message = "Omnomnomnom";

            if (granted) {
                chrome.storage.sync.get("sound", function(data) {
                    if (data.sound) {
                        var audio = new Audio();
                        audio.src = chrome.extension.getURL('/sound/omnomnom.mp3');
                        audio.play();
                    }
                });

                chrome.cookies.getAll({url: activeTab.url}, function (cookies) {
                    $.each(cookies, function (index, cookie) {
                        chrome.cookies.remove({
                                url: activeTab.url,
                                name: cookie.name
                            }
                        );
                    });
                });

                chrome.storage.sync.get("clearLocalStorage", function(data) {
                    if (data.clearLocalStorage) {
                        chrome.tabs.executeScript({code:'localStorage.clear();'})
                    }
                });

                chrome.storage.sync.get("clearSessionStorage", function(data) {
                    if (data.clearSessionStorage) {
                        chrome.tabs.executeScript({code:'localStorage.clear();'})
                    }
                });
            } else {
                message = "Cookie Monster is sad that there are no cookies";
            }

            chrome.notifications.create(options = {
                type: "basic",
                iconUrl: "images/icon128.png",
                message: message,
                title: "Cookie Monster says"
            });
        });
});
