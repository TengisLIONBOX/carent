import { gql, useMutation } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-virtualized-view';

const GET_CAR_LIST = gql`
  query getCarList {
    getCarList {
      id
    }
  }
`;
const CREATE_CAR = gql`
  mutation CreateCarMutation($input: CarCreateInput!) {
    createCar(input: $input) {
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
      renterId
      rented
    }
  }
`;

export default function CreatepostScreen(): React.ReactNode {
  const [image1, setImage1] = useState<ImagePicker.ImagePickerAsset | undefined>();
  const [image2, setImage2] = useState<ImagePicker.ImagePickerAsset | undefined>();
  const [success, setSuccess] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [createCar] = useMutation(CREATE_CAR, {
    refetchQueries: [{ query: GET_CAR_LIST }],
  });
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const frontImgUrl = image1?.uri ?? '';
  const backImgUrl = image2?.uri ?? '';
  interface FormValues {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    brand: string;
    color: string;
    kilometers: string;
    transmission: string;
    seats: string;
    fuel: string;
    engine: string;
    description: string;
    phone: string;
    price: string;
  }
  const Submit = (values: FormValues) => {
    const {
      name,
      address,
      latitude,
      longitude,
      brand,
      color,
      kilometers,
      transmission,
      seats,
      fuel,
      engine,
      description,
      phone,
      price,
    } = values;

    if (
      !name ||
      !address ||
      !latitude ||
      !longitude ||
      !brand ||
      !color ||
      !kilometers ||
      !transmission ||
      !seats ||
      !fuel ||
      !engine ||
      !description ||
      !phone ||
      !price
    ) {
      console.log('Please fill in all the required fields.');
      return;
    }

    createCar({
      variables: {
        input: {
          name: String(name),
          address: String(address),
          latitude: String(latitude),
          longitude: String(longitude),
          brand: String(brand),
          color: String(color),
          kilometers: Number(kilometers),
          transmission: String(transmission),
          seats: Number(seats),
          fuel: String(fuel),
          engine: Number(engine),
          frontimg: frontImgUrl,
          backimg: backImgUrl,
          description: String(description),
          phone: Number(phone),
          price: Number(price),
          renterId: String(user.id),
          rented: false,
          rentedId: '',
          rentedAt: '',
          daysRented: '',
          renterPhone: '',
        },
      },
    });

    setSuccess(!success);
  };

  if (status !== null && !status.granted) {
    return (
      <View style={styles.container}>
        <Text>Give camera permission</Text>
        <Button title="Enable camera" onPress={() => requestPermission()} />
      </View>
    );
  }

  const pickImage1 = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage1(result.assets[0]);
    }
  };

  const pickImage2 = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage2(result.assets[0]);
    }
  };

  const amjilttai = () => {
    setSuccess(!success);
    router.push('/');
  };
  return (
    <View style={styles.container}>
      {success ? (
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
          <TouchableOpacity onPress={amjilttai}>
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
                Successfully created
              </Text>
            </View>
          </TouchableOpacity>
        </BlurView>
      ) : (
        <></>
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
        <View>
          <Text
            style={{
              color: '#003D82',
              fontSize: 20,
              fontWeight: '500',
              paddingBottom: 35,
              paddingTop: 15,
              paddingLeft: 45,
            }}>
            ADD CAR
          </Text>
          <Formik
            onSubmit={(values) => Submit(values)}
            initialValues={{
              phone: '',
              engine: '',
              address: '',
              latitude: '',
              longitude: '',
              description: '',
              name: '',
              brand: '',
              color: '',
              kilometers: '',
              price: '',
              transmission: '',
              seats: '',
              fuel: '',
            }}>
            {({ handleChange, handleBlur, values, setFieldValue }) => (
              <View style={{ gap: 20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={pickImage1}>
                  <Text style={styles.text1}>Front Car</Text>
                  <View
                    style={{
                      width: 300,
                      height: 130,
                      backgroundColor: '#ECECEC',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    {image1 ? (
                      <Image source={{ uri: image1.uri }} style={{ width: 200, height: 120 }} />
                    ) : (
                      <>
                        <MaterialCommunityIcons name="camera-outline" size={32} color="#767676" />
                        <Text style={{ color: '#767676' }}>Add your photos here</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage2}>
                  <Text style={styles.text1}>Back Car</Text>
                  <View
                    style={{
                      width: 300,
                      height: 130,
                      backgroundColor: '#ECECEC',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    {image2 ? (
                      <Image source={{ uri: image2.uri }} style={{ width: 200, height: 120 }} />
                    ) : (
                      <>
                        <MaterialCommunityIcons name="camera-outline" size={32} color="#767676" />
                        <Text style={{ color: '#767676' }}>Add your photos here</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Phone Number</Text>

                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        placeholder="Your phone number"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Engine</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleChange('engine')}
                        onBlur={handleBlur('engine')}
                        value={values.engine}
                        placeholder="Your car engine"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>

                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Your address line</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.biginput}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        placeholder="Your address line"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Location latitude</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleChange('latitude')}
                        onBlur={handleBlur('latitude')}
                        value={values.latitude}
                        placeholder="Your location latitude"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>

                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Location longitude</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleChange('longitude')}
                        onBlur={handleBlur('longitude')}
                        value={values.longitude}
                        placeholder="Your location longitude"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}> Car name</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Your car name"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Car brand</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#C7C7C7',
                      }}>
                      <RNPickerSelect
                        onValueChange={(e) => {
                          setFieldValue('brand', e);
                        }}
                        value={values.brand}
                        items={[
                          { label: 'Volkswagen', value: 'volkswagen' },
                          { label: 'Tesla', value: 'tesla' },
                          { label: 'Hyundai', value: 'hyundai' },
                          { label: 'Audi', value: 'audi' },
                          { label: 'Ford', value: 'ford' },
                          { label: 'Mazda', value: 'mazda' },
                          { label: 'Honda', value: 'honda' },
                          { label: 'Toyota', value: 'toyota' },
                          { label: 'Mercedes', value: 'mercedes' },
                          { label: 'BMW', value: 'bmw' },
                          { label: 'Geely', value: 'geely' },
                          { label: 'Lamborghini', value: 'lamborghini' },
                          { label: 'Cadillac', value: 'cadillac' },
                          { label: 'Chevrolet', value: 'chevrolet' },
                        ]}
                        style={{
                          inputAndroid: {
                            width: 300,
                            height: 55,
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            paddingRight: 30,
                          },
                        }}
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Car Description</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.biginput}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        placeholder="Your car description"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Car color</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#C7C7C7',
                      }}>
                      <RNPickerSelect
                        onValueChange={(e) => {
                          setFieldValue('color', e);
                        }}
                        value={values.color}
                        items={[
                          { label: 'Black', value: 'black' },
                          { label: 'Blue', value: 'blue' },
                          { label: 'Red', value: 'red' },
                          { label: 'White', value: 'white' },
                          { label: 'Grey', value: 'grey' },
                          { label: 'Orange', value: 'orange' },
                          { label: 'Purple', value: 'purple' },
                          { label: 'Green', value: 'green' },
                        ]}
                        style={{
                          inputAndroid: {
                            width: 300,
                            height: 55,
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            paddingRight: 30,
                          },
                        }}
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Kilometers</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleChange('kilometers')}
                        onBlur={handleBlur('kilometers')}
                        value={values.kilometers}
                        placeholder="Your kilometers"
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Transmission</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#C7C7C7',
                      }}>
                      <RNPickerSelect
                        onValueChange={(e) => {
                          setFieldValue('transmission', e);
                        }}
                        value={values.transmission}
                        items={[
                          { label: 'Manual', value: 'manual' },
                          { label: 'Automatic', value: 'automatic' },
                        ]}
                        style={{
                          inputAndroid: {
                            width: 300,
                            height: 55,
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            paddingRight: 30,
                          },
                        }}
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Seats</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#C7C7C7',
                      }}>
                      <RNPickerSelect
                        onValueChange={(e) => {
                          setFieldValue('seats', e);
                        }}
                        value={values.seats}
                        items={[
                          { label: '1', value: '1' },
                          { label: '2', value: '2' },
                          { label: '3', value: '3' },
                          { label: '4', value: '4' },
                          { label: '5', value: '5' },
                          { label: '6', value: '6' },
                          { label: '7', value: '7' },
                        ]}
                        style={{
                          inputAndroid: {
                            width: 300,
                            height: 55,
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            paddingRight: 30,
                          },
                        }}
                      />
                    </View>
                  </View>
                </SafeAreaView>

                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>1 day rent price</Text>
                    <View style={styles.searchContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.price}
                        placeholder=""
                        placeholderTextColor="#C7C7C7"
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <SafeAreaView>
                  <View>
                    <Text style={styles.text1}>Fuel</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#C7C7C7',
                      }}>
                      <RNPickerSelect
                        onValueChange={(e) => {
                          setFieldValue('fuel', e);
                        }}
                        value={values.fuel}
                        items={[
                          { label: 'Electric', value: 'electric' },
                          { label: 'Gas', value: 'gas' },
                          { label: 'Hybrid', value: 'hybrid' },
                          { label: 'Diesel', value: 'diesel' },
                          { label: 'Petrol', value: 'petrol' },
                        ]}
                        style={{
                          inputAndroid: {
                            width: 300,
                            height: 55,
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            paddingRight: 30,
                          },
                        }}
                      />
                    </View>
                  </View>
                </SafeAreaView>

                <TouchableOpacity onPress={() => Submit(values)}>
                  <View
                    style={{
                      width: 300,
                      height: 62,
                      backgroundColor: '#003D82',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Add Car</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#C7C7C7',
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  biginput: {
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    width: 300,
    height: 130,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#C7C7C7',
    color: 'black',
    padding: 15,
  },

  text1: { fontSize: 16, fontWeight: '500', marginBottom: 10 },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
