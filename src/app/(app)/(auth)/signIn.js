import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
import SafeStatusBar from '../../../components/SafeStatusBar';
import SubmitButton from '../../../components/forms/SubmitButton';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import text from '../../../config/text';

import firebaseClient from '../../../api/firebaseClient';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-paštas yra privalomas')
    .email()
    .label('Email'),
  password: Yup.string()
    .required('Slaptažodis yra privalomas')
    .min(6)
    .label('Password'),
});

const SignIn = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const handleSingIn = async ({ email, password }) => {
    setIsLoading(true);
    setLoginFailed(false);

    await firebaseClient
      .signIn(email, password)
      .then((something) => {
        router.back();
      })
      .catch((error) => {
        setLoginFailed(true);
        console.log('handleSingIn() error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUp = () =>
    router.replace({
      pathname: '/signUp',
    });

  return (
    <View style={styles.container}>
      <SafeStatusBar iosHidden backgroundColor={colors.VIOLET} />

      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            Prisijunk
          </AppText>
        }
        leftComponent={<IconButton name={icons.close} onPress={router.back} />}
      />

      <AppActivityIndicator visible={isLoading} />

      <RoundedContainer tl tr style={styles.containerBottom}>
        <AppForm
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSingIn}
          validationSchema={validationSchema}>
          <AppErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <View style={styles.block}>
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
          </View>

          <SubmitButton title="Prisijunk" style={styles.button} />
        </AppForm>

        <View style={styles.block}>
          <AppText style={[text.subtitle, { paddingBottom: 10 }]}>
            Neturi paskyros?
          </AppText>
          <AppButton
            color="secondary"
            onPress={handleSignUp}
            style={styles.button}
            title="Susikurk paskyrą"
          />
        </View>
      </RoundedContainer>
    </View>
  );
};

export default SignIn;

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
