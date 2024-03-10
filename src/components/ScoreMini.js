import React from 'react';
import { Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AppText from './AppText';

import colors from '../config/colors';
import text from '../config/text';

const size = 35;
const width = 4;

const ScoreMini = ({ value, style }) => {
  return (
    <AnimatedCircularProgress
      backgroundColor={colors.GRAY_LIGHT}
      backgroundWidth={2}
      duration={1000}
      easing={Easing.out(Easing.ease)}
      fill={value}
      lineCap={'round'}
      size={size}
      tintColor={colors.VIOLET}
      width={width}
      style={style}>
      {(fill) => (
        <AppText style={[text.subtitle, { color: colors.DARK }]}>
          {parseInt(fill)}
        </AppText>
      )}
    </AnimatedCircularProgress>
  );
};

export default ScoreMini;
