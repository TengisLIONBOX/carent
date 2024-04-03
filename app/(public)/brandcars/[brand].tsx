import { gql, useLazyQuery } from '@apollo/client';
import { router, useGlobalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-virtualized-view';

interface Car {
  id: string;
  name: string;
  price: number;
  frontimg: string;
}

interface GetCarsByBrandData {
  getCarsByBrand: Car[];
}

const GET_CARS_BY_BRAND = gql`
  query getCarsByBrand($brand: String!) {
    getCarsByBrand(brand: $brand) {
      id
      name
      price
      frontimg
    }
  }
`;

export default function BrandCarsScreen(): JSX.Element {
  const { brand } = useGlobalSearchParams();
  const [getCarsByBrand, { data, loading, error }] =
    useLazyQuery<GetCarsByBrandData>(GET_CARS_BY_BRAND);

  useEffect(() => {
    getCarsByBrand({
      variables: {
        brand,
      },
    });
  }, [getCarsByBrand, brand]);

  if (loading || !data) return <Spinner visible />;
  if (error) return <Text>{error.message}...</Text>;

  if (data.getCarsByBrand.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>This Brand is Empty 😔</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={data?.getCarsByBrand ?? []}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push(`/carinfo/${item.id}`)}
                  style={{ marginBottom: 20 }}>
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
