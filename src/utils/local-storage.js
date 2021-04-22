export function localStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function storeInLocalStorage(key, data) {
  const localData = {
    data,
    time: new Date().getTime(),
  };
  localStorage.setItem(key, JSON.stringify(localData));
}

export function getFromLocalStorage(key) {
  const localData = JSON.parse(localStorage.getItem(key));
  if (localData) {
    const { time } = localData;
    const currentTime = new Date().getTime();

    if (currentTime - time < 3600000) {
      return localData;
    }
  }

  return null;
}

export default {
  storeInLocalStorage,
  getFromLocalStorage,
  localStorageAvailable,
};
