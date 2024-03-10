import React from 'react';
import { Easing, StyleSheet, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AppText from './AppText';

import colors from '../config/colors';
import text from '../config/text';

const Score = ({ value }) => {
  return (
    <AnimatedCircularProgress
      backgroundColor={colors.VIOLET_DARK}
      backgroundWidth={15}
      duration={1000}
      easing={Easing.out(Easing.ease)}
      fill={parseFloat(value)}
      lineCap={'round'}
      size={200}
      tintColor={colors.YELLOW}
      width={15}>
      {(fill) => (
        <View style={styles.scoreRow}>
          <AppText style={[text.finalGrade, { color: colors.WHITE }]}>
            {parseInt(fill)}
          </AppText>
          <AppText style={{ color: colors.WHITE }}>%</AppText>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  scoreRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});

export default Score;
