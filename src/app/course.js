import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { router, useLocalSearchParams } from 'expo-router';

import { ProgressContext } from '../context/ProgressContext.js';
import { TasksContext } from '../context/TasksContext.js';

import AppButton from '../components/AppButton.js';
import AppText from '../components/AppText.js';
import IconButton from '../components/IconButton.js';
import ListItemSeparator from '../components/ListItemSeparator.js';
import RoundedContainer from '../components/RoundedContainer.js';
import RoundedContainerAnother from '../components/RoundedContainerAnother.js';
import SafeStatusBar from '../components/SafeStatusBar.js';
import SectionTitle from '../components/SectionTitle.js';
import TopicName from '../components/TopicName.js';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text.js';
import taskNumbers from '../config/taskNumbers.js';

import school from '../data/school.js';

const NUM_TASKS_IN_EXAM_PER_TOPIC = taskNumbers.NUM_TASKS_IN_EXAM_PER_TOPIC;

const isOdd = (num) => num % 2;

const CourseScreen = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const { courseId } = useLocalSearchParams();
  const course = school.findCourseById(courseId);

  const {
    courses,
    canTakeExam,
    clearProgress,
    getExamGrade,
    getTopicGrade,
    tookInitialExam,
    userHasMasteredSection,
  } = useContext(ProgressContext);

  const handleTestButtonClick = (sectionId, tasksType) => {
    const tasks = school
      .findCourseById(courseId)
      .findSectionById(sectionId)
      .buildExam(NUM_TASKS_IN_EXAM_PER_TOPIC)
      .flat();

    setTasks(tasks);

    router.push({
      pathname: '/task',
      params: {
        tasksType: tasksType,
        courseId: courseId,
        sectionId: sectionId,
      },
    });
  };

  const getTakeTestButton = (sectionId) => {
    return (
      <AppButton
        style={styles.button}
        title="Pasitikrink, ar moki?"
        color="primary"
        onPress={() => handleTestButtonClick(sectionId, 'INITIAL_TEST')}
      />
    );
  };

  const getTakeExamButton = (sectionId) => {
    return (
      <AppButton
        style={styles.button}
        title={
          userHasMasteredSection(sectionId)
            ? 'nori perlaikyti?'
            : 'laikyk egzaminą'
        }
        color="secondary"
        onPress={() => handleTestButtonClick(sectionId, 'EXAM')}
      />
    );
  };

  const getSectionTitle = (title, color, sectionId) => {
    return (
      <SectionTitle
        title={title}
        color={color}
        showCheckmark={userHasMasteredSection(sectionId)}
        subtitle={
          tookInitialExam(sectionId) && !userHasMasteredSection(sectionId)
            ? canTakeExam(sectionId)
              ? 'Pabandyk išlaikyti egzaminą'
              : 'Pasimokink'
            : null
        }
        someComponent={
          !tookInitialExam(sectionId) || userHasMasteredSection(sectionId) ? (
            <StarRatingDisplay
              starSize={16}
              rating={getExamGrade(sectionId) * 5}
            />
          ) : null
        }
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SafeStatusBar />

      <RoundedContainerAnother
        bl
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
        rightComponent={
          <IconButton
            name={icons.trashCan}
            onPress={() => {
              Alert.alert('Ar tikrai nori ištrinti visą progresą?', null, [
                { text: 'Ne' },
                {
                  text: 'Taip',
                  onPress: () => {
                    clearProgress();
                  },
                },
              ]);
            }}
          />
        }
        mainComponent={
          <AppText style={[{ color: colors.WHITE }, text.title]}>
            {course.getName()}
          </AppText>
        }
      />

      {course.getSections().map((section, is) => (
        <RoundedContainer
          key={is}
          isPrimary={isOdd(is)}
          tl={isOdd(is)}
          bl={isOdd(is) && is !== course.getSections().length - 1}
          tr={!isOdd(is)}
          br={!isOdd(is) && is !== course.getSections().length - 1}
          style={[
            { paddingBottom: 30 },
            is === course.getSections().length - 1
              ? {
                  marginLeft: 0,
                  marginRight: 0,
                  paddingBottom: 100,
                }
              : {},
          ]}>
          {getSectionTitle(
            section.getName(),
            !isOdd(is) ? colors.GRAY : colors.WHITE,
            section.getId()
          )}

          {tookInitialExam(section.getId()) &&
          !userHasMasteredSection(section.getId())
            ? section.topics.map((topic, it) => (
                <View key={it}>
                  <TopicName
                    title={topic.getName()}
                    scoreValue={Math.max(0, getTopicGrade(topic.getId()) * 5)}
                    onLight={!isOdd(is)}
                    onPress={() => {
                      router.push({
                        pathname: '/topic',
                        params: {
                          courseId: courseId,
                          sectionId: section.getId(),
                          topicId: topic.getId(),
                        },
                      });
                    }}
                  />
                  {it < section.topics.length - 1 ? (
                    <ListItemSeparator onLight={!isOdd(is)} />
                  ) : null}
                </View>
              ))
            : null}

          {!tookInitialExam(section.getId())
            ? getTakeTestButton(section.getId())
            : null}
          {canTakeExam(section.getId())
            ? getTakeExamButton(section.getId())
            : null}
        </RoundedContainer>
      ))}
    </ScrollView>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  container: {
    backgroundColor: colors.VIOLET,
  },
});
