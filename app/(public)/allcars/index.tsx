import { gql, useQuery } from '@apollo/client';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import LoaderSkeleton2 from '../loading2';

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

export default function AllcarsScreen(): React.ReactNode {
  const { data, loading, error } = useQuery(GET_CAR_LIST);

  if (loading) return <LoaderSkeleton2 />;
  if (error) return <Text>{error.message}...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    width: 330,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  image: {
    width: 328,
    height: 200,
    borderRadius: 20,
  },
});
