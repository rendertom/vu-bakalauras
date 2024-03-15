import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import ClassButton from '../../../components/ClassButton';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';

import firebaseClient from '../../../api/firebaseClient';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import text from '../../../config/text';

const StudentScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: colors.VIOLET }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>👋</AppText>
        }
        rightComponent={
          <IconButton
            name={icons.account}
            onPress={() => {
              router.navigate({
                pathname: 'followers',
              });
            }}
          />
        }
      />

      <RoundedContainer tr br>
        <SectionTitle
          color={colors.GRAY}
          title="Aritmetika"
          subtitle="Susidėliok užduotis pagal sudėtingumą"
        />
        <AppButton
          style={styles.button}
          title="aritmetika"
          color="secondary"
          icon={icons.calculator}
          onPress={() => {
            router.push({
              pathname: 'setupScreen',
            });
          }}
        />
      </RoundedContainer>

      <RoundedContainer isPrimary tl bl style={{ paddingBottom: 20 }}>
        <SectionTitle
          color={colors.GRAY_LIGHT}
          title="Adaptyvi mokykla"
          subtitle="Įveik pradinių klasių aritmetikos kursą"
        />
        <View style={{ flexDirection: 'row' }}>
          <ClassButton
            title="Klasė 1"
            subtitle="4 skyriai, 13 temų"
            courseId="100"
          />
          <ClassButton
            title="Klasė 2"
            subtitle="3 skyriai, 16 temų"
            courseId="200"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <ClassButton
            title="Klasė 3"
            subtitle="3 skyriai, 22 temos"
            courseId="300"
          />
          <ClassButton
            title="Klasė 4"
            subtitle="3 skyriai, 13 temų"
            courseId="400"
          />
        </View>
      </RoundedContainer>

      <RoundedContainer tr style={styles.containerLast}>
        <AppButton
          style={[styles.button, { paddingHorizontal: 80 }]}
          title="atsijungti"
          icon={icons.logOut}
          onPress={firebaseClient.signOut}
        />
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

export default StudentScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonClass: {
    paddingVertical: 10,
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
