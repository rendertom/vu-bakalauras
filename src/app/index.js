import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext.js';
import NoUserScreen from './screens/NoUserScreen.js';
import StudentScreen from './screens/StudentScreen.js';
import TeacherScreen from './screens/TeacherScreen.js';

const SchoolScreen = () => {
  const { session, isTeacher, isSessionLoading } = useContext(AuthContext);

  if (isSessionLoading) {
    return null;
  }

  if (session) {
    return isTeacher ? <TeacherScreen /> : <StudentScreen />;
  }

  return <NoUserScreen />;
};

export default SchoolScreen;
