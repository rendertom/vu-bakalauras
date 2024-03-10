import { TouchableHighlight, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const TeacherListItem = ({ title, subtitle, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.GRAY_LIGHT}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View style={{ flex: 1 }}>
          <AppText style={[text.default, { color: colors.DARK }]}>
            {title}
          </AppText>
          <AppText style={[text.subtitle, { color: colors.GRAY }]}>
            {subtitle}
          </AppText>
        </View>
        <AppIcon name={icons.arrowRight} color={colors.GRAY} />
      </View>
    </TouchableHighlight>
  );
};

export default TeacherListItem;
