import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
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

export default function CreatepostScreen(): React.ReactNode {
  const [image1, setImage1] = useState<ImagePicker.ImagePickerAsset | undefined>();
  const [image2, setImage2] = useState<ImagePicker.ImagePickerAsset | undefined>();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  console.log({ status });
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

  console.log(image1);

  return (
    <View style={styles.container}>
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

          <View style={{ gap: 20, justifyContent: 'center', alignItems: 'center' }}>
            <SafeAreaView>
              <View>
                <Text style={styles.text1}>Phone Number</Text>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    // value={param}
                    // onChangeText={setParam}
                    placeholder="Your phone number"
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
                    // value={param}
                    // onChangeText={setParam}
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
                    // value={param}
                    // onChangeText={setParam}
                    placeholder="Your phone number"
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
                    // value={param}
                    // onChangeText={setParam}
                    placeholder="Your phone number"
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
                    // value={param}
                    // onChangeText={setParam}
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
                    onValueChange={(value) => console.log(value)}
                    items={[
                      { label: 'Ferrari', value: 'ferrari' },
                      { label: 'Toyota', value: 'toyota' },
                      { label: 'Mercedes', value: 'mercedes' },
                      { label: 'BMW', value: 'bmw' },
                      { label: 'Geely', value: 'geely' },
                      { label: 'Lamborghini', value: 'lamborghini' },
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
                    // value={param}
                    // onChangeText={setParam}
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
                    onValueChange={(value) => console.log(value)}
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
                    // value={param}
                    // onChangeText={setParam}
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
                    onValueChange={(value) => console.log(value)}
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
                    onValueChange={(value) => console.log(value)}
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
                <Text style={styles.text1}>Fuel</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: '#C7C7C7',
                  }}>
                  <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
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

            <TouchableOpacity>
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
