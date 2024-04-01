import { useSignUp } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function SignUpScreen(): React.ReactNode {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [seepass, setSeepass] = useState(true);
  const [loading, setLoading] = useState(false);

  const image = {
    uri: 'https://cdn.pixabay.com/photo/2016/04/01/11/10/automobile-1300231_1280.png',
  };

  const onSignUpPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignUp = await signUp.create({
        username,
        emailAddress,
        password,
      });
      await setActive({ session: completeSignUp.createdSessionId });

      console.log(completeSignUp);
    } catch (err: unknown) {
      alert(
        'The password should be a minimum of 8 characters long and include at least one uppercase letter, and number. ',
      );
      if (err instanceof Error) {
        if (err.message) {
          alert(err.message);
        } else {
        }
      } else {
      }
    } finally {
      setLoading(false);
    }
  };

  const SeePass = (): void => {
    setSeepass(!seepass);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
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
        SIGNUP
      </Text>
      <View style={{ gap: 20 }}>
        <SafeAreaView>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={(username) => setUsername(username)}
                placeholder="USER NAME"
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
                value={emailAddress}
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
                style={styles.passinput}
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder="PASSWORD"
                placeholderTextColor="#DDDDDD"
                secureTextEntry={seepass}
              />
              <MaterialCommunityIcons
                name={seepass ? 'eye-off' : 'eye'}
                size={30}
                color="white"
                onPress={SeePass}
              />
            </View>
          </View>
        </SafeAreaView>

        <TouchableOpacity onPress={onSignUpPress}>
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
            <Text style={{ color: 'white', fontWeight: '700' }}>SIGNUP NOW</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/login/')}>
          <Text style={{ color: '#5F6486' }}>
            Already have an account ?<Text style={{ color: '#D7D9E7' }}> Login</Text>
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
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  passinput: {
    width: 260,
    height: 55,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#242843',
    borderColor: '#263259',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginRight: 10,
  },
});
