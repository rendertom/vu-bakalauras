import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import AnswerItem from '../../components/AnswerItem';
import AppFlatList from '../../components/AppFlatList';
import AppText from '../../components/AppText';
import IconButton from '../../components/IconButton';
import RoundedContainerAnother from '../../components/RoundedContainerAnother';
import SafeStatusBar from '../../components/SafeStatusBar';

import colors from '../../config/colors';
import icons from '../../config/icons';
import text from '../../config/text';

const Results = () => {
  const { tasksString } = useLocalSearchParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(tasksString));
  }, []);

  return (
    <View style={{ backgroundColor: colors.WHITE, height: '100%' }}>
      <SafeStatusBar backgroundColor={colors.VIOLET} />

      <RoundedContainerAnother
        mainComponent={
          <AppText style={[text.title, { color: colors.WHITE }]}>
            Egzaminas
          </AppText>
        }
        leftComponent={
          <IconButton name={icons.arrowLeft} onPress={router.back} />
        }
      />

      <AppFlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <AnswerItem index={index} task={item} />
        )}
      />
    </View>
  );
};

export default Results;
