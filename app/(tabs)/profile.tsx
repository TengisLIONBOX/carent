import { useAuth, useUser } from '@clerk/clerk-expo';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen(): React.ReactNode {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [changeName, setChangeName] = useState(false);

  const doLogout = (): void => {
    signOut();
  };

  const changeNickname = (): void => {
    setChangeName(!changeName);
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <View style={styles.container}>
      {changeName ? (
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            width: '100%',
            height: '110%',
            position: 'absolute',
            zIndex: 10,
          }}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              marginTop: 180,
              flex: 1,
            }}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.input}
                  // value={emailAddress}
                  // onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  placeholder="New username"
                  placeholderTextColor="#3B3B3B"
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, gap: 7 }}>
              <TouchableOpacity onPress={changeNickname}>
                <View
                  style={{
                    width: 130,
                    height: 62,
                    backgroundColor: '#DE0000',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    width: 130,
                    height: 62,
                    backgroundColor: '#003D82',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Change</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BlurView>
      ) : (
        <></>
      )}

      <View style={{ alignItems: 'flex-end', marginRight: 40, marginBottom: 7 }}>
        <TouchableOpacity onPress={doLogout}>
          <View
            style={{
              width: 80,
              height: 50,
              borderRadius: 13,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient
          colors={['#004899', '#4B76EA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 300,
            height: 200,
            borderRadius: 25,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', marginLeft: 17 }}>
            Name: {user.username}
            <TouchableOpacity onPress={changeNickname}>
              <AntDesign name="edit" size={20} color="white" />
            </TouchableOpacity>
          </Text>
        </LinearGradient>
        <TouchableOpacity onPress={() => router.push('/(public)/renter')}>
          <View
            style={{
              backgroundColor: '#628CFF',
              width: 300,
              height: 70,
              borderRadius: 15,
              marginTop: 15,
              justifyContent: 'center',
              borderColor: '#1D5AFF',
              borderWidth: 2,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: '500',
                marginLeft: 17,
              }}>
              <MaterialIcons name="car-rental" size={23} color="white" />
              My Car Renter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 30,
    backgroundColor: 'white',
  },
  input: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#D5D5D5',
    borderColor: '#263259',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
