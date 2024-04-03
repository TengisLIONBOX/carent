import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

export default function CategoryScreen(): React.ReactNode {
  const brands = [
    {
      id: '1',
      name: 'Tesla',
      img: 'https://www.pngall.com/wp-content/uploads/11/Tesla-Logo-PNG-Photos.png',
      brand: 'tesla',
    },
    {
      id: '2',
      name: 'Mercedes',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/1024px-Mercedes-Logo.svg.png',
      brand: 'mercedes',
    },
    {
      id: '3',
      name: 'Volkswagen',
      img: 'https://www.carlogos.org/logo/Volkswagen-logo-2015-1920x1080.png',
      brand: 'volkswagen',
    },
    {
      id: '4',
      name: 'Toyota',
      img: 'https://cdn.iconscout.com/icon/free/png-256/free-toyota-7-827471.png?f=webp',
      brand: 'toyota',
    },
    {
      id: '5',
      name: 'BMW',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png',
      brand: 'bmw',
    },
    {
      id: '6',
      name: 'Lamborghini',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png',
      brand: 'lamborghini',
    },
    {
      id: '7',
      name: 'Hyundai',
      img: 'https://1000logos.net/wp-content/uploads/2018/04/Hyundai-Logo-1990.png',
      brand: 'hyundai',
    },
    {
      id: '8',
      name: 'Audi',
      img: 'https://desireautoservice.com/wp-content/uploads/2023/12/audi-logo.png',
      brand: 'audi',
    },
    {
      id: '9',
      name: 'Geely',
      img: 'https://www.carlogos.org/logo/Geely-logo-2003-2560x1600.png',
      brand: 'geely',
    },
    {
      id: '10',
      name: 'Ford',
      img: 'https://cdn.icon-icons.com/icons2/2402/PNG/512/ford_logo_icon_145825.png',
      brand: 'ford',
    },
    {
      id: '11',
      name: 'Mazda',
      img: 'https://i.pinimg.com/originals/c8/46/4c/c8464c3622fd4ad0ebf8a019f575a9e3.png',
      brand: 'mazda',
    },
    {
      id: '12',
      name: 'Honda',
      img: 'https://www.sclubricants.com/wp-content/uploads/2020/12/honda-logo.png',
      brand: 'honda',
    },
    {
      id: '13',
      name: 'Cadillac',
      img: 'https://clipart-library.com/image_gallery2/Cadillac-Logo-Transparent.png',
      brand: 'cadillac',
    },
    {
      id: '14',
      name: 'Chevrolet',
      img: 'https://i.pinimg.com/originals/df/db/f8/dfdbf882762a265fc957e12fdd095858.png',
      brand: 'chevrolet',
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            width: 300,
            marginBottom: 40,
            marginLeft: 20,
          }}>
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
              onPress={() => router.push(`/brandcars/${el.brand}`)}>
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
                <Image
                  style={{ width: 70, height: 70, marginBottom: 7 }}
                  source={{ uri: el.img }}
                />
                <Text style={{ fontWeight: '500' }}>{el.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
});
