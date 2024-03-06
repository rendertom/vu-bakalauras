import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import AppText from './AppText';

import colors from '../config/colors';
import images from '../config/images';
import text from '../config/text';

const TitleLottie = ({ scoreValue }) => {
  const getTitle = () => {
    return scoreValue < 0.45
      ? { text: 'Prastai', lottie: images.lottie.poor }
      : scoreValue >= 0.45 && scoreValue < 0.75
      ? { text: 'Neblogai', lottie: images.lottie.average }
      : scoreValue >= 0.75 && scoreValue < 0.95
      ? { text: 'Gerai', lottie: images.lottie.good }
      : { text: 'Puikiai', lottie: images.lottie.great };
  };

  return (
    <View style={styles.container}>
      <AppText style={[{ color: colors.WHITE }, text.title]}>
        {getTitle().text}
      </AppText>
      <LottieView
        source={getTitle().lottie}
        style={styles.lottie}
        loop={true}
        autoPlay
      />
    </View>
  );
};

export default TitleLottie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  lottie: {
    width: 40,
    height: 40,
  },
});
