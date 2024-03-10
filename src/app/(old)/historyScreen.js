import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ActionButton from '../../components/ActionButton';
import AppFlatList from '../../components/AppFlatList';
import AppText from '../../components/AppText';
import HistoryItem from '../../components/HistoryItem';
import IconButton from '../../components/IconButton';
import ScreenForList from '../../components/ScreenForList';

import { LocalizationContext } from '../../context/LocalizationContext.js';
import { getData, removeItem } from '../../services/historyHandler.js';

import icons from '../../config/icons';
import colors from '../../config/colors';

const showPreloader = () => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.DARK} />
  </View>
);

const showMessage = (message) => (
  <View style={styles.container}>
    <AppText>{message}</AppText>
  </View>
);

const HistoryScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const { localizer } = useContext(LocalizationContext);

  const loadItemsFromHistory = async () => {
    const items = await getData();
    setItems(items || []);
    setIsLoading(false);
  };

  const onClearHistoryClick = () => {
    Alert.alert(localizer.get('notifications.clearHistory'), null, [
      { text: localizer.get('buttons.no') },
      {
        text: localizer.get('buttons.yes'),
        onPress: async () => {
          setIsLoading(true);
          await removeItem();
          loadItemsFromHistory();
        },
      },
    ]);
  };

  useEffect(() => {
    loadItemsFromHistory();
  }, []);

  return (
    <ScreenForList
      isModal
      pageTitle={localizer.get('pageTitles.history')}
      rightIconComponent={
        items.length > 0 && (
          <IconButton name={icons.trashCan} onPress={onClearHistoryClick} />
        )
      }
      actionButtonComponent={
        <ActionButton
          icon={icons.close}
          onPress={router.back}
          title={localizer.get('buttons.close')}
        />
      }>
      {isLoading ? (
        showPreloader()
      ) : items.length == 0 ? (
        showMessage(localizer.get('notifications.historyIsEmpty'))
      ) : (
        <AppFlatList
          data={items.reverse()}
          renderItem={({ item, index }) => (
            <HistoryItem tasks={item.tasks} date={item.date} />
          )}
        />
      )}
    </ScreenForList>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default HistoryScreen;
