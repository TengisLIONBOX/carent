/* eslint-disable @typescript-eslint/no-misused-promises */
import { gql, useLazyQuery } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { Marker } from 'react-native-maps';

const GET_CAR_BY_ID = gql`
  query getCarById($id: ID!) {
    getCarById(id: $id) {
      id
      name
      price
    }
  }
`;

export default function MapScreen(): React.ReactNode {
  const { id } = useGlobalSearchParams();
  const [getCarById, { loading, error, data }] = useLazyQuery(GET_CAR_BY_ID);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    (async () => {
      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  useEffect(() => {
    getCarById({
      variables: { id },
    });
  }, [getCarById, id]);

  if (!status || !status.granted) {
    return (
      <View style={styles.container}>
        <Text>You don't have enabled location permission please enable</Text>
        <Button title="Grant location access" onPress={requestPermission} />
      </View>
    );
  }

  if (loading) return <Spinner visible />;
  if (error) return <Text>{error.message}</Text>;

  const car = data?.getCarById;

  if (car === undefined || !location) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 47.92546722258688,
            longitude: 106.91266202661784,
          }}
          title={car.name}
          description={`$${car.price}/day`}>
          <MaterialCommunityIcons name="car-sports" size={50} color="black" />
        </Marker>
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You"
          description="Your location">
          <MaterialCommunityIcons name="map-marker-outline" size={30} color="black" />
        </Marker>
      </MapView>
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
});
