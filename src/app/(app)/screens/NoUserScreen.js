import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';

import colors from '../../../config/colors';
import images from '../../../config/images';
import icons from '../../../config/icons';
import text from '../../../config/text';

const NoUserScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: colors.VIOLET }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        mainComponent={<Image source={images.icon} style={styles.image} />}
      />

      <RoundedContainer tr br>
        <SectionTitle
          color={colors.GRAY}
          title="Tu esi neprisijungęs"
          subtitle="Prisijungęs galėsi mokytis aritmetikos kursą"
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
          icon={icons.calculator}
          onPress={() => {
            router.push({
              pathname: 'setupScreen',
            });
          }}
        />
      </RoundedContainer>

      <View style={styles.containerCopyright}>
        <AppText style={text.subtitle}>
          {`Tomas Šinkūnas\nVU ISI IV kursas, 2024\nBakalauro baigiamasis darbas`}
        </AppText>
      </View>
    </ScrollView>
  );
};

export default NoUserScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  containerCopyright: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingLeft: 20,
  },
  containerLast: {
    marginLeft: 0,
    marginRight: 0,
  },
  image: {
    width: 250,
    height: 250,
  },
});
