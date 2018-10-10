import getOptions, {
  init as initOptions,
  saveOptions,
  updateOptions
} from '../options.js';

let initialised = false;

const addPageListener = () => {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();

      updateOptions({
        sound: document.getElementById('sound').checked,
        clearLocalStorage: document.getElementById('local-storage').checked,
        clearSessionStorage: document.getElementById('session-storage').checked
      });

      saveOptions().then(() => {
        window.alert('The options have been saved!');
      });
    });
  });
};

const setCheckboxes = () => {
  const { sound, clearLocalStorage, clearSessionStorage } = getOptions();

  document.getElementById('sound').checked = sound;
  document.getElementById('local-storage').checked = clearLocalStorage;
  document.getElementById('session-storage').checked = clearSessionStorage;
};

const init = async () => {
  addPageListener();
  await initOptions();
  setCheckboxes();
};

init();
