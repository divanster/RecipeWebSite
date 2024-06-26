import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

interface Recipe {
  id: number;
  title: string;
  description: string;
  time_minutes: number;
  price: string;
}

const RecipeListScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get<Recipe[]>('/recipe/recipes/');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newRecipe = {
        title,
        description,
        time_minutes: parseInt(timeMinutes),
        price: parseFloat(price),
      };
      const response = await axiosInstance.post<Recipe>('/recipe/recipes/', newRecipe);
      setRecipes([...recipes, response.data]);
      setTitle('');
      setDescription('');
      setTimeMinutes('');
      setPrice('');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Recipes</h1>
      <ul className="list-group mb-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="list-group-item">
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
      <h2 className="mb-4">Add a New Recipe</h2>
      <Form onSubmit={handleAddRecipe}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="timeMinutes">
            <Form.Label>Time to Cook (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={timeMinutes}
              onChange={(e) => setTimeMinutes(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Add Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default RecipeListScreen;
