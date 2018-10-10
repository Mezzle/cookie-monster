const optionKeys = ['sound', 'clearLocalStorage', 'clearSessionStorage'];
let options = {};
let initialised = false;

export const updateOptions = newOptions => {
  options = { ...options, ...newOptions };

  return options;
};

const subscribeToStorageChanges = () => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== 'sync') {
      return;
    }

    let updatedOptions = {};

    for (let [key, change] of Object.entries(changes)) {
      if (optionKeys.includes(key)) {
        updatedOptions[key] = change.newValue;
      }
    }

    if (updatedOptions != {}) {
      updateOptions(updatedOptions);
    }
  });
};

const fetchOptions = () =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.get(optionKeys, data => {
      const options = updateOptions(data);

      resolve(options);
    });
  });

export const saveOptions = () =>
  new Promise(resolve => chrome.storage.sync.set(options, resolve));

export const init = async () => {
  if (!initialised) {
    await fetchOptions();
    subscribeToStorageChanges();
    initialised = true;
  }
};

const getOptions = () => options;

export default getOptions;
