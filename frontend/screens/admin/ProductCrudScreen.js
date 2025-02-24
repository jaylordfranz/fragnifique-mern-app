import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = 'http://192.168.8.36:5000/api/products'; // Ensure this matches your backend

const ProductCrudScreen = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Fixed property name
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri); // ✅ Expo SDK 49+ uses `result.assets`
    }
  };  

  const handleSave = async () => {
    if (!name || !price || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
  
    if (image && image !== editingProduct?.image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'product.jpg',
      });
    }
  
    console.log("📝 Sending data:", formData);
  
    try {
      if (editingProduct) {
        // ✅ Send a PUT request for updating
        const response = await axios.put(`${API_URL}/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('✅ Product updated:', response.data);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        // ✅ Send a POST request for adding new
        const response = await axios.post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('✅ Product saved:', response.data);
        Alert.alert('Success', 'Product added successfully');
      }
  
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('❌ Error saving product:', error.response?.data || error);
      Alert.alert('Error', 'Failed to save product');
    }
  };  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Alert.alert('Deleted', 'Product removed');
      fetchProducts();
    } catch (error) {
      console.error('❌ Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImage(product.image);
    setEditingProduct(product);
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setEditingProduct(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingProduct ? 'Edit Product' : 'Add Product'}</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      
      <Button title="Pick an image" onPress={handleImagePick} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <Button title={editingProduct ? 'Update Product' : 'Add Product'} onPress={handleSave} />
      
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            {item.image ? (
  <Image source={{ uri: item.image }} style={styles.productImage} onError={() => console.log("Image load error:", item.image)} />
) : (
  <Text>No Image</Text>
)}

            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <Text>{item.description}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" color="red" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  image: { width: 100, height: 100, marginVertical: 10 },
  product: { padding: 15, backgroundColor: '#fff', marginVertical: 5, borderRadius: 5 },
  productImage: { width: 50, height: 50, marginBottom: 5 },
});

export default ProductCrudScreen;