import { gql, useLazyQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PageSlider } from '@pietile-native-kit/page-slider';
import { router, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import LoaderSkeleton from '../loading';

const GET_CAR_BY_ID = gql`
  query getCarById($id: ID!) {
    getCarById(id: $id) {
      id
      name
      price
      fuel
      color
      engine
      address
      phone
      description
      transmission
      seats
      kilometers
      latitude
      longitude
      frontimg
      backimg
      brand
    }
  }
`;

export default function CarInfoScreen(): React.ReactNode {
  const { id } = useGlobalSearchParams();
  const [getCarById, { loading, error, data }] = useLazyQuery(GET_CAR_BY_ID);
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    getCarById({
      variables: {
        id,
      },
    });
  }, [getCarById, id]);

  if (loading) return <LoaderSkeleton />;
  if (error) return <Text>{error.message}</Text>;

  const car = data?.getCarById;

  if (car == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 23, fontWeight: '500' }}>{car.name}</Text>
          <PageSlider
            style={{ width: 380 }}
            selectedPage={selectedPage}
            onSelectedPageChange={setSelectedPage}
            onCurrentPageChange={(page) => page}>
            <View>
              <ImageBackground
                source={{ uri: car.frontimg }}
                resizeMode="cover"
                style={{ width: 390, height: 200, marginTop: 10 }}
              />
            </View>
            <View>
              <ImageBackground
                source={{ uri: car.backimg }}
                resizeMode="cover"
                style={{ width: 390, height: 200, marginTop: 10 }}
              />
            </View>
          </PageSlider>
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
            <Text style={styles.text2}>{car.engine}</Text>
          </View>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="car-shift-pattern" size={32} color="black" />
            <Text style={styles.text1}>Transmission</Text>
            <Text style={styles.text2}>{car.transmission}</Text>
          </View>
          <View style={styles.spec}>
            <MaterialCommunityIcons name="gas-station" size={32} color="black" />
            <Text style={styles.text1}>Fuel Type</Text>
            <Text style={styles.text2}>{car.fuel}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
          <Text style={{ fontSize: 15 }}>{car.description}</Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 17 }}>
          <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 13 }}>Best Features</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="seat" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Seats</Text>
              <Text style={styles.features_text2}>{car.seats}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="invert-colors" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Car Color</Text>
              <Text style={{ fontSize: 16, fontWeight: '500', color: `${car.color}` }}>
                {car.color}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="car" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Car Brand</Text>
              <Text style={styles.features_text2}>{car.brand}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 23 }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="road" size={30} color="black" />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.features_text}>Kilometers</Text>
              <Text style={styles.features_text2}>{car.kilometers}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/map/${id}`)}
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
          <Text style={{ fontSize: 21, fontWeight: '700', color: '#003D82' }}>${car.price}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push(`/checkout/${id}`)}>
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
