import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoaderSkeleton2() {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginBottom: 20,
            }}>
            <View style={styles.item}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.image} />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 15, marginLeft: 10 }}>****</Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#4278FC',
                  }}>
                  $**** / day
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 20,
            }}>
            <View style={styles.item}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.image} />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 15, marginLeft: 10 }}>****</Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#4278FC',
                  }}>
                  $**** / day
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 20,
            }}>
            <View style={styles.item}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.image} />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 15, marginLeft: 10 }}>****</Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#4278FC',
                  }}>
                  $**** / day
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
