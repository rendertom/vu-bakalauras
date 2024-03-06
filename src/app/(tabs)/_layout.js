import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{
        headerTitle: 'Home'
      }}/>
      <Tabs.Screen name='users/[id]' options={{
        headerTitle: 'User page'
      }}/>
    </Tabs>
  )
};

export default TabsLayout;
