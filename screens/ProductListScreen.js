import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet,Image,} from 'react-native';
import Colors from '../Colors';

export default function ProductListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading Products...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛍️Trending Products</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }>
              <View style={styles.cardContent}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundTop,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.white ,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: Colors.text || '#333',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.text ,
    fontSize: 16,
  },
});
