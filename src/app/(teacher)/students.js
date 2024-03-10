import { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';

import AppFlatList from '../../components/AppFlatList';
import AppText from '../../components/AppText';
import IconButton from '../../components/IconButton';
import RoundedContainerAnother from '../../components/RoundedContainerAnother';
import SafeStatusBar from '../../components/SafeStatusBar';
import TeacherListItem from '../../components/TeacherListItem';

import { AuthContext } from '../../context/AuthContext';

import colors from '../../config/colors';
import icons from '../../config/icons';
import text from '../../config/text';

import firebaseClient from '../../api/firebaseClient';

const Students = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebaseClient.getStudents().then((users) => setUsers(users));
  }, []);

  return (
    <View style={{ backgroundColor: colors.WHITE, height: '100%' }}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            {user.firstName}
          </AppText>
        }
        subComponent={
          <AppText style={[text.subtitle, { color: colors.WHITE }]}>
            {user.email}
          </AppText>
        }
        rightComponent={
          <IconButton name={icons.close} onPress={firebaseClient.signOut} />
        }
      />

      <AppText style={text.sectionTitle}>Mokinių sąrašas</AppText>

      <AppFlatList
        data={users}
        renderItem={({ item: user }) => (
          <TeacherListItem
            title={`${user.firstName} ${user.lastName}`}
            subtitle={user.email}
            onPress={() => {
              router.push({
                pathname: 'exams',
                params: user,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default Students;
