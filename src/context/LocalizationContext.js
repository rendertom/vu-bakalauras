// https://lokalise.com/blog/react-native-localization/

import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import languages from '../localization';
import Localizer from '../localization/Localizer.js';

const DEFAULT_LANGUAGE = 'lt';
const KEY = 'appLanguage';

const localizer = new Localizer(DEFAULT_LANGUAGE, languages);

const LocalizationContext = createContext({
  appLanguage: null,
  localizer,
  initAppLanguage: () => {},
  isAppLanguageSet: () => {},
  setAppLanguage: () => {},
});

const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState(null);

  const getValue = () => AsyncStorage.getItem(KEY);

  const isAppLanguageSet = async () => {
    const result = await getValue();
    return result !== null;
  };

  const initAppLanguage = async () => {
    let language = DEFAULT_LANGUAGE;
    try {
      const storedLanguage = await getValue();
      if (storedLanguage) language = storedLanguage;
    } catch (error) {
      console.log(
        'Could not load language from AsyncStorage. Reverting to the default language',
        error
      );
    }
    setLanguage(language);
  };

  const setLanguage = (language) => {
    AsyncStorage.setItem(KEY, language);
    localizer.setLanguage(language);
    setAppLanguage(language);
  };

  return (
    <LocalizationContext.Provider
      value={{
        appLanguage,
        localizer,
        initAppLanguage,
        isAppLanguageSet,
        setAppLanguage: setLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};

module.exports = {
  LocalizationContext,
  LocalizationProvider,
};
