import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setMeal(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching meal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pick My Meal</Text>
      <TouchableOpacity style={styles.button} onPress={fetchRandomMeal}>
        <Text style={styles.buttonText}>Get a Random Recipe 🍽️</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4caf50" style={styles.loader} />}

      {meal && !loading && (
        <View style={styles.recipeCard}>
          <Text style={styles.mealTitle}>{meal.strMeal}</Text>
          <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
          <Text style={styles.subTitle}>Category: {meal.strCategory}</Text>
          <Text style={styles.subTitle}>Area: {meal.strArea}</Text>
          <Text style={styles.instructions}>{meal.strInstructions}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#DB1717FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  mealTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#181527FF',
    textAlign: 'center',
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
    lineHeight: 20,
    textAlign: 'justify',
  },
});