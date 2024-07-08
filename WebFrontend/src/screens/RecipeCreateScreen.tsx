import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface Tag {
  id: number;
  name: string;
}

interface Ingredient {
  id: number;
  name: string;
}

const RecipeCreateScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get('recipe/tags/');
        console.log('Fetched tags:', response.data);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setTags([]); // Ensure tags is always an array
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await axiosInstance.get('recipe/ingredients/');
        console.log('Fetched ingredients:', response.data);
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setIngredients([]); // Ensure ingredients is always an array
      }
    };

    fetchTags();
    fetchIngredients();
  }, []);

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      const tag = { id: Date.now(), name: newTag };
      setTags(prevTags => [...(Array.isArray(prevTags) ? prevTags : []), tag]);
      setSelectedTags(prevSelectedTags => [...prevSelectedTags, tag.id]);
      setNewTag('');
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      const ingredient = { id: Date.now(), name: newIngredient };
      setIngredients(prevIngredients => [...(Array.isArray(prevIngredients) ? prevIngredients : []), ingredient]);
      setSelectedIngredients(prevSelectedIngredients => [...prevSelectedIngredients, ingredient.id]);
      setNewIngredient('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('recipe/recipes/', {
        title,
        description,
        time_minutes: parseInt(timeMinutes),
        price: parseFloat(price),
        tags: selectedTags.map(id => {
          const tag = tags.find(t => t.id === id);
          return { name: tag?.name };
        }),
        ingredients: selectedIngredients.map(id => {
          const ingredient = ingredients.find(i => i.id === id);
          return { name: ingredient?.name };
        }),
      });
      navigate(`/recipes/${response.data.id}`);
    } catch (error: any) {
      if (error.response) {
        console.error('An error occurred:', error.response.data);
        setError(`An error occurred: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error('An error occurred:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setState: React.Dispatch<React.SetStateAction<number[]>>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setState(selectedOptions);
  };

  return (
    <Container className="mt-4">
      <h2>Create Recipe</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
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
        <Row className="mb-3">
          <Form.Group as={Col} controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedTags.map(String)} // Convert to string array
              onChange={(e) => handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>, setSelectedTags)}
            >
              {Array.isArray(tags) && tags.map(tag => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
            />
            <Button onClick={handleAddTag}>Add Tag</Button>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="ingredients">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedIngredients.map(String)} // Convert to string array
              onChange={(e) => handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>, setSelectedIngredients)}
            >
              {Array.isArray(ingredients) && ingredients.map(ingredient => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Add new ingredient"
            />
            <Button onClick={handleAddIngredient}>Add Ingredient</Button>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default RecipeCreateScreen;
