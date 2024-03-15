import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

const PublicLayout: React.FC = () => {
  const router = useRouter();
  const goBack = () => router.back();
  const route = useRoute();
  console.log(route.name);

  return (
    <View style={{ flex: 1 }}>
      <View
        onTouchStart={goBack}
        style={{
          display: 'flex',
          height: 40,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginLeft: 15,
          marginBottom: 0,
          paddingBottom: 0,
        }}>
        <AntDesign name="arrowleft" size={32} color="black" />
      </View>

      <Stack>
        <Stack.Screen
          name="category/index"
          options={{
            headerTitle: '',
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="allcars/index"
          options={{
            headerTitle: '',
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="carinfo/index"
          options={{
            headerTitle: '',
            headerShown: false,
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
            headerShown: false,
            headerTransparent: true,
          }}
        />
        {/* <Stack.Screen
          name="login/index"
          options={{
            headerTitle: '',
            headerShown: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="signup/index"
          options={{
            headerTitle: '',
            headerShown: false,
            headerTransparent: true,
          }}
        /> */}
        <Stack.Screen
          name="createpost/index"
          options={{
            headerTitle: '',
            headerShown: false,
            headerTransparent: true,
          }}
        />
      </Stack>
    </View>
  );
};

export default PublicLayout;
