import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

export default function AllcarsScreen(): React.ReactNode {
  const cars = [
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
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50 }}>
          {/* <Text style={{ fontSize: 32, fontWeight: 'bold', width: 300, marginBottom: 40 }}>
            Which brand of car you prefer?
          </Text> */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={cars}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => router.push('/carinfo/')}
                  style={{
                    marginBottom: 20,
                  }}>
                  <View style={styles.item}>
                    <View style={{ alignItems: 'center' }}>
                      <Image style={styles.image} source={{ uri: item.img }} />
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
    paddingTop: Constants.statusBarHeight,
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
