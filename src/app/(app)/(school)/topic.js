import { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import IconButton from '../../../components/IconButton';
import ImageClicker from '../../../components/ImageClicker';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import StarRating from '../../../components/StarRating';

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
        <AppText style={styles.text}>
          Čia turėtų būti pateikta mokymosi medžiaga
        </AppText>
        <ImageClicker style={{ height: 350 }} images={images['000']} />
        <AppText style={styles.text}>
          Čia turėtų būti pateikta mokymosi medžiaga
        </AppText>
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
});
