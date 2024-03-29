import { gql, useQuery } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
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
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-virtualized-view';

import { Bmw } from '../icons/Bmw';
import { Mercedes } from '../icons/Mercedes';
import { Tesla } from '../icons/Tesla';
import { Bugatti } from '../icons/bugatti';
import { Ferrari } from '../icons/ferrari';

const GET_CAR_LIST = gql`
  query getCarList {
    getCarList {
      id
      name
      price
      frontimg
    }
  }
`;

export default function TabOneScreen(): React.ReactNode {
  const { isLoaded, isSignedIn, user } = useUser();

  const { data, loading, error } = useQuery(GET_CAR_LIST);
  if (loading) return <Spinner visible={loading} />;
  if (error) return <Text>{error.message}...</Text>;
  // const [param, setParam] = useState('');

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const category = [
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingHorizontal: 22,
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.headerText}>Hello {user.username} 👋</Text>
              <Text style={styles.subHeaderText}>Let's find your favorite car here!</Text>
            </View>
          </View>

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
            data={category}
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
              data={data.getCarList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/carinfo/${item.id}`)}
                  style={{
                    marginBottom: 20,
                  }}>
                  <View style={styles.item}>
                    <View style={{ alignItems: 'center' }}>
                      <Image style={styles.image2} source={{ uri: item.frontimg }} />
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
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 23,
    gap: 7,
  },
  input: {
    width: 280,
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
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
    marginTop: 15,
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
