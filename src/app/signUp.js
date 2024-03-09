import { StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import * as Yup from 'yup';

import AppActivityIndicator from '../components/AppActivityIndicator';
import AppButton from '../components/AppButton';
import AppErrorMessage from '../components/forms/AppErrorMessage';
import AppForm from '../components/forms/AppFrom';
import AppFormField from '../components/forms/AppFormField';
import AppText from '../components/AppText';
import SubmitButton from '../components/forms/SubmitButton';

import text from '../config/text';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  password: Yup.string().required().min(6).label('Password'),
});

const signUp = () => {
  // const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const handleSingIn = () =>
    router.replace({
      pathname: '/signIn',
    });

  const handleSignUp = ({ email, firstName, lastName, password }) => {
    console.log('TODO');
    // setIsLoading(true);
    // firebaseClient
    //   .createUser(email, firstName, lastName, password)
    //   .then((user) => {
    //     setUser(user);
    //     navigation.replace("dashboard");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setError(error.toString());
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <View style={styles.container}>
      <AppText style={text.joke}>Sing Up</AppText>
      <AppActivityIndicator visible={isLoading} />

      <AppForm
        initialValues={{ email: '', firstName: '', lastName: '', password: '' }}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}>
        <AppErrorMessage error={error} visible={error} />
        <View style={styles.containerInputFields}>
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
        </View>
        <SubmitButton title="Susikurk paskyrą" style={styles.button} />
      </AppForm>
      <View style={styles.containerLower}>
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
    </View>
  );
};

export default signUp;

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
