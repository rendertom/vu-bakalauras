import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import { ProgressContext } from '../context/ProgressContext';
import { TasksContext } from '../context/TasksContext';

import AnswerItem from '../components/AnswerItem';
import AppButton from '../components/AppButton';
import AppFlatList from '../components/AppFlatList';
import AppText from '../components/AppText.js';
import IconButton from '../components/IconButton.js';
import RoundedContainer from '../components/RoundedContainer.js';
import RoundedContainerAnother from '../components/RoundedContainerAnother.js';
import SafeStatusBar from '../components/SafeStatusBar.js';

import colors from '../config/colors.js';
import icons from '../config/icons';
import text from '../config/text.js';

import school from '../data/school.js';

const MIN_GRADE_ALLOWED_FOR_EXAM = 0.8;

const AnswersFinalScreen = () => {
  const { scoreValue, tasksType, courseId, sectionId, topicId } =
    useLocalSearchParams();

  const { tasks, setTasks } = useContext(TasksContext);
  const { canTakeExam, getFailingTopicIDs } = useContext(ProgressContext);

  const isInitialTest = tasksType === 'INITIAL_TEST';
  const isSelfCheck = tasksType === 'SELF_CHECK';
  const isExam = tasksType === 'EXAM';

  const getExamFailingText = () => {
    const names = getTopicNamesFailing();
    const count = names.length;
    return `Dar reikia pasimokinti. Grįžk atgal ir pasikartok${
      count === 1 ? '' : ' ' + count
    } ${pluralize(count, 'temą', 'temas')} ${names.join(', ')}.`;
  };

  const getSectionName = () =>
    school.findCourseById(courseId).findSectionById(sectionId).getName();

  const getText = () => {
    if (isInitialTest) {
      return godGoodGrade()
        ? `Puikiai padirbėta! Tu gerai moki skyrių "${getSectionName()}". Pamėgink išlaikyti egzaminą!`
        : getExamFailingText();
    }

    if (isSelfCheck) {
      return godGoodGrade()
        ? canTakeExam(sectionId)
          ? `Puikiai padirbėta! Tu gerai moki temą "${getTopicName()}". Pamėgink išlaikyti egzaminą!`
          : `Puikiai padirbėta! Tu gerai moki temą "${getTopicName()}". Pasimokink sekančią temą!`
        : `Dar reikia pasimokinti. Grįžk atgal ir pasikartok temą "${getTopicName()}".`;
    }

    if (isExam) {
      return godGoodGrade()
        ? `Puikiai padirbėta! Tu gerai išmokai skyrių "${getSectionName()}"`
        : getExamFailingText();
    }
  };

  const getTitle = () => {
    return scoreValue < 0.45
      ? 'Prastai 😭'
      : scoreValue >= 0.45 && scoreValue < 0.75
      ? 'Neblogai 🥲'
      : scoreValue >= 0.75 && scoreValue < 0.95
      ? 'Gerai 😌'
      : 'Puikiai 😁';
  };

  const getTopicName = () => {
    return school
      .findCourseById(courseId)
      .findSectionById(sectionId)
      .findTopicById(topicId)
      .getName();
  };

  const getTopicNamesFailing = () => {
    return getFailingTopicIDs(sectionId).map((topicId) => {
      return (
        '"' +
        school
          .findCourseById(courseId)
          .findSectionById(sectionId)
          .findTopicById(topicId)
          .getName() +
        '"'
      );
    });
  };

  const godGoodGrade = () => scoreValue >= MIN_GRADE_ALLOWED_FOR_EXAM;

  const handleClose = () => {
    if (godGoodGrade() && (isSelfCheck || scoreValue)) {
      router.navigate({
        pathname: '/course',
        params: {
          courseId: courseId,
        },
      });
    } else {
      router.back();
    }
  };

  const handleTakeExam = () => {
    setTasks(
      school
        .findCourseById(courseId)
        .findSectionById(sectionId)
        .buildExam(1)
        .flat()
    );

    router.replace({
      pathname: '/task',
      params: {
        tasksType: 'EXAM',
        courseId: courseId,
        sectionId: sectionId,
      },
    });
  };

  const pluralize = (count, singular, plural) =>
    count === 1 ? singular : plural;

  return (
    <View style={styles.container}>
      <SafeStatusBar />

      <RoundedContainerAnother
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
        mainComponent={
          <AppText style={[{ color: colors.WHITE }, text.title]}>
            {getTitle()}
          </AppText>
        }
        subComponent={<StarRatingDisplay rating={scoreValue * 5} />}
      />

      <View style={styles.infoBlock}>
        <AppText style={styles.text}>{getText()}</AppText>

        {canTakeExam(sectionId) && !isExam ? (
          <AppButton
            color="secondary"
            onPress={handleTakeExam}
            style={{ padding: 20 }}
            title={'Laikyk egzaminą'}
          />
        ) : null}
      </View>

      <View style={{ flex: 1, paddingTop: 20 }}>
        <AppButton
          icon={godGoodGrade() ? icons.close : null}
          iconLeft={godGoodGrade() ? null : icons.arrowLeft}
          onPress={handleClose}
          style={styles.buttonClose}
          title={godGoodGrade() ? 'Uždaryti' : 'Grįžk atgal'}
        />

        <RoundedContainer tl tr style={styles.containerBottom}>
          <AppFlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <AnswerItem index={index} task={item} />
            )}
          />
        </RoundedContainer>
      </View>
    </View>
  );
};

export default AnswersFinalScreen;

const styles = StyleSheet.create({
  buttonClose: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '50%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.VIOLET,
  },
  containerBottom: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  infoBlock: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.GRAY_LIGHT,
    textAlign: 'center',
  },
});
