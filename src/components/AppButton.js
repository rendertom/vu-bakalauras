import React, { useState } from 'react';
import { Platform, StyleSheet, View, TouchableHighlight } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';

import colors from '../config/colors';
import shadow from '../config/shadow';
import text from '../config/text';

const underlayColor = colors.YELLOW;

const AppButton = ({
  color = 'primary',
  icon,
  iconLeft,
  onPress,
  style,
  title,
}) => {
  const getColor = () =>
    color === 'primary'
      ? colors.PINK
      : color === 'secondary'
      ? colors.BLUE
      : color;

  const [shadowColor, setShadowColor] = useState({
    shadowColor: getColor(),
  });

  const changeShadowColor = (color) =>
    Platform.OS !== 'android' &&
    setShadowColor({
      shadowColor: color,
    });

  return (
    // Fix "position: absolute" by adding <View> container
    // https://github.com/software-mansion/react-native-gesture-handler/issues/1163#issuecomment-699150983
    <View style={style}>
      <TouchableHighlight
        underlayColor={underlayColor}
        onShowUnderlay={() => changeShadowColor(underlayColor)}
        onHideUnderlay={() => changeShadowColor(getColor())}
        onPress={onPress}
        style={[styles.button, { backgroundColor: getColor() }, shadowColor]}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {iconLeft && (
            <AppIcon
              color={colors.WHITE}
              name={iconLeft}
              size="small"
              style={{ paddingRight: 10 }}
            />
          )}
          <AppText style={[text.button, { color: colors.WHITE }]}>
            {title}
          </AppText>
          {icon && (
            <AppIcon
              color={colors.WHITE}
              name={icon}
              size="small"
              style={{ paddingLeft: 10 }}
            />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    ...shadow,
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
});

export default AppButton;
