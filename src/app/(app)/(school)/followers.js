import { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { router } from 'expo-router';

import { AuthContext } from '../../../context/AuthContext';

import AppActivityIndicator from '../../../components/AppActivityIndicator';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
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
import userType from '../../../config/userType';

import firebaseClient from '../../../api/firebaseClient';

const FollowersStudent = () => {
  const { user } = useContext(AuthContext);
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      const connections = await firebaseClient.getConnectionsBy(
        'studentId',
        user.uid
      );

      await Promise.all(
        connections.map(async (connection) => {
          const teacher = await firebaseClient.getUser(connection.teacherId);

          const data = { ...teacher.data(), connection };

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

  const handleInviteClick = async () => {
    if (!email) {
      return Alert.alert('Prašom įvesti E-paštą');
    }

    setIsLoading(true);
    const teacher = await firebaseClient.getUserByEmailAndType(
      email,
      userType.TEACHER
    );

    if (!teacher) {
      setIsLoading(false);
      return Alert.alert('Vartotojas neegzistuoja');
    }

    if (accepted.some((user) => user.connection.teacherId === teacher.uid)) {
      setIsLoading(false);
      return Alert.alert('Vartotojas jau įtrauktas į sąrašą');
    }

    if (pending.some((user) => user.connection.teacherId === teacher.uid)) {
      setIsLoading(false);
      return Alert.alert('Pakvietimas jau buvo išsiųstas anksčiau');
    }

    const connection = {
      id: Date.now().toString(),
      status: connectionStatus.PENDING,
      studentId: user.uid,
      teacherId: teacher.uid,
    };

    await firebaseClient.createConnection(connection);

    setPending([{ ...teacher, connection }, ...pending]);

    setIsLoading(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.VIOLET, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeStatusBar />
      <AppActivityIndicator visible={isLoading} />

      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            Mokytojai
          </AppText>
        }
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
      />

      <RoundedContainer tr br>
        <SectionTitle
          color={colors.GRAY}
          title="Mokytojai"
          subtitle="Vartotojai, kurie gali matyti jūsų progresą"
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

      <RoundedContainer isPrimary tl bl>
        <SectionTitle
          color={colors.WHITE}
          title="Laukia patvirtinimo"
          subtitle="Vartotojai, kurie dar nepatvirtino jūsų kvietimo"
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
              onDeletePress={() => handleDeleteConnection(user.connection)}
            />
          </View>
        ))}
      </RoundedContainer>

      <RoundedContainer
        tr
        style={{ marginLeft: 0, marginRight: 0, paddintBottom: 50 }}>
        <SectionTitle color={colors.GRAY} title="Pakviest mokytoją" />
        <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
          <AppTextInput
            placeholder="E-paštas"
            value={email}
            onChangeText={setEmail}
            onc
            style={{ marginHorizontal: 20 }}
          />
          <AppButton
            title="siųsk kvietimą"
            onPress={handleInviteClick}
            style={{ paddingTop: 20, paddingBottom: 50, width: '80%' }}
          />
        </View>
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

export default FollowersStudent;
