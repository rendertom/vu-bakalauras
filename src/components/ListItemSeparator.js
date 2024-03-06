import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';

const ListItemSeparator = ({ onLight = true }) => (
  <View
    style={[
      styles.separator,
      { backgroundColor: onLight ? colors.GRAY_LIGHT : colors.VIOLET_DARK },
    ]}
  />
);

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
  },
});

export default ListItemSeparator;
