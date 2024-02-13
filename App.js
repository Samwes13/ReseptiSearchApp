import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';


export default function App() {
  const [ainesosa, setAinesosa] = useState('');
  const [resepti, setResepti] = useState([]);

  const searchRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ainesosa}`)
      .then(response => response.json())
      .then(data => {
        setResepti(data.meals);
      })
      .catch(error => console.error(error));
  };
  
  const renderResepti = ({ item }) => (
    <View style={styles.recipeItem}>
      <Image 
        source={{ uri: item.strMealThumb }} 
        style={styles.thumbnail} />
      <Text>{item.strMeal}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <FlatList
        style={{ width: '100%' }}
        data={resepti}
        renderItem={renderResepti}
        keyExtractor={item => item.idMeal}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter ingredient"
        value={ainesosa}
        onChangeText={text => setAinesosa(text)}
      />
      <Button title="Search" onPress={searchRecipes} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
