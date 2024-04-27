import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import IconButton from '../../../components/IconButton';
import RoundedContainer from '../../../components/RoundedContainer';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import SectionTitle from '../../../components/SectionTitle';
import ToggleButton from '../../../components/ToggleButton';

import firebaseClient from '../../../api/firebaseClient';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import text from '../../../config/text';

const MOConfig = [
  {
    title: 'Tekstas',
    subtitle: 'Mokymo medžiaga pateikiama tekstiniu formatu',
    selected: true,
  },
  {
    title: 'Video',
    subtitle: 'Mokymo medžiaga pateikiama video formatu',
    selected: false,
  },
];

const topics = [
  {
    title: 'Klasė 1',
    subtitle: '4 skyriai, 13 temų',
    selected: true,
    courseId: '100',
  },
  {
    title: 'Klasė 2',
    subtitle: '3 skyriai, 16 temų',
    selected: false,
    courseId: '200',
  },
  {
    title: 'Klasė 3',
    subtitle: '3 skyriai, 22 temos',
    selected: false,
    courseId: '300',
  },
  {
    title: 'Klasė 4',
    subtitle: '3 skyriai, 13 temų',
    selected: false,
    courseId: '400',
  },
];

const StudentScreen = () => {
  const [MOState, setMOState] = useState(MOConfig);
  const [topicState, setTopicState] = useState(topics);

  const getToggleButtons = ({
    isPrimary,
    isRadioButton,
    numItemsPerLine = 1,
    setState,
    state,
  }) => {
    const buttons = [];
    const numItems = state.length;

    for (let i = 0; i < numItems; i = i + numItemsPerLine) {
      const elements = [];
      for (let j = i; j < i + numItemsPerLine && j < numItems; j++) {
        const index = j;
        const item = state[index];

        const element = (
          <ToggleButton
            key={index}
            icon={item.icon}
            isGrayscale={!isPrimary}
            isSelected={item.selected}
            subtitle={item.subtitle}
            title={item.title}
            onPress={(value) => {
              const temp = [...state];
              if (isRadioButton) {
                temp.map((item) => (item.selected = false));
                temp[index].selected = true;
              } else {
                temp[index].selected = value;
              }

              setState(temp);
            }}
          />
        );
        elements.push(element);
      }
      buttons.push(
        <View key={i} style={{ flexDirection: 'row' }}>
          {elements}
        </View>
      );
    }
    return buttons;
  };

  const startCourse = () => {
    const topic = topicState.find((i) => i.selected);
    const MO = MOState.find((i) => i.selected);

    router.push({
      pathname: '/course',
      params: { courseId: topic.courseId },
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.VIOLET }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <SafeStatusBar />

      <RoundedContainerAnother
        mainComponent={
          <AppText
            style={[text.title, { color: colors.WHITE, paddingBottom: 20 }]}>
            👋
          </AppText>
        }
        leftComponent={
          <IconButton name={icons.logOut} onPress={firebaseClient.signOut} />
        }
        rightComponent={
          <IconButton
            name={icons.account}
            onPress={() => {
              router.navigate({
                pathname: 'followers',
              });
            }}
          />
        }
      />

      <View>
        <AppButton
          icon={icons.arrowRight}
          title="Pradėti"
          onPress={startCourse}
          style={styles.buttonStart}
        />

        <RoundedContainer tr br style={{ paddingTop: 30 }}>
          <SectionTitle color={colors.GRAY} title="Kurso sudėtingumas" />
          {getToggleButtons({
            isPrimary: false,
            isRadioButton: true,
            numItemsPerLine: 2,
            setState: setTopicState,
            state: topicState,
          })}
        </RoundedContainer>
      </View>

      <RoundedContainer isPrimary tl bl>
        <SectionTitle color={colors.GRAY_LIGHT} title="Mokymosi medžiaga" />

        {getToggleButtons({
          isPrimary: true,
          isRadioButton: true,
          numItemsPerLine: 2,
          setState: setMOState,
          state: MOState,
        })}
      </RoundedContainer>

      <RoundedContainer tr br>
        <AppButton
          icon={icons.arrowRight}
          title="Pradėti"
          onPress={startCourse}
          style={styles.button}
        />
      </RoundedContainer>

      <RoundedContainer isPrimary tl style={styles.containerLast}>
        <AppButton
          style={styles.button}
          title="aritmetika"
          color="secondary"
          icon={icons.calculator}
          onPress={() => {
            router.push({
              pathname: 'setupScreen',
            });
          }}
        />
      </RoundedContainer>
      <View // fills remaining part of the screen
        style={{
          height: '100%',
          backgroundColor: colors.VIOLET,
        }}
      />
    </ScrollView>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  buttonStart: {
    alignSelf: 'center',
    position: 'absolute',
    top: -25,
    zIndex: 1,
    width: '50%',
  },
  containerLast: {
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
});
