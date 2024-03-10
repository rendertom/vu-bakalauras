import React from 'react';
import { StyleSheet } from 'react-native';

import AppButton from './AppButton';

const ActionButton = ({ icon, onPress, title }) => {
  return (
    <AppButton
      icon={icon}
      onPress={onPress}
      style={styles.button}
      title={title}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    position: 'absolute',
    top: -30,
    width: '50%',
    zIndex: 1,
  },
});

export default ActionButton;
