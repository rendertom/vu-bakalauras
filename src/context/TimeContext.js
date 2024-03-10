import React, { createContext, useState } from 'react';

export const TimeContext = createContext({
  startTime: null,
  setStartTime: () => {},
});

export const TimeProvider = ({ children }) => {
  const [startTime, setStartTime] = useState();

  return (
    <TimeContext.Provider
      value={{
        startTime,
        setStartTime,
      }}>
      {children}
    </TimeContext.Provider>
  );
};
