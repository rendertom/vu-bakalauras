import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router, useSegments } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';

import AppButton from '../../../components/AppButton';
import AppFlatList from '../../../components/AppFlatList';
import AppActivityIndicator from '../../../components/AppActivityIndicator';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import TeacherListItem from '../../../components/TeacherListItem';

import colors from '../../../config/colors';
import connectionStatus from '../../../config/connectionStatus';
import icons from '../../../config/icons';
import images from '../../../config/images';

import firebaseClient from '../../../api/firebaseClient';

const TeacherScreen = () => {
  const segments = useSegments();

  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setStudents([]);

      const connections = await firebaseClient.getConnectionsBy(
        'teacherId',
        user.uid
      );

      await Promise.all(
        connections.map(async (connection) => {
          if (connection.status !== connectionStatus.ACCEPTED) return;
          const student = await firebaseClient.getUser(connection.studentId);
          setStudents((prev) => [student.data(), ...prev]);
        })
      );

      setIsLoading(false);
    };

    // Hack: forcing to reload each time user hits homepage
    if (segments.length === 1 && segments[0] === '(app)') {
      init();
    }
  }, [segments]);

  return (
    <View style={{ backgroundColor: colors.VIOLET, flex: 1 }}>
      <SafeStatusBar />

      <AppActivityIndicator visible={isLoading} />

      <RoundedContainerAnother
        mainComponent={<Image source={images.icon} style={styles.image} />}
        rightComponent={
          <IconButton
            name={icons.account}
            onPress={() => {
              router.navigate({ pathname: '(teacher)/followers' });
            }}
          />
        }
      />

      <RoundedContainer tr br style={{ flex: 1 }} style_inner={{ flex: 1 }}>
        <AppFlatList
          data={students}
          renderItem={({ item: user }) => (
            <TeacherListItem
              subtitle={user.email}
              title={`${user.firstName} ${user.lastName}`}
              onPress={() => {
                router.push({
                  pathname: 'exams',
                  params: user,
                });
              }}
            />
          )}
        />
      </RoundedContainer>

      <RoundedContainer isPrimary tl style={styles.containerLast}>
        <AppButton
          style={styles.button}
          title="atsijungti"
          icon={icons.logOut}
          onPress={() => {
            firebaseClient.signOut();
          }}
        />
      </RoundedContainer>
    </View>
  );
};

export default TeacherScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
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
