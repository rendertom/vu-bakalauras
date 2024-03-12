import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import IconButton from './IconButton';
import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const FollowersListItem = ({
  user,
  onAcceptPress,
  onDeletePress,
  onLight = true,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <AppText style={[{ color: onLight ? colors.GRAY : colors.WHITE }]}>
          {user.firstName} {user.lastName}
        </AppText>
        <AppText
          style={[
            text.subtitle,
            { color: onLight ? colors.GRAY : colors.WHITE },
          ]}>
          {user.email}
        </AppText>
      </View>
      {onAcceptPress && (
        <IconButton
          iconColor={onLight ? colors.GRAY : colors.GRAY_LIGHT}
          name={icons.check}
          onPress={onAcceptPress}
          style={[
            styles.icon,
            {
              backgroundColor: onLight ? colors.GRAY_LIGHT : colors.VIOLET_DARK,
            },
          ]}
        />
      )}
      {onDeletePress && (
        <IconButton
          iconColor={onLight ? colors.GRAY : colors.GRAY_LIGHT}
          name={icons.close}
          onPress={onDeletePress}
          style={[
            styles.icon,
            {
              backgroundColor: onLight ? colors.GRAY_LIGHT : colors.VIOLET_DARK,
            },
          ]}
        />
      )}
    </View>
  );
};

export default FollowersListItem;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});
