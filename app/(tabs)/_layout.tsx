import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          // tabBarStyle: { display: 'none' },

          tabBarIcon: ({ focused, size }) => (
            <AntDesign name="home" color={focused ? '#003D82' : 'grey'} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AntDesign name="user" color={focused ? '#003D82' : 'grey'} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
