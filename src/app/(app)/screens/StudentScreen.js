import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';

import firebaseClient from '../../../api/firebaseClient';

import colors from '../../../config/colors';
import text from '../../../config/text';

import school from '../../../data/school';

const StudentScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <ScrollView style={{ backgroundColor: colors.VIOLET }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        mainComponent={
          <AppText
            style={[
              text.title,
              { color: colors.WHITE },
            ]}>{`Labas, ${user?.firstName} 👋`}</AppText>
        }
      />

      <RoundedContainer tr br>
        <SectionTitle
          color={colors.GRAY}
          title="Spręsk aritmetinius uždavinius"
        />
        <AppButton
          style={styles.button}
          title="matematika"
          onPress={() => {
            router.push({
              pathname: 'setupScreen',
            });
          }}
        />
      </RoundedContainer>

      <RoundedContainer isPrimary tl bl style={{ paddingBottom: 20 }}>
        <SectionTitle color={colors.GRAY_LIGHT} title="Adaptyvi mokykla" />
        {school.courses.map((course, index) => (
          <AppButton
            style={styles.buttonClass}
            color="secondary"
            key={index}
            title={course.getName()}
            onPress={() => {
              router.push({
                pathname: '/course',
                params: { courseId: course.getId() },
              });
            }}></AppButton>
        ))}
      </RoundedContainer>

      <RoundedContainer tr style={styles.containerLast}>
        <AppButton
          style={styles.button}
          title="atsiungti"
          onPress={() => {
            firebaseClient.signOut();
          }}
        />
      </RoundedContainer>
      <View // fills remaining part of the screen
        style={{
          height: '100%',
          backgroundColor: colors.WHITE,
        }}
      />
    </ScrollView>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonClass: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  containerLast: {
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
});
