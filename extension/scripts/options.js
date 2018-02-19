chrome.storage.sync.get(
  ["sound", "clearLocalStorage", "clearSessionStorage"],
  function(data) {
    document.getElementById("sound").checked = data.sound;
    document.getElementById("local-storage").checked = data.clearLocalStorage;
    document.getElementById("session-storage").checked =
      data.clearSessionStorage;
  }
);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    chrome.storage.sync.set(
      {
        sound: document.getElementById("sound").checked,
        clearLocalStorage: document.getElementById("local-storage").checked,
        clearSessionStorage: document.getElementById("session-storage").checked
      },
      () => {
        window.alert("The options have been saved!");
      }
    );
  });
});
