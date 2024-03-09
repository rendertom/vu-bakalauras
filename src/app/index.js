import { View, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

import AppButton from '../components/AppButton.js';

import colors from '../config/colors.js';
import images from '../config/images.js';

import school from '../data/school.js';

const SchoolScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={images.icon} style={styles.image} />

      <AppButton
        title="Sign In"
        onPress={() => {
          router.push({
            pathname: '/signIn',
          });
        }}
      />

      <AppButton
        title="Sign Up"
        onPress={() => {
          router.push({
            pathname: '/signUp',
          });
        }}
      />

      {school.courses.map((course, index) => (
        <AppButton
          style={styles.button}
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
    </View>
  );
};

export default SchoolScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    width: '60%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.VIOLET,
    paddingBottom: 40,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
});
