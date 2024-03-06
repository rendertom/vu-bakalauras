import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import AppIcon from './AppIcon';

import colors from '../config/colors';

const IconButton = ({ name, onPress, style, iconColor }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor={colors.YELLOW}>
      <AppIcon
        color={iconColor ? iconColor : colors.WHITE}
        name={name}
        size="small"
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.VIOLET_DARK,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    width: 35,
  },
});

export default IconButton;
