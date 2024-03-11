import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import * as Yup from 'yup';

import AppActivityIndicator from '../../../components/AppActivityIndicator';
import AppButton from '../../../components/AppButton';
import AppErrorMessage from '../../../components/forms/AppErrorMessage';
import AppForm from '../../../components/forms/AppFrom';
import AppFormField from '../../../components/forms/AppFormField';
import AppText from '../../../components/AppText';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SubmitButton from '../../../components/forms/SubmitButton';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import text from '../../../config/text';

import firebaseClient from '../../../api/firebaseClient';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  password: Yup.string().required().min(6).label('Password'),
});

const SignUp = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [isTeacher, setIsTeacher] = useState(false);

  const handleSingIn = () =>
    router.replace({
      pathname: '/signIn',
    });

  const handleSignUp = ({ email, firstName, lastName, password }) => {
    setIsLoading(true);

    const type = isTeacher ? 'TEACHER' : 'STUDENT';
    firebaseClient
      .createUser(email, firstName, lastName, password, type)
      .catch((error) => {
        console.log(error);
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            Susikurk paskyrą
          </AppText>
        }
        leftComponent={<IconButton name={icons.close} onPress={router.back} />}
      />

      <AppActivityIndicator visible={isLoading} />

      <RoundedContainer tr tl style={styles.containerBottom}>
        <AppForm
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
          }}
          onSubmit={handleSignUp}
          validationSchema={validationSchema}>
          <AppErrorMessage error={error} visible={error} />

          <View style={styles.block}>
            <AppFormField name="firstName" placeholder="Vardas" />
            <AppFormField name="lastName" placeholder="Pavardė" />
            <AppFormField
              keyboardType="email-address"
              name="email"
              placeholder="E-paštas"
              textContentType="emailAddress"
            />
            <AppFormField
              name="password"
              placeholder="Slaptažodis"
              secureTextEntry
              textContentType="password"
            />
            <View style={{ flexDirection: 'row', gap: 10, paddingTop: 10 }}>
              <AppText
                style={{ color: !isTeacher ? colors.PINK : colors.GRAY }}
                onPress={() => {
                  setIsTeacher(false);
                }}>
                Mokinys
              </AppText>
              <AppText
                style={{
                  color: isTeacher ? colors.PINK : colors.GRAY,
                }}
                onPress={() => {
                  setIsTeacher(true);
                }}>
                Mokytojas
              </AppText>
            </View>
          </View>
          <SubmitButton title="Susikurk paskyrą" style={styles.button} />
        </AppForm>
        <View style={styles.block}>
          <AppText style={[text.subtitle, { paddingBottom: 10 }]}>
            Jau esi susikūręs paskyrą?
          </AppText>
          <AppButton
            color="secondary"
            onPress={handleSingIn}
            style={styles.button}
            title="Prisijunk"
          />
        </View>
      </RoundedContainer>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    paddingVertical: 50,
    width: '80%',
  },
  button: {
    width: '80%',
  },
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  containerBottom: {
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
});
