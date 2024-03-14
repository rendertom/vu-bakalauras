import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const getStars = (rating, maxStars) =>
  [...Array(maxStars)].map((_, i) => {
    if (rating - i >= 1) return 'full';
    return rating - i >= 0.5 ? 'half' : 'empty';
  });

const names = {
  empty: 'star-outline',
  full: 'star',
  half: 'star-half-full',
};

const Icon = ({ type, size, color }) => (
  <MaterialCommunityIcons color={color} name={names[type]} size={size} />
);

const StarRating = ({
  rating,
  maxStars = 5,
  starSize = 32,
  color = '#FDD835',
  style,
  starStyle,
  Component = Icon,
}) => (
  <View style={[styles.starRating, style]}>
    {getStars(rating, maxStars).map((starType, i) => (
      <View key={i} style={[styles.star, starStyle]}>
        <Component color={color} size={starSize} type={starType} />
      </View>
    ))}
  </View>
);

export default StarRating;

const styles = StyleSheet.create({
  starRating: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
});
