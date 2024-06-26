// src/screens/RecipeListScreen.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface Recipe {
  id: number;
  title: string;
}

const RecipeListScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get<Recipe[]>('recipe/recipes/');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <Button variant="primary">Wonder Button</Button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListScreen;
