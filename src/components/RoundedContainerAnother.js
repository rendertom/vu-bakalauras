import { StyleSheet, View } from 'react-native';

import RoundedContainer from './RoundedContainer';

import colors from '../config/colors';

const radius = 40;

const RoundedContainerAnother = ({
  mainComponent,
  leftComponent,
  rightComponent,
  subComponent,
  bl,
}) => {
  return (
    <RoundedContainer isPrimary bl={bl} style={styles.containerTop}>
      <View style={styles.containerRow}>
        <View style={styles.buttonIcon}>{leftComponent}</View>

        {mainComponent}

        <View style={styles.buttonIconRight}>{rightComponent}</View>
      </View>

      <View style={{ alignSelf: 'center' }}>{subComponent}</View>
    </RoundedContainer>
  );
};

export default RoundedContainerAnother;

const styles = StyleSheet.create({
  buttonIcon: {
    left: 0,
    top: 2,
    position: 'absolute',
  },
  buttonIconRight: {
    right: 0,
    top: 2,
    position: 'absolute',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  containerTop: {
    paddingBottom: radius / 2,
    paddingHorizontal: radius / 2,
    marginLeft: 0,
    marginRight: 0,
    minHeight: 56 + 2,
  },
  title: {
    color: colors.WHITE,
  },
});
