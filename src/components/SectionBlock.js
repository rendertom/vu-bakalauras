import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import StorageService from '../services/StorageService.js';

import { ProgressContext } from '../context/ProgressContext.js';
import { TasksContext } from '../context/TasksContext.js';

import AppButton from '../components/AppButton.js';
import IconButton from '../components/IconButton.js';
import ListItemSeparator from '../components/ListItemSeparator.js';
import RoundedContainer from '../components/RoundedContainer.js';
import SectionTitle from '../components/SectionTitle.js';
import StarRating from './StarRating.js';
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
  const [sequenceValue, setSequenceValue] = useState('GLOBAL');

  useEffect(() => {
    const init = async () => {
      const SEQ = await StorageService.getItem('SEQ');
      setSequenceValue(SEQ.value);
    };
    init();
  }, []);

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
    if (userHasMasteredSection(sectionId) && isOpen) {
      return (
        <AppButton
          style={[styles.button, { paddingHorizontal: 80 }]}
          title={'nori perlaikyti?'}
          color="secondary"
          onPress={() => handleTestButtonClick(sectionId, 'EXAM')}
        />
      );
    } else if (!userHasMasteredSection(sectionId)) {
      return (
        <AppButton
          style={styles.button}
          title="laikyk egzaminą"
          color="secondary"
          onPress={() => handleTestButtonClick(sectionId, 'EXAM')}
        />
      );
    }
  };

  const getSectionTitle = (title, color, sectionId, iconBGColor) => {
    return (
      <SectionTitle
        title={title}
        color={color}
        showCheckmark={userHasMasteredSection(sectionId)}
        showAlertmark={tookInitialExam(sectionId) && !canTakeExam(sectionId)}
        subtitle={
          shouldBeOpen
            ? canTakeExam(sectionId)
              ? 'Pabandyk išlaikyti egzaminą'
              : 'Pasimokyk'
            : null
        }
        someComponent={
          !shouldBeOpen ? (
            <View style={{ flexDirection: 'row' }}>
              {/* <AppText style={[text.subtitle, { color: color }]}>
                {Math.max(0, Math.floor(getExamGrade(sectionId) * 10))}/10
              </AppText> */}
              <StarRating
                alignLeft
                starSize={16}
                rating={getExamGrade(sectionId) * 5}
              />
            </View>
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

  const getTopics = () => {
    const topics = section.getTopics();
    if (sequenceValue === 'GLOBAL') {
      return topics;
    } else {
      const unfinished = topics.filter(
        (topic) => getTopicGrade(topic.getId()) < 0.8
      );
      return [unfinished[0]];
    }
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

        {isOpen && getTopics()[0]
          ? getTopics().map((topic, it) => (
              <View key={it}>
                <TopicName
                  title={topic.getName()}
                  scoreValue={getTopicGrade(topic.getId())}
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
