import React, { useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Mercedes } from '../icons/Mercedes';
import { Bmw } from '../icons/Bmw';
import { Bugatti } from '../icons/bugatti';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Ferrari } from '../icons/ferrari';

export default function TabOneScreen(): React.ReactNode {
  const [param, setParam] = useState('');

  interface CarItem {
    id: string;
    img: React.ReactNode | string;
    name: string;
  }

  const data: CarItem[] = [
    {
      id: '1',
      name: 'Tesla',
      img: <Mercedes />,
    },
    {
      id: '2',
      name: 'Mercedes',
      img: <Mercedes />,
    },
    {
      id: '3',
      name: 'Ferrari',
      img: <Ferrari />,
    },
    {
      id: '4',
      name: 'Bugatti',
      img: <Bugatti />,
    },
    {
      id: '5',
      name: 'BMW',
      img: <Bmw />,
    },
  ];

  const cardata: CarItem[] = [
    {
      id: '1',
      name: 'Tesla',
      img: 'https://images.hgmsites.net/lrg/2017-tesla-model-s-p100d-awd-angular-front-exterior-view_100741523_l.jpg',
    },
    {
      id: '2',
      name: 'Mercedes',
      img: 'https://www.carscoops.com/wp-content/uploads/2016/04/2017-Tesla-Model-S-555.jpg',
    },
    {
      id: '3',
      name: 'Ferrari',
      img: 'https://www.cars.com/i/large/in/v2/stock_photos/dd294a63-5d12-45b8-91c8-e9f10a1991a5/e40c4950-8689-40a5-9ade-1ac64526df8b.png',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const renderItem = ({ item }: { item: CarItem }) => (
    <TouchableOpacity>
      <View style={{ marginRight: 30, alignItems: 'center' }}>
        {item.img}
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const renderCarItem = ({ item }: { item: CarItem }) => (
    <TouchableOpacity>
      <View style={styles.item}>
        {typeof item.img === 'string' ? (
          <Image style={styles.image2} source={{ uri: item.img }} />
        ) : (
          <View>{item.img}</View>
        )}
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Hello Bataa 👋</Text>
          <Text style={styles.subHeaderText}>Let's find your favorite car here!</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={param}
              onChangeText={setParam}
              placeholder="Search..."
              placeholderTextColor="#DDDDDD"
            />
            <TouchableOpacity style={styles.searchButton}>
              <AntDesign name="search1" color="white" size={25} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Trending Brands</Text>
            <TouchableOpacity onPress={() => router.push('/category/')}>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
          />
          {/* {data.map((car) => {
            return <View key={car.id}>{car.img}</View>;
          })} */}
        </View>

        <View style={styles.section2}>
          <View style={styles.sectionHeader2}>
            <Text style={styles.sectionHeaderText2}>Popular Cars</Text>
            <TouchableOpacity>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={cardata} renderItem={renderCarItem} keyExtractor={(item) => item.id} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: Constants.statusBarHeight + 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 7,
  },
  input: {
    width: 280,
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    borderColor: '#EAEAEA',
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    height: 55,
    backgroundColor: '#C3E54B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 55,
    padding: 7,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section2: {
    marginTop: 20,
  },
  sectionHeader2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  sectionHeaderText2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: 45,
    height: 45,
  },
  image2: {
    width: 300,
    height: 200,
  },
});
