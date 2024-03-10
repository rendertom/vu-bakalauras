import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'tasksHistory';

const getData = () => {
  return AsyncStorage.getItem(KEY)
    .then((result) => (result === null ? [] : JSON.parse(result)))
    .catch((error) => console.log('could not get history:', error));
};

const removeItem = () => {
  AsyncStorage.removeItem(KEY).catch((error) =>
    console.log('could not remove history:', error)
  );
};

const storeData = (obj) => {
  getData()
    .then((array) => {
      array.push(obj);
      AsyncStorage.setItem(KEY, JSON.stringify(array));
    })
    .catch((error) => console.log('could not add to history:', error));
};

module.exports = {
  getData,
  removeItem,
  storeData,
};
