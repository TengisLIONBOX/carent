import { useSignIn } from '@clerk/clerk-expo';
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

export default function LoginScreen(): React.ReactNode {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [seepass, setSeepass] = useState(true);
  const [loading, setLoading] = useState(false);
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2016/04/01/11/10/automobile-1300231_1280.png',
  };
  const onSignInPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push('/');
      } else {
        console.log(result);
      }
    } catch (err) {
      alert(err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  const SeePass = (): void => {
    return setSeepass(!seepass);
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
        LOGIN
      </Text>
      <View style={{ gap: 20 }}>
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
        <TouchableOpacity onPress={onSignInPress}>
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
