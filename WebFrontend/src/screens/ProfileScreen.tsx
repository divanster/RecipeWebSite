// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';

interface User {
  id: number;
  name: string;
  email: string;
  followers: number[];
  following: number[];
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  user: User;
}

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipe/recipes/');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchProfile();
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-4">
      {profile ? (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {profile.name}<br />
                <strong>Email:</strong> {profile.email}<br />
                <strong>Followers:</strong> {profile.followers.length}<br />
                <strong>Following:</strong> {profile.following.length}
              </Card.Text>
            </Card.Body>
          </Card>
          <h3>Your Recipes</h3>
          <ListGroup>
            {recipes.filter(recipe => recipe.user.id === profile.id).map(recipe => (
              <ListGroup.Item key={recipe.id}>
                <h5>{recipe.title}</h5>
                <p>{recipe.description}</p>
                <Button variant="primary" onClick={() => navigate(`/recipe/${recipe.id}`)}>View Recipe</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
