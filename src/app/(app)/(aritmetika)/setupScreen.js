import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ActionButton from '../../../components/ActionButton';
import AppButton from '../../../components/AppButton';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerTop from '../../../components/RoundedContainerTop';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';
import ToggleButton from '../../../components/ToggleButton';

import colors from '../../../config/colors';
import defaultSetup from '../../../config/defaultSetup';
import icons from '../../../config/icons';

import { LocalizationContext } from '../../../context/LocalizationContext';
import { TasksContext } from '../../../context/TasksContext';
import { TimeContext } from '../../../context/TimeContext';

import taskBuilder from '../../../utils/taskBuilder';

const SetupScreen = () => {
  const { localizer } = useContext(LocalizationContext);
  const { startTime, setStartTime } = useContext(TimeContext);
  const { tasks, setTasks } = useContext(TasksContext);

  const [operations, setOperations] = useState(defaultSetup.operations);
  const [challenges, setChallenges] = useState(defaultSetup.challenges);
  const [numDigits1, setNumDigits1] = useState(defaultSetup.numDigits1);
  const [numDigits2, setNumDigits2] = useState(defaultSetup.numDigits2);
  const [numTasks, setNumTasks] = useState(defaultSetup.numTasks);

  const getToggleButtons = ({
    isPrimary,
    isRadioButton,
    numItemsPerLine = 1,
    setState,
    state,
  }) => {
    const buttons = [];
    const numItems = state.length;

    for (let i = 0; i < numItems; i = i + numItemsPerLine) {
      const elements = [];
      for (let j = i; j < i + numItemsPerLine && j < numItems; j++) {
        const index = j;
        const item = state[index];

        const element = (
          <ToggleButton
            key={index}
            icon={item.icon}
            isGrayscale={!isPrimary}
            isSelected={item.selected}
            subtitle={localizer.get(item.subtitle)}
            title={item.title}
            onPress={(value) => {
              const temp = [...state];
              if (isRadioButton) {
                temp.map((item) => (item.selected = false));
                temp[index].selected = true;
              } else {
                temp[index].selected = value;
              }

              setState(temp);
            }}
          />
        );
        elements.push(element);
      }
      buttons.push(
        <View key={i} style={{ flexDirection: 'row' }}>
          {elements}
        </View>
      );
    }
    return buttons;
  };

  const handleStart = () => {
    if (operations.every((item) => !item.selected)) {
      return Alert.alert(localizer.get('notifications.selectOperation'));
    } else if (challenges.every((item) => !item.selected)) {
      return Alert.alert(localizer.get('notifications.selectChallenge'));
    } else if (numDigits1.every((item) => !item.selected)) {
      return Alert.alert(localizer.get('notifications.selectNumDigits1'));
    } else if (numDigits2.every((item) => !item.selected)) {
      return Alert.alert(localizer.get('notifications.selectNumDigits2'));
    }

    const tasks = taskBuilder.buildTasks({
      challenges,
      numDigits1,
      numDigits2,
      numTasks,
      operations,
    });

    setTasks(tasks);
    setStartTime(Date.now());
    router.navigate({
      pathname: 'taskScreen',
      params: { taskIndex: 0 },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <SafeStatusBar />

      <RoundedContainerTop
        bl
        title={localizer.get('pageTitles.hello')}
        leftIconComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
        rightIconComponent={
          <IconButton
            name={icons.history}
            onPress={() => router.navigate({ pathname: 'historyScreen' })}
          />
          // <IconButton
          //   name={icons.cog}
          //   onPress={() => router.navigate({ pathname: 'settingsScreen' })}
          // />
        }
      />

      <View>
        <ActionButton
          icon={icons.arrowRight}
          onPress={handleStart}
          title={localizer.get('buttons.start')}
        />

        <RoundedContainer tr br style={{ paddingTop: 30 }}>
          <SectionTitle
            title={localizer.get('operations.title')}
            color={colors.GRAY}
          />
          {getToggleButtons({
            numItemsPerLine: 4,
            setState: setOperations,
            state: operations,
          })}
        </RoundedContainer>
      </View>
      <RoundedContainer isPrimary tl bl>
        <SectionTitle
          title={localizer.get('tasks.title')}
          color={colors.WHITE}
        />
        {getToggleButtons({
          isPrimary: true,
          numItemsPerLine: 2,
          setState: setChallenges,
          state: challenges,
        })}
      </RoundedContainer>

      <RoundedContainer tr br>
        <SectionTitle
          title={localizer.get('numDigits.title1')}
          color={colors.GRAY}
        />
        {getToggleButtons({
          numItemsPerLine: 2,
          setState: setNumDigits1,
          state: numDigits1,
        })}
      </RoundedContainer>

      <RoundedContainer isPrimary tl bl>
        <SectionTitle
          title={localizer.get('numDigits.title2')}
          color={colors.WHITE}
        />
        {getToggleButtons({
          isPrimary: true,
          numItemsPerLine: 2,
          setState: setNumDigits2,
          state: numDigits2,
        })}
      </RoundedContainer>

      <RoundedContainer tr br>
        <SectionTitle
          title={localizer.get('numTasks.title')}
          color={colors.GRAY}
        />
        {getToggleButtons({
          isRadioButton: true,
          numItemsPerLine: 2,
          setState: setNumTasks,
          state: numTasks,
        })}
      </RoundedContainer>

      <RoundedContainer isPrimary tl style={styles.containerBottom}>
        <AppButton
          icon={icons.arrowRight}
          onPress={handleStart}
          title={localizer.get('buttons.start')}
        />
      </RoundedContainer>
    </ScrollView>
  );
};

const radius = 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.VIOLET,
  },
  containerBottom: {
    paddingHorizontal: radius,
    paddingVertical: radius,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default SetupScreen;
