import { AntDesign, Octicons } from '@expo/vector-icons';
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

            tabBarIcon: ({ focused }) => (
              <AntDesign name="home" color={focused ? '#003D82' : 'grey'} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Octicons name="diff-added" color={focused ? '#003D82' : 'grey'} size={30} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused, size }) => (
              <AntDesign name="user" color={focused ? '#003D82' : 'grey'} size={28} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
