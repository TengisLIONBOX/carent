import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import LoaderSkeleton2 from '../loading2';

interface Car {
  id: string;
  name: string;
  price: number;
  description: string;
  frontimg: string;
  backimg: string;
}

interface GetCarsByUserData {
  getCarsByUser: Car[];
}

const GET_CARS_BY_USER = gql`
  query GetCarsByUser($renterId: String) {
    getCarsByUser(renterId: $renterId) {
      id
      name
      description
      price
      frontimg
      backimg
    }
  }
`;

const DELETE_CAR = gql`
  mutation DeleteCar($deleteCarId: ID!) {
    deleteCar(id: $deleteCarId) {
      id
      name
      price
      fuel
      color
      address
      phone
      description
      transmission
      seats
      kilometers
      engine
      latitude
      longitude
      frontimg
      backimg
      brand
      renterId
      rented
    }
  }
`;

const GET_CAR_LIST = gql`
  query getCarList {
    getCarList {
      id
    }
  }
`;

export default function AdmincarsScreen(): React.ReactNode {
  const [confirmation, setConfirmation] = useState(false);
  const [idz, setId] = useState('');

  const [getCarsByUser, { data, loading, error }] =
    useLazyQuery<GetCarsByUserData>(GET_CARS_BY_USER);
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (user) {
      getCarsByUser({
        variables: {
          renterId: user.id,
        },
      });
    }
  }, [getCarsByUser, user]);

  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [
      {
        query: GET_CARS_BY_USER,
        variables: {
          renterId: user?.id,
        },
      },
      {
        query: GET_CAR_LIST,
      },
    ],
  });

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  if (loading) return <LoaderSkeleton2 />;
  if (error) return <Text>{error.message}...</Text>;

  const idPutter = (id: string) => {
    setConfirmation(!confirmation);
    setId(id);
  };

  const handleDelete = () => {
    deleteCar({
      variables: {
        deleteCarId: idz,
      },
    });
    setConfirmation(false);
  };

  return (
    <View style={styles.container}>
      {confirmation ? (
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            width: '100%',
            height: '110%',
            position: 'absolute',
            zIndex: 10,
          }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                width: 300,
                height: 200,
                backgroundColor: 'white',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: 10,
                  gap: 7,
                  alignItems: 'center',
                }}>
                <Text style={{ fontWeight: '800', fontSize: 20, marginBottom: 20 }}>
                  Are you sure to delete?
                </Text>
                <View style={{ flexDirection: 'row', gap: 7 }}>
                  <TouchableOpacity onPress={() => setConfirmation(!confirmation)}>
                    <View
                      style={{
                        width: 130,
                        height: 62,
                        backgroundColor: '#003D82',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDelete}>
                    <View
                      style={{
                        width: 130,
                        height: 62,
                        backgroundColor: '#DE0000',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'white', fontWeight: '700' }}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      ) : (
        <></>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={data?.getCarsByUser}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 20,
                  }}>
                  <View style={styles.item}>
                    <View style={{ alignItems: 'center' }}>
                      <Image style={styles.image} source={{ uri: item.frontimg }} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <View style={{ padding: 10 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '600', fontSize: 15 }}>{item.name}</Text>
                            <TouchableOpacity>
                              <MaterialIcons
                                name="drive-file-rename-outline"
                                size={24}
                                color="black"
                                style={{ marginLeft: 5 }}
                              />
                            </TouchableOpacity>
                          </View>

                          <TouchableOpacity onPress={() => idPutter(item.id)}>
                            <View
                              style={{
                                backgroundColor: 'red',
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 13,
                              }}>
                              <Ionicons name="trash-outline" size={21} color="white" />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <Text>Description:</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text>{item.description}</Text>
                          <TouchableOpacity>
                            <MaterialIcons
                              name="drive-file-rename-outline"
                              size={24}
                              color="black"
                              style={{ marginLeft: 5 }}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: 15,

                            color: '#4278FC',
                          }}>
                          ${item.price} / day
                        </Text>
                      </View>
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
