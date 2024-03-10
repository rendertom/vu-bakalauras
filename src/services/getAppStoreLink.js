import { Platform } from 'react-native';

import { appleAppID, packageName } from '../../app.json';

const getAppStoreLink = () => {
  const appStoreLink = `itms-apps://apps.apple.com/us/app/id${appleAppID}?mt=8`;
  const googleStoreLink = `market://details?id=${packageName}`;

  return Platform.OS === 'ios' ? appStoreLink : googleStoreLink;
};

export default getAppStoreLink;
