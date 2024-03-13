import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function CategoryScreen(): React.ReactNode {
  const brands = [
    {
      id: '1',
      name: 'Tesla',
      img: 'https://www.pngall.com/wp-content/uploads/11/Tesla-Logo-PNG-Photos.png',
    },
    {
      id: '2',
      name: 'Mercedes',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png',
    },
    {
      id: '3',
      name: 'Ferrari',
      img: 'https://logos-world.net/wp-content/uploads/2020/07/Ferrari-Scuderia-Logo.png',
    },
    {
      id: '4',
      name: 'Bugatti',
      img: 'https://pngimg.com/d/bugatti_logo_PNG3.png',
    },
    {
      id: '5',
      name: 'BMW',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png',
    },
    {
      id: '6',
      name: 'Lamborghini',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', width: 300, marginBottom: 40 }}>
        Which brand of car you prefer?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {brands.map((el) => (
          <TouchableOpacity
            key={el.id}
            style={{ margin: 13 }}
            onPress={() => router.push('/allcars/')}>
            <View
              key={el.id}
              style={{
                backgroundColor: '#F8F8F8',
                width: 160,
                height: 135,
                borderRadius: 13,
                alignItems: 'center',
                padding: 20,
                borderWidth: 2,
                borderColor: '#F0F0F0',
              }}>
              <Image style={{ width: 70, height: 70, marginBottom: 7 }} source={{ uri: el.img }} />
              <Text style={{ fontWeight: '500' }}>{el.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
