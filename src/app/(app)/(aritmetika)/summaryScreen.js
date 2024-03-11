import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ActionButton from '../../../components/ActionButton';
import AppButton from '../../../components/AppButton';
import RoundedContainer from '../../../components/RoundedContainer';
import SafeStatusBar from '../../../components/SafeStatusBar';
import Score from '../../../components/Score';
import ScoreBox from '../../../components/ScoreBox';
import SectionTitle from '../../../components/SectionTitle';

import { LocalizationContext } from '../../../context/LocalizationContext';
import { TasksContext } from '../../../context/TasksContext';
import { TimeContext } from '../../../context/TimeContext';

import colors from '../../../config/colors';
import icons from '../../../config/icons';

import { storeData } from '../../../services/historyHandler.js';

import taskParser from '../../../utils/taskParser';
import timer from '../../../utils/timer';

const radius = 40;

const SummaryScreen = () => {
  const { localizer } = useContext(LocalizationContext);

  const { startTime, setStartTime } = useContext(TimeContext);
  const [time, setTime] = useState(timer.getTime(startTime, Date.now()));

  const { tasks, setTasks } = useContext(TasksContext);
  const [stats, setStats] = useState(taskParser.getStats(tasks));

  useEffect(() => {
    storeData({ tasks, date: Date.now() });
  }, []);

  const beautifyNumber = (number) =>
    Number.isInteger(number) ? number : number.toFixed(2);

  const handleShowResults = () =>
    router.navigate({ pathname: 'answersFinalScreen' });

  const handleTryAgain = () => router.navigate({ pathname: 'setupScreen' });

  return (
    <ScrollView style={styles.container}>
      <SafeStatusBar />

      <RoundedContainer isPrimary bl style={styles.containerTop}>
        <Score value={beautifyNumber(stats.general.score)} />
      </RoundedContainer>

      <View>
        <ActionButton
          icon={icons.reload}
          onPress={handleTryAgain}
          title={localizer.get('buttons.tryAgain')}
        />
        <RoundedContainer tr br style={{ paddingTop: 30 }}>
          <SectionTitle
            title={localizer.get('results.title')}
            color={colors.GRAY}
          />
          <View style={{ flexDirection: 'row' }}>
            <ScoreBox
              icon={icons.correct}
              isGrayscale
              title={stats.general.numCorrect}
              subtitle={localizer.get('results.correct')}
              iconColor={colors.CORRECT}
            />
            <ScoreBox
              icon={icons.incorrect}
              isGrayscale
              title={stats.general.numIncorrect}
              subtitle={localizer.get('results.incorrect')}
              iconColor={colors.WRONG}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <ScoreBox
              icon={icons.list}
              isGrayscale
              title={stats.general.count}
              subtitle={localizer.get('results.total')}
            />
            <ScoreBox
              icon={icons.clock}
              isGrayscale
              title={time.pretty}
              subtitle={localizer.get('results.duration')}
            />
          </View>
          <AppButton
            color="secondary"
            icon={icons.list}
            onPress={handleShowResults}
            style={{ marginVertical: 5, marginHorizontal: 5 }}
            title={localizer.get('buttons.showResults')}
          />
        </RoundedContainer>
      </View>

      <RoundedContainer isPrimary tl bl>
        <SectionTitle
          title={localizer.get('statistics.title')}
          color={colors.WHITE}
        />
        <View style={{ flexDirection: 'row' }}>
          <ScoreBox
            icon={icons.addition}
            isDisabled={!stats.additions.count}
            subtitle={
              stats.additions.numCorrect + ' / ' + stats.additions.count
            }
            title={beautifyNumber(stats.additions.score) + '%'}
          />
          <ScoreBox
            icon={icons.subtraction}
            isDisabled={!stats.subtractions.count}
            subtitle={
              stats.subtractions.numCorrect + ' / ' + stats.subtractions.count
            }
            title={beautifyNumber(stats.subtractions.score) + '%'}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ScoreBox
            icon={icons.multiplication}
            isDisabled={!stats.multiplications.count}
            subtitle={
              stats.multiplications.numCorrect +
              ' / ' +
              stats.multiplications.count
            }
            title={beautifyNumber(stats.multiplications.score) + '%'}
          />
          <ScoreBox
            icon={icons.division}
            isDisabled={!stats.divisions.count}
            subtitle={
              stats.divisions.numCorrect + ' / ' + stats.divisions.count
            }
            title={beautifyNumber(stats.divisions.score) + '%'}
          />
        </View>
      </RoundedContainer>

      <RoundedContainer tr br bl style={styles.containerBottom}>
        <AppButton
          icon={icons.reload}
          onPress={handleTryAgain}
          style={styles.button}
          title={localizer.get('buttons.tryAgain')}
        />
        <AppButton
          color="secondary"
          icon={icons.list}
          onPress={handleShowResults}
          style={styles.button}
          title={localizer.get('buttons.showResults')}
        />
      </RoundedContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  container: {
    backgroundColor: colors.VIOLET,
  },
  containerBottom: {
    paddingHorizontal: radius,
    paddingVertical: radius,
    marginLeft: 0,
    marginRight: 0,
  },
  containerTop: {
    paddingBottom: radius + 10,
    marginLeft: 0,

    alignItems: 'center',
  },
});

export default SummaryScreen;
