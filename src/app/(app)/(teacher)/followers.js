import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';

import AppActivityIndicator from '../../../components/AppActivityIndicator';
import AppText from '../../../components/AppText';
import FollowersListItem from '../../../components/FollowersListItem';
import IconButton from '../../../components/IconButton';
import ListItemSeparator from '../../../components/ListItemSeparator';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';

import colors from '../../../config/colors';
import connectionStatus from '../../../config/connectionStatus';
import icons from '../../../config/icons';
import text from '../../../config/text';

import firebaseClient from '../../../api/firebaseClient';

const FollowersTeacher = () => {
  const { user } = useContext(AuthContext);
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

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
            setAccepted((prev) => [data, ...prev]);
          }
        })
      );

      setIsLoading(false);
    };
    init();
  }, []);

  const handleDeleteConnection = async (connection) => {
    setIsLoading(true);

    const { id, status } = connection;

    await firebaseClient.deleteConnection(id);

    if (status === connectionStatus.ACCEPTED) {
      setAccepted(accepted.filter((item) => item.connection.id !== id));
    } else if (status === connectionStatus.PENDING) {
      setPending(pending.filter((item) => item.connection.id !== id));
    }

    setIsLoading(false);
  };

  const handleAcceptConnection = async (connection) => {
    console.log(connection);
    setIsLoading(true);

    const newConnection = {
      ...connection,
      status: connectionStatus.ACCEPTED,
    };

    const { id } = connection;
    await firebaseClient.updateConnection(id, newConnection);

    const pendingUser = pending.find((user) => user.connection.id === id);
    pendingUser.connection = newConnection;

    setAccepted([pendingUser, ...accepted]);
    setPending(pending.filter((item) => item.connection.id !== id));

    setIsLoading(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.VIOLET, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeStatusBar />
      <AppActivityIndicator visible={isLoading} />

      <RoundedContainerAnother
        bl
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            Mokiniai
          </AppText>
        }
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
      />

      <RoundedContainer tr br>
        <SectionTitle
          color={colors.GRAY}
          title="Mokiniai"
          subtitle="Vartotojai, kurių progresą galite matyti"
        />
        {accepted.length === 0 && (
          <AppText
            style={[text.default, { alignSelf: 'center', color: colors.GRAY }]}>
            Čia nieko nėra
          </AppText>
        )}
        {accepted.map((user, index) => (
          <View key={index}>
            {index > 0 && <ListItemSeparator />}
            <FollowersListItem
              key={index}
              user={user}
              onDeletePress={() => handleDeleteConnection(user.connection)}
            />
          </View>
        ))}
      </RoundedContainer>

      <RoundedContainer
        isPrimary
        tl
        style={{ marginLeft: 0, marginRight: 0, paddintBottom: 50 }}>
        <SectionTitle
          color={colors.WHITE}
          title="Laukia patvirtinimo"
          subtitle="Vartotojai, kurių kvietimo dar nepatvirtinote"
        />
        {pending.length === 0 && (
          <AppText
            style={[
              text.default,
              { alignSelf: 'center', color: colors.WHITE },
            ]}>
            Čia nieko nėra
          </AppText>
        )}
        {pending.map((user, index) => (
          <View key={index}>
            {index > 0 && <ListItemSeparator onLight={false} />}
            <FollowersListItem
              key={index}
              user={user}
              onLight={false}
              onAcceptPress={() => handleAcceptConnection(user.connection)}
              onDeletePress={() => handleDeleteConnection(user.connection)}
            />
          </View>
        ))}
      </RoundedContainer>

      <View // fills remaining part of the screen
        style={{
          height: '100%',
          backgroundColor: colors.VIOLET,
        }}
      />
    </ScrollView>
  );
};

export default FollowersTeacher;
