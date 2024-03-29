// import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminScreen(): React.ReactNode {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/managepost/')}>
        <LinearGradient
          colors={['#4B76EA', '#89A7F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 300,
            height: 250,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: '600', color: 'white', fontSize: 20 }}>Manage posts</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 25 }} onPress={() => router.push('/createpost/')}>
        <LinearGradient
          colors={['#4B76EA', '#89A7F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 300,
            height: 250,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: '600', color: 'white', fontSize: 20 }}>Create post</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
