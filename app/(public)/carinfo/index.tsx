import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

export default function CarInfoScreen(): React.ReactNode {
  const image = {
    uri: 'https://hips.hearstapps.com/hmg-prod/images/2024-ferrari-812-gts-101-64caae4038b21.jpeg?crop=0.526xw:0.701xh;0.137xw,0.299xh&resize=768:*',
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 23, fontWeight: '500' }}>Ferrari</Text>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{ width: 390, height: 200, marginTop: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            marginTop: 5,
          }}>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="engine-outline" size={32} color="black" />
            <Text style={styles.text1}>Engine</Text>
            <Text style={styles.text2}>1600HP</Text>
          </View>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="car-shift-pattern" size={32} color="black" />
            <Text style={styles.text1}>Transmission</Text>
            <Text style={styles.text2}>1600HP</Text>
          </View>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="gas-station" size={32} color="black" />
            <Text style={styles.text1}>Fuel Type</Text>
            <Text style={styles.text2}>1600HP</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
          <Text style={{ fontSize: 15 }}>sdhsasvcgdvhshdvchsk</Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 17 }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 13 }}>Best Features</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="seat" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Seats</Text>
              <Text style={styles.features_text2}>4</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="invert-colors" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Car Color</Text>
              <Text style={styles.features_text2}>Red</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="car" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Car Brand</Text>
              <Text style={styles.features_text2}>Ferrari</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="road" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Kilometers</Text>
              <Text style={styles.features_text2}>2000</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/map/')}
          style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          <View
            style={{
              width: 150,
              height: 60,
              backgroundColor: '#C3E54B',
              borderRadius: 13,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{ fontWeight: '600' }}>See Location</Text>
            <MaterialCommunityIcons name="map-marker-outline" size={32} color="black" />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          height: 80,
          borderTopWidth: 1,
          width: '100%',
          padding: 8,
          paddingHorizontal: 17,
          borderColor: '#DADADA',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#868686' }}>Total Price</Text>
          <Text style={{ fontSize: 21, fontWeight: '700', color: '#003D82' }}>$90</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/checkout/')}>
          <View
            style={{
              width: 130,
              height: 62,
              backgroundColor: '#003D82',
              borderRadius: 13,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Book Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text1: {
    fontSize: 13,
    fontWeight: '500',
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  features_text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  features_text2: {
    fontSize: 16,
    fontWeight: '500',
  },
  spec: {
    width: 110,
    height: 110,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#F1F1F1',
    padding: 8,
  },
  icon: {
    width: 45,
    height: 45,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
