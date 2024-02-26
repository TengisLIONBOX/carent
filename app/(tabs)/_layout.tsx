import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

const TabLayout: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
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
    </>
  );
};

export default TabLayout;
