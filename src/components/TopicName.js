import { StyleSheet, TouchableHighlight, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';
import StarRating from './StarRating';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const TopicName = ({ onPress, scoreValue, title, onLight = true }) => {
  const getIcon = () => {
    const IconComponent = (color, name) => (
      <AppIcon
        color={color}
        name={name}
        size="small"
        style={{ paddingRight: 10 }}
      />
    );

    if (scoreValue < 0) {
      return IconComponent(colors.YELLOW, icons.pending);
    }

    return scoreValue <= 0.8
      ? IconComponent(colors.PINK, icons.alert)
      : IconComponent(colors.BLUE, icons.check);
  };
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={onLight ? colors.GRAY_LIGHT : colors.VIOLET_DARK}
      style={styles.container}>
      <View style={styles.conainterInner}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            {getIcon()}
            <AppText
              style={[
                text.default,
                { color: onLight ? colors.GRAY : colors.GRAY_LIGHT },
              ]}>
              {title}
            </AppText>
          </View>

          <View style={styles.row}>
            {/* <AppText
              style={[
                text.subtitle,
                { color: onLight ? colors.GRAY : colors.GRAY_LIGHT },
              ]}>
              {Math.floor(Math.max(0, scoreValue) * 10)}/10
            </AppText> */}
            <StarRating alignLeft starSize={16} rating={scoreValue * 5} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
