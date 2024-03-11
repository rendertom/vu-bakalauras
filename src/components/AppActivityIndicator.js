import React from 'react';
import { ActivityIndicator as AI, View, StyleSheet } from 'react-native';

import colors from '../config/colors';

function AppActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <AI size="large" color={colors.WHITE} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: colors.VIOLET,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    opacity: 0.8,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});

export default AppActivityIndicator;
