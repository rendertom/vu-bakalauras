import React, { useContext } from 'react';
import { View } from 'react-native';
import ToggleButton from '../components/ToggleButton';

import { LocalizationContext } from '../context/LocalizationContext';

const getLanguageButtons = ({ numItemsPerLine = 1 }) => {
  const { localizer, appLanguage, setAppLanguage } =
    useContext(LocalizationContext);

  const rows = [];
  const items = localizer.getNamedLanguages();
  const numItems = items.length;

  for (let i = 0; i < numItems; i = i + numItemsPerLine) {
    const elements = [];
    for (let j = i; j < i + numItemsPerLine && j < numItems; j++) {
      const index = j;

      const item = items[index];

      const element = (
        <ToggleButton
          key={index}
          isGrayscale
          isSelected={item.code === appLanguage}
          subtitle={item.language}
          title={item.code.toUpperCase()}
          onPress={() => setAppLanguage(item.code)}
        />
      );
      elements.push(element);
    }
    rows.push(
      <View key={i} style={{ flexDirection: 'row' }}>
        {elements}
      </View>
    );
  }
  return rows;
};

export default getLanguageButtons;
