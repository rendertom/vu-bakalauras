import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from './AppText';
import RoundedContainer from './RoundedContainer';

import colors from '../config/colors';
import text from '../config/text';

const RoundedContainerTop = ({
  bl,
  leftIconComponent,
  rightIconComponent,
  title,
}) => {
  return (
    <RoundedContainer bl={bl} isPrimary style={styles.containerTop}>
      {leftIconComponent}

      <AppText style={[text.title, { color: colors.WHITE }]}>{title}</AppText>

      {rightIconComponent}
    </RoundedContainer>
  );
};

const radius = 40;

const styles = StyleSheet.create({
  containerTop: {
    paddingBottom: radius + 10,
    paddingHorizontal: radius / 2,
    marginLeft: 0,
    marginRight: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default RoundedContainerTop;
