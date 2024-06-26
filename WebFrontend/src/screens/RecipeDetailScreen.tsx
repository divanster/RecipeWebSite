// src/screens/RecipeDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';

interface Recipe {
  id: number;
  title: string;
  description: string;
  time_minutes: number;
  price: string;
  // Add other relevant fields
}

const RecipeDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get<Recipe>(`/recipe/recipes/${id}/`);
        setRecipe(response.data);
      } catch (error) {
        setError('Error fetching recipe details.');
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Time to cook: {recipe.time_minutes} minutes</p>
      <p>Price: ${recipe.price}</p>
      {/* Add other relevant fields */}
    </div>
  );
};

export default RecipeDetailScreen;
