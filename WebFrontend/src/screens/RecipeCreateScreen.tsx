import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeCreateScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('time_minutes', timeMinutes);
    formData.append('price', price);
    formData.append('link', link);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    tags.forEach(tag => formData.append('tags', tag));
    ingredients.forEach(ingredient => formData.append('ingredients', ingredient));

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      await axios.post('/api/recipes/', formData, config);
      navigate('/recipes');
    } catch (error) {
      console.error('There was an error creating the recipe!', error);
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="timeMinutes">Time (minutes)</label>
          <input
            type="number"
            id="timeMinutes"
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients.join(', ')}
            onChange={(e) => setIngredients(e.target.value.split(',').map(ingredient => ingredient.trim()))}
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeCreateScreen;
