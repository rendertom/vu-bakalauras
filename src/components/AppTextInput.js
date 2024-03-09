import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import colors from '../config/colors';
import text from '../config/text';

const AppTextInput = ({ ...otherPros }) => (
  <TextInput
    autoCapitalize="none"
    autoCorrect={false}
    placeholderTextColor={colors.yellow}
    {...otherPros}
    style={styles.textInput}
  />
);

const styles = StyleSheet.create({
  textInput: {
    ...text.default,
    borderColor: colors.GRAY,
    borderWidth: 1,
    color: colors.BLACK,
    margin: 5,
    padding: 10,
    width: '100%',
  },
});

export default AppTextInput;
