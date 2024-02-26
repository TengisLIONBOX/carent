import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
// import React, { useState } from 'react';
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
import { ScrollView } from 'react-native-virtualized-view';

import { Bmw } from '../icons/Bmw';
import { Mercedes } from '../icons/Mercedes';
import { Tesla } from '../icons/Tesla';
import { Bugatti } from '../icons/bugatti';
import { Ferrari } from '../icons/ferrari';

export default function TabOneScreen(): React.ReactNode {
  // const [param, setParam] = useState('');

  interface CarItem {
    id: string;
    img: React.ReactNode;
    name: string;
  }
  interface CarItem2 {
    id: string;
    img: string;
    name: string;
    price: number;
  }

  const data: CarItem[] = [
    {
      id: '1',
      name: 'Tesla',
      img: <Tesla />,
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

  const cardata: CarItem2[] = [
    {
      id: '1',
      name: 'Tesla',
      img: 'https://images.hgmsites.net/lrg/2017-tesla-model-s-p100d-awd-angular-front-exterior-view_100741523_l.jpg',
      price: 50,
    },
    {
      id: '2',
      name: 'Mercedes',
      img: 'https://www.mercedes-benz.co.in/content/india/en/passengercars/_jcr_content/root/responsivegrid/simple_teaser_115569/simple_teaser_item_c_193667439.component.damq2.3342710579709.jpg/E-Class%20banner_Mobile_1534x1151%20pixels-01.jpg',
      price: 75,
    },
    {
      id: '3',
      name: 'Ferrari',
      img: 'https://hips.hearstapps.com/hmg-prod/images/2024-ferrari-812-gts-101-64caae4038b21.jpeg?crop=0.526xw:0.701xh;0.137xw,0.299xh&resize=768:*',
      price: 230,
    },
    {
      id: '4',
      name: 'BMW',
      img: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/BMW/X5-2023/10452/1688992642182/front-left-side-47.jpg',
      price: 100,
    },
    {
      id: '5',
      name: 'Bugatti',
      img: 'https://cdn.arstechnica.net/wp-content/uploads/2021/07/2021-Bugatti-Chiron-Pur-Sport-1.jpg',
      price: 200,
    },
  ];

  // console.log(param);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Hello Bataa 👋</Text>
          <Text style={styles.subHeaderText}>Let's find your favorite car here!</Text>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                // value={param}
                // onChangeText={setParam}
                placeholder="Search..."
                placeholderTextColor="#DDDDDD"
              />
              <TouchableOpacity style={styles.searchButton}>
                <AntDesign name="search1" color="white" size={25} />
              </TouchableOpacity>
            </View>
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
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={{ marginRight: 30, alignItems: 'center', gap: 5 }}>
                  {item.img}
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>

        <View style={styles.section2}>
          <View style={styles.sectionHeader2}>
            <Text style={styles.sectionHeaderText2}>Popular Cars</Text>
            <TouchableOpacity onPress={() => router.push('/allcars/')}>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={cardata}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginBottom: 20,
                  }}
                  onPress={() => router.push('/carinfo/')}>
                  <View style={styles.item}>
                    <View style={{ alignItems: 'center' }}>
                      <Image style={styles.image2} source={{ uri: item.img }} />
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
                    </View>
                  </View>
                </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  header: {
    paddingTop: Constants.statusBarHeight + 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: '7%',
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: '7%',
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
    backgroundColor: '#003D82',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 55,
    padding: 7,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
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
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  section2: {
    marginTop: 20,
    paddingHorizontal: 20,
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
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    width: 330,
    borderWidth: 1,
    borderColor: '#F3F3F3',
  },
  image: {
    width: 45,
    height: 45,
  },
  image2: {
    width: 328,
    height: 200,
    borderRadius: 20,
  },
});
