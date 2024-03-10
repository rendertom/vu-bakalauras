import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import FormulaText from '../../components/FormulaText';
import IconButton from '../../components/IconButton';
import NumericKeyboard from '../../components/NumericKeyboard';
import RoundedContainer from '../../components/RoundedContainer';
import SafeStatusBar from '../../components/SafeStatusBar';

import { LocalizationContext } from '../../context/LocalizationContext';
import { TasksContext } from '../../context/TasksContext';

import colors from '../../config/colors';
import icons from '../../config/icons';

const inputPlaceholder = '?';
const radius = 40;

const TaskScreen = () => {
  const { localizer } = useContext(LocalizationContext);

  const { isEditMode, taskIndex: ti } = useLocalSearchParams();

  const { tasks, setTasks } = useContext(TasksContext);
  const [taskIndex, setTaskIndex] = useState();
  const [userInput, setUserInput] = useState();

  const task = tasks[taskIndex];
  const numTasks = tasks.length;
  const isLastTask = () => taskIndex === numTasks - 1;

  useState(() => {
    // const taskIndex = route.params.taskIndex;
    const taskIndex = parseInt(ti);
    setTaskIndex(taskIndex);
    setUserInput(
      typeof tasks[taskIndex].userInput !== 'undefined'
        ? tasks[taskIndex].userInput
        : inputPlaceholder
    );
  }, []);

  const getButtonTitle = () => {
    if (isEditMode) {
      return localizer.get('buttons.saveTask');
    }

    return isLastTask()
      ? localizer.get('buttons.finish')
      : localizer.get('buttons.nextTask');
  };

  const goToIndex = (index) => {
    const userInput = tasks[index].userInput;
    setUserInput(
      typeof userInput !== 'undefined' ? userInput : inputPlaceholder
    );
    setTaskIndex(index);
  };

  const handleBack = () => {
    isEditMode ? router.back() : goToIndex(taskIndex - 1);
  };

  const handleBackspacePress = () => {
    if (userInput !== inputPlaceholder) {
      if (userInput.toString().length === 1) {
        setUserInput(inputPlaceholder);
      } else {
        const number = Math.floor(userInput / 10);
        setUserInput(number);
      }
    }
  };

  const handleNext = () => {
    if (userInput === inputPlaceholder) {
      return Alert.alert(localizer.get('notifications.enterNumber'));
    }

    saveTasks();
    navigateNext();
  };

  const handleNumericPress = (number) => {
    userInput === inputPlaceholder
      ? setUserInput(number)
      : setUserInput(userInput * 10 + number);
  };

  const navigateNext = () => {
    if (isEditMode) {
      // HACK: Make a deep copy of 'tasks' context, otherwise
      // it does not update when navigating back to 'answersInter' screen.
      setTasks(JSON.parse(JSON.stringify(tasks)));

      router.navigate({
        pathname: 'answersInterScreen',
      });
    } else {
      isLastTask()
        ? router.replace({
            pathname: 'answersInterScreen',
          })
        : goToIndex(taskIndex + 1);
    }
  };

  const saveTasks = () => {
    const solve = task.solve;
    const correctAnswer = task.values[solve];

    task.correctAnswer = correctAnswer;
    task.isCorrect = correctAnswer === userInput;
    task.userInput = userInput;

    tasks[taskIndex] = task;
    setTasks(tasks);
  };

  const getPrimaryButton = () => {
    return (
      <AppButton
        color={isEditMode || isLastTask() ? 'secondary' : 'primary'}
        icon={isEditMode ? icons.save : icons.arrowRight}
        onPress={handleNext}
        style={styles.buttonNext}
        title={getButtonTitle()}
      />
    );
  };

  const getTitle = () =>
    localizer.get('pageTitles.task') +
    ' ' +
    (taskIndex + 1) +
    ' ' +
    localizer.get('pageTitles.outOf') +
    ' ' +
    numTasks;

  return (
    <View style={styles.container}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainer isPrimary bl br style={styles.containerTop}>
        <View style={styles.containerRow}>
          {(taskIndex > 0 || isEditMode) && (
            <IconButton
              name={icons.arrowLeft}
              onPress={handleBack}
              style={styles.buttonIcon}
            />
          )}
          <AppText style={styles.title}>{getTitle()}</AppText>
        </View>
      </RoundedContainer>

      <View style={styles.containerDisplayScreen}>
        <View style={styles.containerFormula}>
          <FormulaText task={task} userInput={userInput} />
        </View>
      </View>

      <View>
        {getPrimaryButton()}
        <RoundedContainer isPrimary tl tr style={styles.containerBottom}>
          <NumericKeyboard
            onBackspacePress={handleBackspacePress}
            onNumericPress={handleNumericPress}
          />
        </RoundedContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonIcon: {
    left: 0,
    position: 'absolute',
  },
  buttonNext: {
    alignSelf: 'center',
    position: 'absolute',
    top: -30,
    width: '80%',
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  containerBottom: {
    paddingTop: radius,
    marginLeft: 0,
    marginRight: 0,
  },
  containerDisplayScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerFormula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop: {
    paddingBottom: radius / 2,
    paddingHorizontal: radius / 2,
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    color: colors.WHITE,
  },
});

export default TaskScreen;
