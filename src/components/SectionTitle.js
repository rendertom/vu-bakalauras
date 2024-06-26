import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';

import text from '../config/text';
import AppIcon from './AppIcon';
import icons from '../config/icons';
import colors from '../config/colors';

const SectionTitle = ({
  title,
  color,
  subtitle,
  showAlertmark,
  showCheckmark,
  someComponent,
  rightIcon,
}) => {
  return (
    <View style={[{ flexDirection: 'row' }, styles.sectionTitle]}>
      {showCheckmark ? (
        <AppIcon
          color={colors.BLUE}
          name={icons.correct}
          style={{ paddingRight: 10 }}
        />
      ) : null}
      {showAlertmark ? (
        <AppIcon
          color={colors.PINK}
          name={icons.alert}
          style={{ paddingRight: 10 }}
        />
      ) : null}

      <View style={{ flex: 1 }}>
        <AppText style={[text.sectionTitle, { color }]}>{title}</AppText>
        {subtitle ? (
          <AppText style={[text.subtitle, { color }]}>{subtitle}</AppText>
        ) : null}
        {someComponent}
      </View>

      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
});

export default SectionTitle;
