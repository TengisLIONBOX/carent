import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router, useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';

const GET_CAR_BY_ID = gql`
  query getCarById($id: ID!) {
    getCarById(id: $id) {
      id
      name
      price
      address
      phone
      description
      frontimg
      renterId
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: String) {
    getUserById(id: $id) {
      id
      username
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

const GET_RENTED_CARS = gql`
  query GetRentedCars($renterId: String) {
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
      renterPhone
    }
  }
`;

interface Car {
  id: string;
  name: string;
  price: number;
  address: string;
  phone: string;
  description: string;
  frontimg: string;
  renterId: string;
}

interface User {
  id: string;
  username: string;
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
export default function CheckoutScreen(): React.ReactNode {
  const [days, setDays] = useState('');
  const [success, setSuccess] = useState(false);
  const [getPhone, setGetPhone] = useState(false);
  const [phone, setPhone] = useState('');
  const [totalprice, setTotal] = useState('');
  const { id } = useGlobalSearchParams();
  const { isLoaded, isSignedIn, user } = useUser();

  const [getCarById, { loading: carLoading, error, data: carData }] = useLazyQuery(GET_CAR_BY_ID);
  const [getUserById, { loading: userLoading, data: userData }] = useLazyQuery(GET_USER_BY_ID);
  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [
      { query: GET_CAR_LIST },
      {
        query: GET_RENTED_CARS,
        variables: {
          renterId: user?.id,
        },
      },
      {
        query: GET_MY_RENTED_CARS,
        variables: {
          rentedId: user?.id,
        },
      },
    ],
  });

  const [car, setCar] = useState<Car | null>(null);
  const [user1, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCarById({ variables: { id } });
  }, [id]);

  useEffect(() => {
    if (car !== null) {
      getUserById({ variables: { id: car.renterId } });
    }
  }, [car]);

  useEffect(() => {
    if (carData !== undefined) {
      setCar(carData.getCarById);
    }
  }, [carData]);

  useEffect(() => {
    if (userData !== undefined) {
      setUser(userData.getUserById);
    }
  }, [userData]);

  useEffect(() => {
    if (car !== null) {
      const dayprice = Number(car.price) * Number(days);
      setTotal(String(dayprice + 8));
    }
  }, [car, days]);

  if (car === null || user1 === null || carLoading || userLoading) return <Spinner visible />;
  if (error) return <Text>{error?.message}</Text>;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const hour = ('0' + currentDate.getHours()).slice(-2);
  const minute = ('0' + currentDate.getMinutes()).slice(-2);
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const handleBuy = async () => {
    if (phone !== '') {
      try {
        await updateCar({
          variables: {
            input: {
              id: car.id,
              rented: true,
              rentedId: user.id,
              rentedAt: `${year}-${month}-${day} ${hour}:${minute}`,
              daysRented: days,
              renterPhone: phone,
            },
          },
        });
        setGetPhone(false);
        setSuccess(true);
      } catch (error) {
        console.error('Error updating car:', error);
      }
    }
  };
  const PhoneNumberGetter = () => {
    if (days !== '') {
      setGetPhone(!getPhone);
      setPhone('');
    }
  };

  return (
    <View style={styles.container}>
      {success && (
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            width: '100%',
            height: '110%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <View
              style={{
                width: 250,
                height: 220,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                padding: 10,
              }}>
              <FontAwesome name="check-circle" size={45} color="green" />
              <Text style={{ fontWeight: '700', fontSize: 20, marginTop: 10 }}>
                Successfully rented
              </Text>
            </View>
          </TouchableOpacity>
        </BlurView>
      )}

      {getPhone ? (
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            width: '100%',
            height: '110%',
            position: 'absolute',
            zIndex: 10,
          }}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              marginTop: 180,
              flex: 1,
            }}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.searchContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                  placeholder="Phone Number"
                  placeholderTextColor="#3B3B3B"
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, gap: 7 }}>
              <TouchableOpacity onPress={PhoneNumberGetter}>
                <View
                  style={{
                    width: 130,
                    height: 62,
                    backgroundColor: '#DE0000',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBuy}>
                <View
                  style={{
                    width: 130,
                    height: 62,
                    backgroundColor: '#003D82',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Buy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BlurView>
      ) : (
        <></>
      )}
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 27,
            fontWeight: '700',
            marginBottom: 20,
          }}>
          Checkout
        </Text>
        <View>
          <Text style={styles.textheader}>CAR DETAIL</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 }}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 3 }}>{car.name}</Text>
              <Text style={{ fontSize: 17, fontWeight: '500', marginBottom: 3, color: '#0057AE' }}>
                ${car.price} / day
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 3 }}>
                {car.description}
              </Text>
            </View>
            <Image
              style={{ width: 93, height: 93, borderRadius: 15 }}
              source={{
                uri: `${car.frontimg}`,
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textheader}>RENTER INFORMATION</Text>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Full name</Text>
              <Text style={styles.text2}>{user.username}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Address line</Text>
              <Text style={styles.text2}>{car.address}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Phone number</Text>
              <Text style={styles.text2}>{car.phone}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.textheader}>ADDITIONAL</Text>
            <View>
              <Text style={{ fontWeight: '500', fontSize: 15, marginBottom: 10 }}>
                How many days are you gonna rent?
              </Text>
              <SafeAreaView>
                <View
                  style={{
                    width: 200,
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#C7C7C7',
                  }}>
                  <RNPickerSelect
                    onValueChange={(e) => {
                      setDays(e);
                    }}
                    value={days}
                    items={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                      { label: '5', value: '5' },
                      { label: '6', value: '6' },
                      { label: '7', value: '7' },
                      { label: '8', value: '8' },
                      { label: '9', value: '9' },
                    ]}
                    style={{
                      inputAndroid: {
                        width: 200,
                        height: 55,
                        fontSize: 16,
                      },
                    }}
                  />
                </View>
              </SafeAreaView>
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textheader}>PRICE DETAILS</Text>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Renter price</Text>
              <Text style={styles.text2}>${car.price}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Delivery price</Text>
              <Text style={styles.text2}>$5</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>VAT</Text>
              <Text style={styles.text2}>$3</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: '#E1E1E1' }} />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>Total</Text>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>${totalprice}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={PhoneNumberGetter}>
            <View
              style={{
                width: '100%',
                height: 62,
                backgroundColor: '#003D82',
                borderRadius: 13,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontWeight: '700' }}>PAYMENT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textheader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  text1: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  text2: {
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#D5D5D5',
    borderColor: '#263259',
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
