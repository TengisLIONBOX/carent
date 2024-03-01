import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

const RootLayoutNav: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="category/index"
          options={{
            headerTitle: '',
            headerShown: true,
            headerTransparent: true,
            // headerTintColor: '#fff',
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
    </>
  );
};

export default RootLayoutNav;
