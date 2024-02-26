import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen(): React.ReactNode {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-end', marginRight: 40, marginBottom: 7 }}>
        <TouchableOpacity>
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
          colors={['#4B76EA', '#89A7F1']}
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
            Name: Bataa
            <TouchableOpacity>
              <AntDesign name="edit" size={20} color="white" />
            </TouchableOpacity>
          </Text>

          <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>id: PIKI12897</Text>
        </LinearGradient>
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
});
