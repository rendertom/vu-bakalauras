import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { router } from 'expo-router';

import { ProgressContext } from '../context/ProgressContext.js';
import { TasksContext } from '../context/TasksContext.js';

import AppButton from '../components/AppButton.js';
import IconButton from '../components/IconButton.js';
import ListItemSeparator from '../components/ListItemSeparator.js';
import RoundedContainer from '../components/RoundedContainer.js';
import SectionTitle from '../components/SectionTitle.js';
import TopicName from '../components/TopicName.js';

import colors from '../config/colors';
import icons from '../config/icons';
import tasksConfig from '../config/tasksConfig.js';

import school from '../data/school.js';

const NUM_TASKS_IN_EXAM_PER_TOPIC = tasksConfig.NUM_TASKS_IN_EXAM_PER_TOPIC;

const isOdd = (num) => num % 2;

const SectionBlock = ({ courseId, section, index, isLast }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const {
    canTakeExam,
    getExamGrade,
    getTopicGrade,
    tookInitialExam,
    userHasMasteredSection,
  } = useContext(ProgressContext);

  const [isOpen, setIsOpen] = useState(false);
  const shouldBeOpen =
    tookInitialExam(section.getId()) &&
    !userHasMasteredSection(section.getId());

  useEffect(() => {
    setIsOpen(shouldBeOpen);
  }, [shouldBeOpen]);

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

  const getSectionTitle = (title, color, sectionId, iconBGColor) => {
    return (
      <SectionTitle
        title={title}
        color={color}
        showCheckmark={userHasMasteredSection(sectionId)}
        subtitle={
          shouldBeOpen
            ? canTakeExam(sectionId)
              ? 'Pabandyk išlaikyti egzaminą'
              : 'Pasimokink'
            : null
        }
        someComponent={
          !shouldBeOpen ? (
            <StarRatingDisplay
              starSize={16}
              rating={getExamGrade(sectionId) * 5}
            />
          ) : null
        }
        rightIcon={
          <IconButton
            name={isOpen ? icons.arrowDown : icons.arrowRight}
            onPress={() => setIsOpen(!isOpen)}
            style={{ backgroundColor: iconBGColor }}
            iconColor={colors.GRAY}
          />
        }
      />
    );
  };

  return (
    <View>
      <RoundedContainer
        isPrimary={isOdd(index)}
        tl={isOdd(index)}
        bl={isOdd(index) && !isLast}
        tr={!isOdd(index)}
        br={!isOdd(index) && !isLast}
        style={[
          { paddingBottom: 30 },
          isLast
            ? {
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 50,
              }
            : {},
        ]}>
        {getSectionTitle(
          section.getName(),
          !isOdd(index) ? colors.GRAY : colors.WHITE,
          section.getId(),
          !isOdd(index) ? colors.GRAY_LIGHT : colors.VIOLET_DARK
        )}

        {isOpen
          ? section.topics.map((topic, it) => (
              <View key={it}>
                <TopicName
                  title={topic.getName()}
                  scoreValue={Math.max(0, getTopicGrade(topic.getId()) * 5)}
                  onLight={!isOdd(index)}
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
                  <ListItemSeparator onLight={!isOdd(index)} />
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
    </View>
  );
};

export default SectionBlock;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
