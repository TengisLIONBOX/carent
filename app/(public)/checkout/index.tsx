import Constants from 'expo-constants';
import { useState } from 'react';
// import { router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function CheckoutScreen(): React.ReactNode {
  const [number, onChangeNumber] = useState('1');
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 27,
            fontWeight: '700',
            marginBottom: 23,
          }}>
          Checkout
        </Text>
        <View>
          <Text style={styles.textheader}>CAR DETAIL</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 }}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 3 }}>
                Ferrari model W
              </Text>
              <Text style={{ fontSize: 17, fontWeight: '500', marginBottom: 3, color: '#0057AE' }}>
                $77 / day
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 3 }}>
                Ulaanbaatar, Chingeltei
              </Text>
            </View>
            <Image
              style={{ width: 93, height: 93, borderRadius: 15 }}
              source={{
                uri: 'https://hips.hearstapps.com/hmg-prod/images/2024-ferrari-812-gts-101-64caae4038b21.jpeg?crop=0.526xw:0.701xh;0.137xw,0.299xh&resize=768:*',
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
              <Text style={styles.text2}>Ulaanbaatar, Mongolia</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Email address</Text>
              <Text style={styles.text2}>ye123@gmail.com</Text>
            </View>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Phone number</Text>
              <Text style={styles.text2}>99117788</Text>
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.textheader}>ADDITIONAL</Text>
            <View>
              <Text style={{ fontWeight: '500', fontSize: 15, marginBottom: 10 }}>
                How many days are you gonna rent?
              </Text>
              <SafeAreaView>
                <TextInput
                  style={{
                    width: 100,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: 15,
                    borderColor: '#C5C5C5',
                    padding: 10,
                  }}
                  onChangeText={onChangeNumber}
                  value={number}
                  keyboardType="numeric"
                />
              </SafeAreaView>
            </View>
          </View>
          <View style={{ marginBottom: 13 }}>
            <Text style={styles.textheader}>PRICE DETAILS</Text>
            <View
              style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.text1}>Trip price</Text>
              <Text style={styles.text2}>$10</Text>
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
              <Text style={{ fontSize: 18, fontWeight: '600' }}>$18</Text>
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
    paddingTop: Constants.statusBarHeight + 40,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
