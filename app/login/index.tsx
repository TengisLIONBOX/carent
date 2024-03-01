// import { MaterialCommunityIcons } from '@expo/vector-icons';

import Constants from 'expo-constants';
import { router } from 'expo-router';
// import { router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

export default function LoginScreen(): React.ReactNode {
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2016/04/01/11/10/automobile-1300231_1280.png',
  };
  return (
    <View style={styles.container}>
      <Image
        source={image}
        resizeMode="cover"
        style={{ width: 250, height: 100, marginTop: 10, tintColor: '#C5C5C5' }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: '500',
          paddingBottom: 35,
          paddingTop: 15,
        }}>
        LOGIN
      </Text>
      <View style={{ gap: 20 }}>
        <SafeAreaView>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                // value={param}
                // onChangeText={setParam}
                placeholder="EMAIL"
                placeholderTextColor="#DDDDDD"
              />
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                // value={param}
                // onChangeText={setParam}
                placeholder="PASSWORD"
                placeholderTextColor="#DDDDDD"
              />
            </View>
          </View>
        </SafeAreaView>
        <TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 62,
              backgroundColor: '#696B77',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>LOGIN NOW</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/signup/')}>
          <Text style={{ color: '#5F6486' }}>
            New User
            <Text style={{ color: '#D7D9E7' }}> Signup</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121837',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#242843',
    borderColor: '#263259',
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
});
