import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../AppText';

import text from '../../config/text';
import colors from '../../config/colors';

function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText style={[styles.error, text.subtitle]}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.PINK,
  },
});

export default AppErrorMessage;
