import { Linking } from 'react-native';

const openURL = (link) => {
  Linking.canOpenURL(link).then(
    (supported) => {
      supported && Linking.openURL(link);
    },
    (err) => console.log(err)
  );
};

export default openURL;
