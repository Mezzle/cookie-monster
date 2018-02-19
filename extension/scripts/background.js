chrome.browserAction.onClicked.addListener(activeTab => {
  chrome.permissions.request(
    {
      permissions: ["activeTab", "cookies"],
      origins: [activeTab.url]
    },
    granted => {
      let message = "Omnomnomnom";

      if (granted) {
        chrome.storage.sync.get(
          ["sound", "clearLocalStorage", "clearSessionStorage"],
          data => {
            if (data.sound) {
              const audio = new Audio();
              audio.src = chrome.extension.getURL("/sound/omnomnom.mp3");
              audio.play();
            }

            if (data.clearLocalStorage) {
              chrome.tabs.executeScript({ code: "localStorage.clear();" });
            }

            if (data.clearSessionStorage) {
              chrome.tabs.executeScript({ code: "sessionStorage.clear();" });
            }
          }
        );

        chrome.cookies.getAll({ url: activeTab.url }, cookies => {
          if (cookies) {
            for (cookie of cookies) {
              chrome.cookies.remove({
                url: activeTab.url,
                name: cookie.name
              });
            }
          }
        });
      } else {
        message = "Cookie Monster is sad that there are no cookies";
      }

      chrome.notifications.create(
        (options = {
          type: "basic",
          iconUrl: "images/icon128.png",
          message: message,
          title: "Cookie Monster says"
        })
      );
    }
  );
});
