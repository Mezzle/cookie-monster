function clearData(activeTab) {
  chrome.storage.sync.get(
    ["sound", "clearLocalStorage", "clearSessionStorage"],
    ({ sound, clearLocalStorage, clearSessionStorage }) => {
      if (sound) {
        const audio = new Audio();
        audio.src = chrome.extension.getURL("/sound/omnomnom.mp3");
        audio.play();
      }

      if (clearLocalStorage) {
        chrome.tabs.executeScript({ code: "localStorage.clear();" });
      }

      if (clearSessionStorage) {
        chrome.tabs.executeScript({ code: "sessionStorage.clear();" });
      }
    }
  );

  chrome.cookies.getAll({ url: activeTab.url }, cookies => {
    if (cookies) {
      cookies.map(cookie =>
        chrome.cookies.remove({ url: activeTab.url, name: cookie.name })
      );
    }
  });

  return "Omnomnomnom";
}

chrome.browserAction.onClicked.addListener(activeTab => {
  chrome.permissions.request(
    {
      permissions: ["activeTab", "cookies"],
      origins: [activeTab.url]
    },
    granted => {
      let message = "Cookie Monster is sad that there are no cookies";

      if (granted) {
        clearData(activeTab);
        message = "Omnomnomnom";
      }

      chrome.notifications.create(
        (options = {
          type: "basic",
          iconUrl: "images/icon128.png",
          title: "Cookie Monster says",
          message: message
        })
      );
    }
  );
});
