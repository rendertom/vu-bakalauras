import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { ProgressContext } from '../context/ProgressContext';
import { TasksContext } from '../context/TasksContext';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import FormulaText from '../components/FormulaText';
import NumericKeyboard from '../components/NumericKeyboard';
import RoundedContainer from '../components/RoundedContainer';
import SafeStatusBar from '../components/SafeStatusBar';

import colors from '../config/colors';
import icons from '../config/icons';

const inputPlaceholder = '?';
const radius = 40;

const TaskScreen = () => {
  const { setTopicGrades, calculateMeanGrade } = useContext(ProgressContext);
  const { tasksType, topicId, sectionId, courseId } = useLocalSearchParams();

  const { tasks, setTasks } = useContext(TasksContext);
  const [taskIndex, setTaskIndex] = useState();
  const [userInput, setUserInput] = useState();

  const task = tasks[taskIndex];
  const numTasks = tasks.length;
  const isLastTask = () => taskIndex === numTasks - 1;

  useState(() => {
    const taskIndex = 0;
    setTaskIndex(taskIndex);
    setUserInput(
      typeof tasks[taskIndex].userInput !== 'undefined'
        ? tasks[taskIndex].userInput
        : inputPlaceholder
    );
  }, []);

  const getButtonTitle = () => {
    return isLastTask() ? 'Pabaigti' : 'Sekanti užduotis';
  };

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

  const handleNext = () => {
    if (userInput === inputPlaceholder) {
      return Alert.alert('Enter number');
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
    if (isLastTask()) {
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
    } else {
      goToIndex(taskIndex + 1);
    }
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
        color={isLastTask() ? 'secondary' : 'primary'}
        icon={icons.arrowRight}
        onPress={handleNext}
        style={styles.buttonNext}
        title={getButtonTitle()}
      />
    );
  };

  const getTitle = () => 'Užduotis ' + (taskIndex + 1) + ' iš ' + numTasks;

  if (!task) return null;

  return (
    <View style={styles.container}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainer isPrimary bl br style={styles.containerTop}>
        <AppText style={styles.title}>{getTitle()}</AppText>
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
