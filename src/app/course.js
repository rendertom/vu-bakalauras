import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { ProgressContext } from '../context/ProgressContext.js';

import AppText from '../components/AppText.js';
import IconButton from '../components/IconButton.js';
import RoundedContainerAnother from '../components/RoundedContainerAnother.js';
import SafeStatusBar from '../components/SafeStatusBar.js';
import SectionBlock from '../components/SectionBlock.js';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text.js';

import school from '../data/school.js';
import { View } from 'react-native';

const CourseScreen = () => {
  const { courseId } = useLocalSearchParams();
  const course = school.findCourseById(courseId);
  const numSections = course.getSections().length;

  const { clearProgress } = useContext(ProgressContext);

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

      {course.getSections().map((section, index) => (
        <SectionBlock
          key={index}
          index={index}
          isLast={index === numSections - 1}
          section={section}
          courseId={courseId}
        />
      ))}

      <View // fills remaining part of the screen
        style={{
          height: '100%',
          backgroundColor: numSections % 2 ? colors.WHITE : colors.VIOLET,
        }}
      />
    </ScrollView>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.VIOLET,
  },
});
