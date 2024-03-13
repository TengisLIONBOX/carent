import { useAuth } from '@clerk/clerk-expo';
import { AntDesign, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const TabLayout: React.FC = () => {
  const { isSignedIn } = useAuth();
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" hidden={false} />
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
            tabBarIcon: ({ focused }) => (
              <AntDesign name="home" color={focused ? '#003D82' : 'grey'} size={28} />
            ),
          }}
          redirect={!(isSignedIn ?? false)}
        />

        <Tabs.Screen
          name="admin"
          options={{
            tabBarIcon: ({ focused }) => (
              <Octicons name="diff-added" color={focused ? '#003D82' : 'grey'} size={30} />
            ),
          }}
          redirect={!(isSignedIn ?? false)}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="user" color={focused ? '#003D82' : 'grey'} size={28} />
            ),
          }}
          redirect={!(isSignedIn ?? false)}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
