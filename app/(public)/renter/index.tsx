import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
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
  renterPhone: string;
}

interface GetRentedCars {
  getRentedCars: Car[];
}

const GET_RENTED_CARS = gql`
  query GetRentedCars($renterId: String!) {
    getRentedCars(renterId: $renterId) {
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
      renterPhone
    }
  }
`;

const UPDATE_CAR = gql`
  mutation UpdateCar($input: CarUpdateInput!) {
    updateCar(input: $input) {
      id
      rented
      rentedId
      rentedAt
      daysRented
    }
  }
`;
const GET_CAR_LIST = gql`
  query GetCarList {
    getCarList {
      id
      name
      price
      description
      frontimg
      rented
    }
  }
`;

export default function RenterCarsScreen(): React.ReactNode {
  const [getRentedCars, { data, loading, error }] = useLazyQuery<GetRentedCars>(GET_RENTED_CARS);

  const { isLoaded, isSignedIn, user } = useUser();

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [
      { query: GET_CAR_LIST },
      {
        query: GET_RENTED_CARS,
        variables: {
          renterId: user?.id,
        },
      },
    ],
  });

  useEffect(() => {
    if (user) {
      console.log('user exists');
      getRentedCars({
        variables: {
          renterId: user.id,
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
  }, [getRentedCars, user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  console.log({ loading, data });
  if (loading || !data) return <Spinner visible />;
  if (error) return <Text>{error.message}...</Text>;
  console.log(user.id);

  console.log(data);

  if (data.getRentedCars.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>No one rented your car yet!</Text>
      </View>
    );
  }
  const renew = async (id: string) => {
    try {
      await updateCar({
        variables: {
          input: {
            id,
            rented: false,
            rentedId: '',
            rentedAt: '',
            daysRented: '',
            renterPhone: '',
          },
        },
      });
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={data.getRentedCars}
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
                      <Text>Rented At: {item.rentedAt}</Text>
                      <Text>Days Rented: {item.daysRented}</Text>
                      <Text style={{ fontWeight: '500', fontSize: 16 }}>Renter Info:</Text>
                      <Text>Phone Number: {item.renterPhone}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FF748B',
                      padding: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                    onPress={() => renew(item.id)}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Renew</Text>
                  </TouchableOpacity>
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
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    width: 330,
    borderWidth: 1,
    borderColor: '#F3F3F3',
  },
  image: {
    width: 328,
    height: 200,
    borderRadius: 20,
  },
});
