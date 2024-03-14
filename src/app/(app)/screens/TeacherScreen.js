import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router, useSegments } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';

import AppButton from '../../../components/AppButton';
import AppActivityIndicator from '../../../components/AppActivityIndicator';
import AppFlatList from '../../../components/AppFlatList';
import AppText from '../../../components/AppText';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import TeacherListItem from '../../../components/TeacherListItem';

import colors from '../../../config/colors';
import connectionStatus from '../../../config/connectionStatus';
import icons from '../../../config/icons';
import images from '../../../config/images';
import text from '../../../config/text';

import firebaseClient from '../../../api/firebaseClient';

const TeacherScreen = () => {
  const segments = useSegments();

  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [pending, setPending] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setPending([]);
      setStudents([]);

      const connections = await firebaseClient.getConnectionsBy(
        'teacherId',
        user.uid
      );

      await Promise.all(
        connections.map(async (connection) => {
          const student = await firebaseClient.getUser(connection.studentId);

          const data = { ...student.data(), connection };

          if (connection.status === connectionStatus.PENDING) {
            setPending((prev) => [data, ...prev]);
          } else if (connection.status === connectionStatus.ACCEPTED) {
            setStudents((prev) => [data, ...prev]);
          }
        })
      );

      setIsLoading(false);
    };

    // Hack: forcing to reload each time user hits homepage
    if (segments.length === 1 && segments[0] === '(app)') {
      init();
    }
  }, [segments]);

  const getNoContent = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <AppText style={[text.default, { paddingTop: 20 }]}>
          Jūs neturite mokinių
        </AppText>
        <AppText style={[text.subtitle, { textAlign: 'center' }]}>
          {`Iš mokinio paskyros prisidėkite mokytoją, norodydami ${user.email} e-paštą.`}
        </AppText>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: colors.VIOLET, flex: 1 }}>
      <SafeStatusBar />

      <AppActivityIndicator visible={isLoading} />

      <RoundedContainerAnother
        mainComponent={<Image source={images.icon} style={styles.image} />}
        rightComponent={
          <IconButton
            name={pending.length ? icons.accountPlus : icons.account}
            style={pending.length ? { backgroundColor: colors.PINK } : null}
            onPress={() => {
              router.navigate({ pathname: '(teacher)/followers' });
            }}
          />
        }
      />

      <RoundedContainer tr br style={{ flex: 1 }} style_inner={{ flex: 1 }}>
        {!isLoading && students.length === 0 && getNoContent()}
        {!isLoading && students.length > 0 && (
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
        )}
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
