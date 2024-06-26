// src/screens/RecipeCreateScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';

const RecipeCreateScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/recipe/recipes/', {
        title,
        description,
        time_minutes: parseInt(timeMinutes),
        price: parseFloat(price),
      });
      navigate(`/recipes/${response.data.id}`);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="RecipeCreateScreen">
      <h2>Create Recipe</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeMinutes" className="form-label">Time to Cook (minutes)</label>
          <input
            type="number"
            className="form-control"
            id="timeMinutes"
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeCreateScreen;
