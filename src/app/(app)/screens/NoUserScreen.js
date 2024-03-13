import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet } from 'react-native';

import AppButton from '../../../components/AppButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';

import colors from '../../../config/colors';
import images from '../../../config/images';

const NoUserScreen = () => {
  return (
    <ScrollView style={{ backgroundColor: colors.VIOLET }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        mainComponent={<Image source={images.icon} style={styles.image} />}
      />

      <RoundedContainer tr br>
        <SectionTitle
          color={colors.GRAY}
          title="Tu esi neprisijungęs"
          subtitle="Prisijungęs galėsi mokytis matematikos kursą"
        />
        <AppButton
          style={styles.button}
          title="prisijunk"
          onPress={() => {
            router.push({
              pathname: 'signIn',
            });
          }}
        />
      </RoundedContainer>

      <RoundedContainer isPrimary tl style={styles.containerLast}>
        <SectionTitle
          color={colors.GRAY_LIGHT}
          title="Aritmetika"
          subtitle="Susidėliok užduotis pagal sudėtingumą"
        />
        <AppButton
          color="secondary"
          style={styles.button}
          title="aritmetika"
          onPress={() => {
            router.push({
              pathname: 'setupScreen',
            });
          }}
        />
      </RoundedContainer>
    </ScrollView>
  );
};

export default NoUserScreen;

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
    width: 250,
    height: 250,
  },
});
