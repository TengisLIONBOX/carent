import { gql, useLazyQuery } from '@apollo/client';
import { useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Loading from '../loading';

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
    }
  }
`;
export default function CheckoutScreen(): React.ReactNode {
  const [days, setDays] = useState('');
  const [totalprice, setTotal] = useState('');
  const { id } = useGlobalSearchParams();
  const [getCarById, { loading, error, data }] = useLazyQuery(GET_CAR_BY_ID);
  console.log(id);

  useEffect(() => {
    getCarById({
      variables: {
        id,
      },
    });
    const dayprice = Number(car?.price) * Number(days ?? 0);

    setTotal(String(dayprice + 8));
  }, [getCarById, id, days]);

  if (loading) return <Loading />;
  if (error) return <Text>{error.message}</Text>;

  const car = data?.getCarById;

  if (car == null) {
    return null;
  }
  console.log(days);

  return (
    <View style={styles.container}>
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
              <Text style={styles.text2}>Kanye West</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Address line</Text>
              <Text style={styles.text2}>{car.address}</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Email address</Text>
              <Text style={styles.text2}>ye123@gmail.com</Text>
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
          <TouchableOpacity>
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
});
