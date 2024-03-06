import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';

const radius = 40;

const RoundedContainer = ({
  children,
  isPrimary,
  style,
  tl,
  tr,
  bl,
  br,
  style_inner,
}) => (
  <View
    style={[
      {
        backgroundColor: isPrimary ? colors.WHITE : colors.VIOLET,
      },
      style_inner,
    ]}>
    <View
      style={[
        bl && styles.bl,
        br && styles.br,
        tl && styles.tl,
        tr && styles.tr,
        (tl || bl) && { marginLeft: 10 },
        (tr || br) && { marginRight: 10 },
        { backgroundColor: !isPrimary ? colors.WHITE : colors.VIOLET },
        { paddingHorizontal: 10, paddingVertical: 10 },
        { overflow: 'hidden' },
        style,
      ]}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  bl: {
    borderBottomLeftRadius: radius,
  },
  br: {
    borderBottomRightRadius: radius,
  },
  tl: {
    borderTopLeftRadius: radius,
  },
  tr: {
    borderTopRightRadius: radius,
  },
});

export default RoundedContainer;
