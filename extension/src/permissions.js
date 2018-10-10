export const check = permissions =>
  new Promise((resolve, reject) => {
    chrome.permissions.contains(permissions, result => {
      if (result) {
        resolve();
      }

      reject();
    });
  });

export const obtain = permissions =>
  new Promise(async (resolve, reject) =>
    check(permissions)
      .then(() => resolve())
      .catch(() =>
        request(permissions)
          .then(() => resolve())
          .catch(() => reject())
      )
  );

export const request = permissions =>
  new Promise((resolve, reject) =>
    chrome.permissions.request(permissions, granted => {
      if (granted) {
        resolve();
      }

      reject();
    })
  );

export const remove = permissions =>
  new Promise((resolve, reject) =>
    chrome.permissions.remove(permissions, result => {
      if (result) {
        return resolve();
      }

      reject();
    })
  );
