import React from 'react';
import { Dimensions, StyleSheet, TouchableHighlight, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const buildIconButton = (icon, onPress) => (
  <TouchableHighlight
    onPress={onPress}
    style={[styles.button, { backgroundColor: colors.PINK }]}
    underlayColor={colors.YELLOW}>
    <AppIcon color={colors.WHITE} name={icon} />
  </TouchableHighlight>
);

const buildNumericButton = (value, onPress, _style) => (
  <TouchableHighlight
    key={value}
    onPress={onPress}
    style={[styles.button, _style]}
    underlayColor={colors.YELLOW}>
    <AppText style={[text.keyboard, { color: colors.WHITE }]}>{value}</AppText>
  </TouchableHighlight>
);

const NumericKeyboard = ({ onBackspacePress, onNumericPress }) => {
  const getButtonsFrom = (startValue) => {
    const buttons = [];
    for (let i = startValue; i < startValue + 3; i++) {
      buttons.push(buildNumericButton(i, () => onNumericPress(i)));
    }
    return buttons;
  };

  return (
    <View>
      <View style={styles.row}>{getButtonsFrom(1)}</View>
      <View style={styles.row}>{getButtonsFrom(4)}</View>
      <View style={styles.row}>{getButtonsFrom(7)}</View>
      <View style={styles.row}>
        {buildNumericButton(0, () => onNumericPress(0), styles.buttonDouble)}
        {buildIconButton(icons.backspace, onBackspacePress)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.VIOLET_DARK,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 20,
  },
  buttonDouble: {
    flex: 0,
    width: (2 / 3) * (Dimensions.get('window').width - 20) - 5 * 2,
  },
  row: {
    flexDirection: 'row',
  },
});

export default NumericKeyboard;
