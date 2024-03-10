import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';
import ScoreMini from './ScoreMini';

import taskParser from '../utils/taskParser';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const getColor = (value) => (value > 0 ? colors.VIOLET : colors.GRAY_LIGHT);

const HistoryItem = ({ date, tasks }) => {
  const stats = taskParser.getStats(tasks);
  const { score, count, numCorrect, numIncorrect } = stats.general;

  return (
    <View style={styles.container}>
      <ScoreMini value={score} style={{ paddingRight: 10 }} />
      <View style={[styles.row, styles.spaced]}>
        <View>
          <AppText>
            {count} ({numCorrect}/{numIncorrect})
          </AppText>

          <AppText style={[text.subtitle, { color: colors.GRAY }]}>
            {new Date(date).toLocaleString('lt-LT')}
          </AppText>
        </View>

        <View style={styles.row}>
          <AppIcon
            color={getColor(stats.additions.count)}
            name={icons.addition}
          />
          <AppIcon
            color={getColor(stats.subtractions.count)}
            name={icons.subtraction}
          />
          <AppIcon
            color={getColor(stats.multiplications.count)}
            name={icons.multiplication}
          />
          <AppIcon
            color={getColor(stats.divisions.count)}
            name={icons.division}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  spaced: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default HistoryItem;
