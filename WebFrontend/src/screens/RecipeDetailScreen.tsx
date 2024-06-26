// src/screens/RecipeDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import { useParams } from 'react-router-dom';

interface Tag {
  id: number;
  name: string;
}

interface Ingredient {
  id: number;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  time_minutes: number;
  price: number;
  tags: Tag[];
  ingredients: Ingredient[];
}

const RecipeDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get<Recipe>(`/recipes/${id}/`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Time: {recipe.time_minutes} minutes</p>
      <p>Price: ${recipe.price}</p>
      <h3>Tags</h3>
      <ul>
        {recipe.tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetailScreen;
