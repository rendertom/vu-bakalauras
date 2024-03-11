import React, { useContext } from 'react';
import { router } from 'expo-router';

import ActionButton from '../../../components/ActionButton';
import AnswerItem from '../../../components/AnswerItem';
import AppFlatList from '../../../components/AppFlatList';
import ScreenForList from '../../../components/ScreenForList';

import { LocalizationContext } from '../../../context/LocalizationContext';
import { TasksContext } from '../../../context/TasksContext';

import icons from '../../../config/icons';

const AnswersInterScreen = () => {
  const { localizer } = useContext(LocalizationContext);
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <ScreenForList
      pageTitle={localizer.get('pageTitles.intermitResults')}
      actionButtonComponent={
        <ActionButton
          icon={icons.arrowRight}
          onPress={() => router.replace({ pathname: 'summaryScreen' })}
          title={localizer.get('buttons.submitTasks')}
        />
      }>
      <AppFlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <AnswerItem
            index={index}
            isEditMode
            onPress={() =>
              router.navigate({
                pathname: 'taskScreen',
                params: {
                  isEditMode: true,
                  taskIndex: index,
                },
              })
            }
            task={item}
          />
        )}
      />
    </ScreenForList>
  );
};

export default AnswersInterScreen;
