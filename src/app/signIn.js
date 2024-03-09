import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as Yup from 'yup';

import AppActivityIndicator from '../components/AppActivityIndicator';
import AppButton from '../components/AppButton';
import AppErrorMessage from '../components/forms/AppErrorMessage';
import AppForm from '../components/forms/AppFrom';
import AppFormField from '../components/forms/AppFormField';
import AppText from '../components/AppText';
import SubmitButton from '../components/forms/SubmitButton';

import { UserContext } from '../context/UserContext';

import firebaseClient from '../api/firebaseClient';
import text from '../config/text';

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
  const { user, setUser } = useContext(UserContext);

  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const handleSingIn = async ({ email, password }) => {
    setIsLoading(true);
    setLoginFailed(false);

    await firebaseClient
      .signIn(email, password)
      // .then(async (userCredential) => {
      //   // return firebaseClient
      //   //   .getUser(userCredential.user.uid)
      //   //   .then((docSnapshot) => {
      //   //     if (docSnapshot) {
      //   //       return docSnapshot.data();
      //   //     }
      //   //   });
      // })
      // .then((user) => {
      //   setUser(user);
      //   router.replace({
      //     pathname: '/',
      //   });
      //   // navigation.replace("dashboard");
      //   // navigation.replace("app", {
      //   // screen: "usernavigator",
      //   // });
      // })
      .catch((error) => {
        setLoginFailed(true);
        console.log('handleSingIn() error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // await firebaseClient
    //   .signIn(email, password)
    //   .then(async (userCredential) => {
    //     return firebaseClient
    //       .getUser(userCredential.user.uid)
    //       .then((querySnapshot) => {
    //         if (querySnapshot) {
    //           return querySnapshot.data();
    //         }
    //       });
    //   })
    //   .then((user) => {
    //     setUser(user);
    //     navigation.replace("dashboard");
    //     // navigation.replace("app", {
    //     // screen: "usernavigator",
    //     // });
    //   })
    //   .catch((error) => {
    //     setLoginFailed(true);
    //     console.log("handleSingIn() error", error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const handleSignUp = () =>
    router.replace({
      pathname: '/signUp',
    });

  return (
    <View style={styles.container}>
      <AppActivityIndicator visible={isLoading} />

      <AppText>Sign In</AppText>
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSingIn}
        validationSchema={validationSchema}>
        <AppErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
        <View style={styles.containerInputFields}>
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
      <View style={styles.containerLower}>
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
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  button: {
    width: '50%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLower: {
    alignItems: 'center',
    paddingTop: 50,
    width: '100%',
  },
  containerInputFields: {
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
    width: '100%',
  },
});
