import React from 'react';
import { StyleSheet, View } from 'react-native';

import RoundedContainer from './RoundedContainer';
import RoundedContainerTop from './RoundedContainerTop';
import SafeStatusBar from './SafeStatusBar';

import colors from '../config/colors';

const ScreenForList = ({
  actionButtonComponent,
  children,
  isModal,
  pageTitle,
  rightIconComponent,
}) => {
  return (
    <View style={styles.container}>
      <SafeStatusBar iosHidden={isModal} />
      <RoundedContainerTop
        title={pageTitle}
        rightIconComponent={rightIconComponent}
      />
      <View style={{ flex: 1 }}>
        {actionButtonComponent}
        <RoundedContainer
          tl
          tr
          style={styles.containerBottom}
          style_inner={{ flex: 1 }}>
          {children}
        </RoundedContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.VIOLET,
  },
  containerBottom: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default ScreenForList;
