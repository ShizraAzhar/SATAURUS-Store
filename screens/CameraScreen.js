import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Dimensions, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../Colors';

const { width } = Dimensions.get('window');

export default function CameraScreen() {
  const [image, setImage] = useState(null);
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission is required!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="📸 Take Photo" color={Colors.primary} onPress={openCamera} />
      <View style={styles.imageFrame}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image captured</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: Colors.backgroundTop,
  },
  imageFrame: {
    marginTop: 30,
    width: width * 0.85,
    height: width * 0.65, // maintains 4:3 ratio
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
});
