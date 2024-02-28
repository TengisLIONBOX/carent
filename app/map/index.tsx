/* eslint-disable @typescript-eslint/no-misused-promises */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen(): React.ReactNode {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    Location.getCurrentPositionAsync({}).then((location) => {
      // console.log("location", location);
      setLocation(location);
    });
  });
  if (!status || !status.granted) {
    return (
      <View style={styles.container}>
        <Text>You don't have enabled location permission please enable</Text>
        <Button title="Grant location access" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={{ fontSize: 32, fontWeight: 'bold', width: 300, marginBottom: 40 }}>
        Which brand of car you prefer?
      </Text> */}
      {location !== null && (
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 47.92546722258688,
            longitude: 106.91266202661784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 47.92546722258688,
              longitude: 106.91266202661784,
            }}
            title="Ferrari"
            description="$12/ day">
            {/* <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/013/923/533/original/red-car-top-compact-logo-rectangle-png.png',
              }}
              style={{ height: 200, width: 200 }}
            /> */}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
