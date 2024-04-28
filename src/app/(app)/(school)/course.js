import { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import StorageService from '../../../services/StorageService.js';
import { ProgressContext } from '../../../context/ProgressContext.js';

import AppButton from '../../../components/AppButton.js';
import AppText from '../../../components/AppText.js';
import IconButton from '../../../components/IconButton.js';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother.js';
import SafeStatusBar from '../../../components/SafeStatusBar.js';
import SectionBlock from '../../../components/SectionBlock.js';

import colors from '../../../config/colors.js';
import icons from '../../../config/icons.js';
import text from '../../../config/text.js';

import school from '../../../data/school.js';

const CourseScreen = () => {
  const { courseId } = useLocalSearchParams();
  const course = school.findCourseById(courseId);
  const numSections = course.getSections().length;

  const { clearProgress, userHasMasteredSection } = useContext(ProgressContext);

  const [sequenceValue, setSequenceValue] = useState('GLOBAL');

  useEffect(() => {
    const init = async () => {
      const SEQ = await StorageService.getItem('SEQ');
      setSequenceValue(SEQ.value);
    };
    init();
  }, []);

  const getSections = () => {
    const sections = course.getSections();
    if (sequenceValue === 'GLOBAL') {
      return sections;
    } else {
      const unfinished = sections.filter(
        (section) => !userHasMasteredSection(section.getId())
      );
      return [unfinished[0]];
    }
  };

  const resetProgress = () => {
    Alert.alert('Ar tikrai nori ištrinti visą progresą?', null, [
      { text: 'Ne' },
      {
        text: 'Taip',
        onPress: () => {
          clearProgress();
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        bl
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
        rightComponent={
          <IconButton name={icons.trashCan} onPress={resetProgress} />
        }
        mainComponent={
          <AppText style={[{ color: colors.WHITE }, text.title]}>
            {course.getName()}
          </AppText>
        }
      />

      {getSections()[0] ? (
        getSections().map((section, index) => (
          <SectionBlock
            key={index}
            index={index}
            isLast={index === numSections - 1}
            section={section}
            courseId={courseId}
          />
        ))
      ) : (
        <View>
          <AppText>viskas atsiskaityta</AppText>
          <AppButton title="reset progress" onPress={resetProgress} />
        </View>
      )}

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
