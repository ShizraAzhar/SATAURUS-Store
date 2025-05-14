import React from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet, Dimensions } from 'react-native';
import Colors from '../Colors';

const { height, width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="📷 Open Camera" color={Colors.primary} onPress={() => navigation.navigate('ProductList')} />
      </View>
    </ScrollView>
  );
}

//styling part
const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: height * 0.3,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: Colors.primary,
  },
  category: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    color: Colors.accent,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: Colors.text,
    marginTop: 12,
    lineHeight: 20,
  },
});
