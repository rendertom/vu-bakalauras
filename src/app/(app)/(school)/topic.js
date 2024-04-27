import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import IconButton from '../../../components/IconButton';
import ImageClicker from '../../../components/ImageClicker';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import StarRating from '../../../components/StarRating';

import StorageService from '../../../services/StorageService';

import { ProgressContext } from '../../../context/ProgressContext';
import { TasksContext } from '../../../context/TasksContext';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import images from '../../../config/images';
import tasksConfig from '../../../config/tasksConfig';
import text from '../../../config/text';

import school from '../../../data/school';

const NUM_TASKS_FOR_SELF_CHECK = tasksConfig.NUM_TASKS_FOR_SELF_CHECK;

const TopicScreen = () => {
  const { courseId, sectionId, topicId } = useLocalSearchParams();
  const { tasks, setTasks } = useContext(TasksContext);
  const { getTopicGrade } = useContext(ProgressContext);

  const [MOValue, setMOValue] = useState('TEXT');

  useEffect(() => {
    const init = async () => {
      const MO = await StorageService.getItem('MO');
      setMOValue(MO.value);
    };
    init();
  }, []);

  const topic = school
    .findCourseById(courseId)
    .findSectionById(sectionId)
    .findTopicById(topicId);

  const handleClick = () => {
    const tasks = topic.buildTasks(NUM_TASKS_FOR_SELF_CHECK);

    setTasks(tasks);

    router.push({
      pathname: '/task',
      params: {
        tasksType: 'SELF_CHECK',

        courseId: courseId,
        sectionId: sectionId,
        topicId: topicId,
      },
    });
  };

  const image =
    MOValue === 'TEXT'
      ? images['placeholder-text']
      : images['placeholder-video'];

  return (
    <ScrollView style={styles.container}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainerAnother
        bl
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
        mainComponent={
          <AppText
            style={[{ color: colors.WHITE, textAlign: 'center' }, text.title]}>
            {topic.getName()}
          </AppText>
        }
        subComponent={
          <StarRating starSize={16} rating={getTopicGrade(topicId) * 5} />
        }
      />

      <RoundedContainer tr br style={{ alignItems: 'center', gap: 10 }}>
        <Image source={image} style={styles.image} />
      </RoundedContainer>

      <RoundedContainer isPrimary tl style={styles.containerLast}>
        <AppButton
          onPress={handleClick}
          title="Pasitikrink žinias"
          style={styles.button}
        />
      </RoundedContainer>
    </ScrollView>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  container: {
    backgroundColor: colors.VIOLET,
  },
  containerLast: {
    marginLeft: 0,
  },
  text: {
    ...text.subtitle,
  },
  image: {
    width: 300,
    height: 400,
  },
});
