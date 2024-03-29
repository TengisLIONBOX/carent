import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function LoaderSkeleton() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 23, fontWeight: '500' }}>****</Text>

          <View style={{ width: 390, height: 200, marginTop: 10, backgroundColor: 'grey' }} />
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
            <Text style={styles.text2}>****</Text>
          </View>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="car-shift-pattern" size={32} color="black" />
            <Text style={styles.text1}>Transmission</Text>
            <Text style={styles.text2}>****</Text>
          </View>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="gas-station" size={32} color="black" />
            <Text style={styles.text1}>Fuel Type</Text>
            <Text style={styles.text2}>****</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
          <Text style={{ fontSize: 15 }}>****</Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 17 }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 13 }}>Best Features</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="seat" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Seats</Text>
              <Text style={styles.features_text2}>****</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="invert-colors" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Car Color</Text>
              <Text style={styles.features_text2}>****</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="car" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Car Brand</Text>
              <Text style={styles.features_text2}>****</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="road" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Kilometers</Text>
              <Text style={styles.features_text2}>****</Text>
            </View>
          </View>
        </View>
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
          <Text style={{ fontSize: 21, fontWeight: '700', color: '#003D82' }}>$****</Text>
        </View>
        <TouchableOpacity>
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
    justifyContent: 'space-between',
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
