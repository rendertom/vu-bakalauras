import { useState } from 'react';
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import AppFlatList from '../../../components/AppFlatList';
import AppText from '../../../components/AppText';
import IconButton from '../../../components/IconButton';
import RoundedContainerAnother from '../../../components/RoundedContainerAnother';
import SafeStatusBar from '../../../components/SafeStatusBar';
import TeacherListItem from '../../../components/TeacherListItem';

import colors from '../../../config/colors';
import icons from '../../../config/icons';
import text from '../../../config/text';

import firebaseClient from '../../../api/firebaseClient';
import AppActivityIndicator from '../../../components/AppActivityIndicator';

const ExamsScreen = () => {
  const user = useLocalSearchParams();
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    firebaseClient.getExamsByUser(user.uid).then((exams) => {
      exams.sort((a, b) => {
        const keyA = a.date;
        const keyB = b.date;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });

      setExams(exams);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={{ backgroundColor: colors.WHITE, flex: 1 }}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            Egzaminai
          </AppText>
        }
        subComponent={
          <AppText style={[text.subtitle, { color: colors.WHITE }]}>
            {`${user.firstName} ${user.lastName}`}
          </AppText>
        }
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
      />

      <AppActivityIndicator visible={isLoading} />

      {!isLoading && exams.length === 0 ? (
        <AppText style={{ alignSelf: 'center', paddingTop: 20 }}>
          Vartotojas dar nelaikė egzaminų
        </AppText>
      ) : (
        <AppFlatList
          data={exams}
          renderItem={({ item: exam }) => (
            <TeacherListItem
              title={`${exam.className} - ${exam.sectionName}`}
              subtitle={new Date(exam.date).toLocaleString('lt-LT')}
              onPress={() => {
                router.push({
                  pathname: 'results',
                  params: { tasksString: JSON.stringify(exam.tasks) },
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default ExamsScreen;
