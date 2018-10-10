import getOptions, { init as initOptions } from './options.js';
import * as permissions from './permissions.js';

const clearData = activeTab =>
  new Promise(resolve => {
    const { sound, clearLocalStorage, clearSessionStorage } = getOptions();

    if (sound) {
      const audio = new Audio();

      audio.src = chrome.extension.getURL('/sound/omnomnom.mp3');
      audio.play();
    }

    if (clearLocalStorage) {
      chrome.tabs.executeScript({ code: 'localStorage.clear();' });
    }

    if (clearSessionStorage) {
      chrome.tabs.executeScript({ code: 'sessionStorage.clear();' });
    }

    chrome.cookies.getAll({ url: activeTab.url }, cookies => {
      if (cookies) {
        cookies.map(cookie => {
          console.log(cookie);
          chrome.cookies.remove({ url: activeTab.url, name: cookie.name });
        });
      }
      resolve();
    });
  });

const notify = message =>
  new Promise(resolve =>
    chrome.notifications.create(
      undefined,
      {
        type: 'basic',
        iconUrl: '../images/icon128.png',
        title: 'Cookie Monster says',
        message
      },
      resolve
    )
  );

const init = async () => {
  await initOptions();

  chrome.browserAction.onClicked.addListener(activeTab => {
    const wantedPermissions = {
      permissions: ['activeTab', 'cookies'],
      origins: [activeTab.url]
    };

    permissions
      .obtain(wantedPermissions)
      .then(() => clearData(activeTab))
      .then(() => notify('Omnomnomnom'))
      .then(() => permissions.remove(wantedPermissions))
      .catch(() => notify('Cookie Monster is sad that there are no cookies'));
  });
};

export default init;
