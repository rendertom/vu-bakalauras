import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ActionButton from '../../../components/ActionButton';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerTop from '../../../components/RoundedContainerTop';
import SectionTitle from '../../../components/SectionTitle';
import SafeStatusBar from '../../../components/SafeStatusBar';

import { LocalizationContext } from '../../../context/LocalizationContext';

import icons from '../../../config/icons';
import colors from '../../../config/colors';
import text from '../../../config/text';

import getAppStoreLink from '../../../services/getAppStoreLink';
import getLanguageButtons from '../../../services/getLanguageButtons';
import openURL from '../../../services/openURL';

const radius = 40;

const SettingsScreen = () => {
  const { localizer } = useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <SafeStatusBar iosHidden />

      <RoundedContainerTop bl title={localizer.get('pageTitles.settings')} />

      <View>
        <ActionButton
          icon={icons.close}
          onPress={router.back}
          title={localizer.get('buttons.close')}
        />
        <RoundedContainer tr br style={{ paddingTop: 30 }}>
          <SectionTitle
            title={localizer.get('sectionTitles.selectLanguage')}
            color={colors.GRAY}
          />

          {getLanguageButtons({ numItemsPerLine: 3 })}
        </RoundedContainer>
      </View>

      <RoundedContainer
        isPrimary
        tl
        style={styles.containerBottom}
        style_inner={{ flex: 1 }}>
        <AppButton
          color="secondary"
          icon={icons.star}
          onPress={() => openURL(getAppStoreLink())}
          title={localizer.get('buttons.rateOnAppStore')}
        />

        <View style={{ paddingTop: 50 }}>
          <AppText style={text.subtitle}>
            {localizer.get('developedBy')} Tomas Šinkūnas
          </AppText>
          <AppText
            style={text.subtitle}
            onPress={() => openURL('https://www.rendertom.com')}>
            www.rendertom.com
          </AppText>
        </View>
      </RoundedContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.VIOLET,
    flex: 1,
  },
  containerBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: radius,
    paddingVertical: radius,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default SettingsScreen;
