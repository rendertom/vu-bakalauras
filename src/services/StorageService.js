import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
  getItem: (key, fallback) => {
    return AsyncStorage.getItem(key)
      .then((result) => (result === null ? fallback : JSON.parse(result)))
      .catch((error) => console.log('could not get storage:', error));
  },

  removeItem: (key) => {
    AsyncStorage.removeItem(key).catch((error) =>
      console.log('could not remove storage:', error)
    );
  },

  setItem: (key, object) => {
    AsyncStorage.setItem(key, JSON.stringify(object)).catch((error) =>
      console.log('could not remove storage:', error)
    );
  },
};

export default StorageService;
