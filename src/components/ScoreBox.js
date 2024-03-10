import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';

import colors from '../config/colors';
import text from '../config/text';

const ScoreBox = ({
  icon,
  iconColor,
  isGrayscale,
  isDisabled,
  style,
  subtitle,
  title,
}) => {
  const getBackgroundColor = () =>
    isGrayscale ? colors.GRAY_LIGHT : colors.VIOLET_DARK;

  const getForegroundColor = () => {
    if (isDisabled) {
      return isGrayscale ? colors.WHITE : colors.VIOLET;
    }
    return isGrayscale ? colors.GRAY : colors.WHITE;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
        {icon && (
          <AppIcon
            name={icon}
            style={{ color: iconColor ? iconColor : getForegroundColor() }}
          />
        )}
        <AppText
          style={[text.toggleButtonTitle, { color: getForegroundColor() }]}>
          {title}
        </AppText>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <AppText style={[text.subtitle, { color: getForegroundColor() }]}>
          {subtitle}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
  },
});

export default ScoreBox;
