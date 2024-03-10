import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';

import colors from '../config/colors';
import shadow from '../config/shadow';
import text from '../config/text';

const ToggleButton = ({
  icon,
  isGrayscale,
  isSelected,
  onPress,
  subtitle,
  title,
}) => {
  const getBackgroundColor = () =>
    isSelected
      ? colors.YELLOW
      : isGrayscale
      ? colors.GRAY_LIGHT
      : colors.VIOLET_DARK;

  const getForegroundColor = () =>
    isSelected
      ? isGrayscale
        ? colors.WHITE
        : colors.VIOLET
      : isGrayscale
      ? colors.GRAY
      : colors.WHITE;

  const getShadow = () =>
    isSelected &&
    (Platform.OS === 'android'
      ? shadow
      : { ...shadow, shadowColor: colors.YELLOW });

  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress(!isSelected)}>
      <View
        style={[
          styles.toggleButton,
          { backgroundColor: getBackgroundColor() },
          getShadow(),
        ]}>
        {icon && (
          <AppIcon
            name={icon}
            size="large"
            style={{ color: getForegroundColor() }}
          />
        )}

        {title && (
          <AppText
            style={[text.toggleButtonTitle, { color: getForegroundColor() }]}>
            {title}
          </AppText>
        )}

        {subtitle && (
          <AppText style={[text.subtitle, { color: getForegroundColor() }]}>
            {subtitle}
          </AppText>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    borderRadius: 20,
    flex: 1,
    margin: 5,
    padding: 10,
  },
});

export default ToggleButton;
