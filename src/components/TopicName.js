import { StyleSheet, TouchableHighlight, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';
import StarRating from './StarRating';

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

          <View style={{ flexDirection: 'row' }}>
            <AppText
              style={[
                text.subtitle,
                { color: onLight ? colors.GRAY : colors.GRAY_LIGHT },
              ]}>
              {Math.floor(scoreValue * 2)}/10
            </AppText>
            <StarRating starSize={16} rating={scoreValue} />
          </View>
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
