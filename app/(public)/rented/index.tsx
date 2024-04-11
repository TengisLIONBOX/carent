import { gql, useLazyQuery } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-virtualized-view';

interface Car {
  id: string;
  name: string;
  price: number;
  frontimg: string;
  color: string;
  brand: string;
  renterId: string;
  rented: boolean;
  rentedId: string;
  rentedAt: string;
  daysRented: string;
  phone: string;
}

interface GetMyRentedCars {
  getMyRentedCars: Car[];
}

const GET_MY_RENTED_CARS = gql`
  query GetMyRentedCars($rentedId: String!) {
    getMyRentedCars(rentedId: $rentedId) {
      id
      name
      price
      color
      frontimg
      brand
      renterId
      rented
      rentedId
      rentedAt
      daysRented
      phone
    }
  }
`;

export default function MyRentedCarsScreen(): React.ReactNode {
  const [getMyRentedCars, { data, loading, error }] =
    useLazyQuery<GetMyRentedCars>(GET_MY_RENTED_CARS);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (user) {
      console.log('user exists');
      getMyRentedCars({
        variables: {
          rentedId: user.id,
        },
        onCompleted: (data) => {
          console.log('RENTED CARS:');
          console.log(JSON.stringify(data, null, 2));
        },
        onError: (error) => {
          console.log(JSON.stringify(error, null, 2));
        },
      });
    }
  }, [getMyRentedCars, user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  console.log({ loading, data });
  if (loading || !data) return <Spinner visible />;
  if (error) return <Text>{error.message}...</Text>;
  console.log(user.id);

  console.log(data);

  if (data.getMyRentedCars.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>You don't have any rented cars!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={data.getMyRentedCars}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 20 }}>
                  <View style={styles.item}>
                    <View style={{ alignItems: 'center' }}>
                      <Image style={styles.image} source={{ uri: item.frontimg }} />
                    </View>
                    <View style={{ padding: 10 }}>
                      <Text style={{ fontWeight: '600', fontSize: 15, marginLeft: 10 }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 15,
                          marginLeft: 10,
                          color: '#4278FC',
                        }}>
                        ${item.price} / day
                      </Text>
                      <Text>Brand: {item.brand}</Text>
                      <Text>Rented At: {item.rentedAt}</Text>
                      <Text>Days Rented: {item.daysRented}</Text>
                      <Text>Renter Phone Number: {item.phone}</Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
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
  item: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    width: 330,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  image: {
    width: 328,
    height: 200,
    borderRadius: 20,
  },
});
