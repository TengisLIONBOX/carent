import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';

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
      </Stack>
    </>
  );
};

export default RootLayoutNav;
