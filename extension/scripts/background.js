chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.permissions.request({
            permissions: ['activeTab', 'cookies'],
            origins: [activeTab.url]
        },
        function (granted) {
            var message = "Omnomnomnom";

            if (granted) {

                chrome.storage.sync.get(
                    ['sound', 'clearLocalStorage', 'clearSessionStorage'],
                    function(data) {
                        if (data.sound) {
                            var audio = new Audio();
                            audio.src = chrome.extension.getURL('/sound/omnomnom.mp3');
                            audio.play();
                        }

                        if (data.clearLocalStorage) {
                            chrome.tabs.executeScript({code:'localStorage.clear();'})
                        }

                        if (data.clearSessionStorage) {
                            chrome.tabs.executeScript({code:'localStorage.clear();'})
                        }
                    }
                );

                chrome.cookies.getAll({url: activeTab.url}, function (cookies) {
                    $.each(cookies, function (index, cookie) {
                        chrome.cookies.remove({
                                url: activeTab.url,
                                name: cookie.name
                            }
                        );
                    });
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
