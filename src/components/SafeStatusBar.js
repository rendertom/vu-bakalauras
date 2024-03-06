import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { getStatusBarHeight } from 'react-native-safearea-height';

const SafeStatusBar = ({ iosHidden = false, backgroundColor }) => {
  const box = () => (
    <View
      style={{
        height: getStatusBarHeight(),
        backgroundColor: backgroundColor,
      }}></View>
  );

  if (Platform.OS === 'ios') {
    if (iosHidden) return null;
    return box();
  } else {
    return (
      <>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        {box()}
      </>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    height: getStatusBarHeight(),
    backgroundColor: 'red',
  },
});
export default SafeStatusBar;
