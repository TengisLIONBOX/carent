import { Stack } from 'expo-router';
import React from 'react';

const PublicLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="category/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
          //   headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="allcars/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="carinfo/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="map/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="checkout/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="login/index"
        options={{
          headerTitle: '',
          headerShown: false,
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="signup/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="createpost/index"
        options={{
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
