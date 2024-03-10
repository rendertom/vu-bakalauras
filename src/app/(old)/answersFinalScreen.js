import React, { useContext } from 'react';
import { router } from 'expo-router';

import ActionButton from '../../components/ActionButton';
import AnswerItem from '../../components/AnswerItem';
import AppFlatList from '../../components/AppFlatList';
import ScreenForList from '../../components/ScreenForList';

import { LocalizationContext } from '../../context/LocalizationContext';
import { TasksContext } from '../../context/TasksContext';

import icons from '../../config/icons';

const AnswersFinalScreen = () => {
  const { localizer } = useContext(LocalizationContext);
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <ScreenForList
      isModal
      pageTitle={localizer.get('pageTitles.results')}
      actionButtonComponent={
        <ActionButton
          icon={icons.close}
          onPress={() => router.navigate({ pathname: 'summaryScreen' })}
          title={localizer.get('buttons.close')}
        />
      }>
      <AppFlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <AnswerItem index={index} task={item} />
        )}
      />
    </ScreenForList>
  );
};

export default AnswersFinalScreen;
