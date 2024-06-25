import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// @ts-ignore
import { useRoute, RouteProp } from '@react-navigation/native';
import API from '../services/api';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

type RootStackParamList = {
  RecipeDetail: { id: number };
};

const RecipeDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipeDetail'>>();
  const { id } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get(`recipe/recipes/${id}/`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Failed to fetch recipe', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text>{recipe.description}</Text>
      {/* Add other recipe details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RecipeDetailScreen;
