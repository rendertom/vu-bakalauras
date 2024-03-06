import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import AppIcon from './AppIcon';
import AppText from './AppText';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const TopicName = ({ onPress, scoreValue, title, onLight = true }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={onLight ? colors.GRAY_LIGHT : colors.VIOLET_DARK}
      style={styles.container}>
      <View style={styles.conainterInner}>
        <View style={{ flex: 1 }}>
          <AppText
            style={[
              text.default,
              { color: onLight ? colors.GRAY : colors.GRAY_LIGHT },
            ]}>
            {title}
          </AppText>

          <StarRatingDisplay starSize={16} rating={scoreValue} />
        </View>

        {onPress ? (
          <AppIcon
            color={onLight ? colors.GRAY : colors.GRAY_LIGHT}
            name={icons.arrowRight}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default TopicName;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  conainterInner: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
});