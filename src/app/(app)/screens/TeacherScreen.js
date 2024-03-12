import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import AppButton from '../../../components/AppButton';
import AppFlatList from '../../../components/AppFlatList';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import TeacherListItem from '../../../components/TeacherListItem';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import images from '../../../config/images';

import firebaseClient from '../../../api/firebaseClient';

const TeacherScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebaseClient.getStudents().then((users) => setUsers(users));
  }, []);

  return (
    <View style={{ backgroundColor: colors.VIOLET, flex: 1 }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        mainComponent={<Image source={images.icon} style={styles.image} />}
        rightComponent={
          <IconButton
            name={icons.account}
            onPress={() => {
              router.push({ pathname: '(teacher)/followers' });
            }}
          />
        }
      />

      <RoundedContainer tr br style={{ flex: 1 }} style_inner={{ flex: 1 }}>
        <AppFlatList
          data={users}
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
          title="logout"
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
