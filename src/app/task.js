import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AlertAsync from 'react-native-alert-async';

import { ProgressContext } from '../context/ProgressContext';
import { TasksContext } from '../context/TasksContext';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import FormulaText from '../components/FormulaText';
import IconButton from '../components/IconButton';
import NumericKeyboard from '../components/NumericKeyboard';
import RoundedContainer from '../components/RoundedContainer';
import SafeStatusBar from '../components/SafeStatusBar';

import colors from '../config/colors';
import icons from '../config/icons';
import tasksConfig from '../config/tasksConfig';

const inputPlaceholder = '?';
const radius = 40;

let numTries = 0;

const TaskScreen = () => {
  const { setTopicGrades, calculateMeanGrade } = useContext(ProgressContext);
  const { tasksType, topicId, sectionId, courseId } = useLocalSearchParams();

  const { tasks, setTasks } = useContext(TasksContext);
  const [taskIndex, setTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState(inputPlaceholder);

  const task = tasks[taskIndex];
  const numTasks = tasks.length;
  const isLastTask = () => taskIndex === numTasks - 1;

  const finish = () => {
    const stats = buildStats(tasks);
    setTopicGrades(stats, tasksType === 'EXAM');

    router.replace({
      pathname: '/answersFinal',
      params: {
        scoreValue: calculateMeanGrade(stats),
        tasksType: tasksType,
        sectionId: sectionId,
        courseId: courseId,
        topicId: topicId,
      },
    });
  };

  const getButtonTitle = () => {
    return isLastTask() ? 'Pabaigti' : 'Sekanti užduotis';
  };

  const getPrimaryButton = () => {
    return (
      <AppButton
        color={isLastTask() ? 'secondary' : 'primary'}
        icon={icons.arrowRight}
        onPress={handleNext}
        style={styles.buttonNext}
        title={getButtonTitle()}
      />
    );
  };

  const getTitle = () => 'Užduotis ' + (taskIndex + 1) + ' iš ' + numTasks;

  const goToIndex = (index) => {
    setUserInput(inputPlaceholder);
    setTaskIndex(index);
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

  const handleClosePress = () => {
    return Alert.alert('Ar tikrai nori nutraukti sprendimus?', null, [
      { text: 'Ne' },
      {
        text: 'Taip',
        onPress: () => {
          finish();
        },
      },
    ]);
  };

  const handleNext = async () => {
    if (userInput === inputPlaceholder) {
      return Alert.alert('Įvesk atsakymą');
    }

    if (numTries === 0) {
      saveTasks();
    }

    if (tasksConfig.SHOW_HELP_WHEN_INCORRECT) {
      const correct = task.values.C;
      if (userInput !== correct) {
        numTries++;

        return numTries === 1
          ? AlertAsync(`Atsakymas yra neteisingas`)
          : AlertAsync(`Teisingas atsakymas yra ${correct}`).then(() =>
              setUserInput(correct)
            );
      }
    }

    numTries = 0;
    navigateNext();
  };

  const handleNumericPress = (number) => {
    userInput === inputPlaceholder
      ? setUserInput(number)
      : setUserInput(userInput * 10 + number);
  };

  const navigateNext = () => {
    isLastTask() ? finish() : goToIndex(taskIndex + 1);
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

  function buildStats(tasks) {
    const topics = [];

    tasks.forEach((task) => {
      let topic = topics.find((topic) => topic.id === task.topic.getId());
      if (!topic) {
        topic = {
          id: task.topic.getId(),
          name: task.topic.getName(),
          numCorrect: 0,
          numIncorect: 0,
        };

        topics.push(topic);
      }

      topic.numCorrect += task.isCorrect;
      topic.numIncorect += !task.isCorrect;
      topic.grade =
        topic.numCorrect / (topic.numCorrect + topic.numIncorect) || 0;
    });

    return topics;
  }

  if (!task) return null;

  return (
    <View style={styles.container}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainer isPrimary bl br style={styles.containerTop}>
        <View style={{ justifyContent: 'center' }}>
          <AppText style={styles.title}>{getTitle()}</AppText>
          <IconButton
            name={icons.close}
            onPress={handleClosePress}
            style={{ position: 'absolute', right: 0 }}
          />
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

export default TaskScreen;

const styles = StyleSheet.create({
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
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    flex: 1,
  },
  containerFormula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  containerTop: {
    paddingBottom: radius / 2,
    paddingHorizontal: radius / 2,
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    alignSelf: 'center',
    color: colors.WHITE,
  },
});
