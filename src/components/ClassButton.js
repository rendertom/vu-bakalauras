import { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { ProgressContext } from '../context/ProgressContext';

import AppText from './AppText';
import ScoreMini from './ScoreMini';

import colors from '../config/colors';
import text from '../config/text';

const ClassButton = ({ title, subtitle, courseId }) => {
  const { getCourseScore } = useContext(ProgressContext);

  return (
    <TouchableHighlight
      onPress={() => {
        router.push({
          pathname: '/course',
          params: { courseId: courseId },
        });
      }}
      underlayColor={colors.YELLOW}
      style={styles.toggleButton}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <ScoreMini
            value={getCourseScore(courseId) * 100}
            backgroundColor={colors.VIOLET}
            tintColor={colors.YELLOW}
            textColor={colors.GRAY_LIGHT}
          />
          <AppText style={[text.toggleButtonTitle, { color: colors.WHITE }]}>
            {title}
          </AppText>
        </View>
        <AppText
          style={[text.subtitle, { color: colors.WHITE, paddingTop: 5 }]}>
          {subtitle}
        </AppText>
      </View>
    </TouchableHighlight>
  );
};

export default ClassButton;

const styles = StyleSheet.create({
  toggleButton: {
    borderRadius: 20,
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: colors.VIOLET_DARK,
  },
});
