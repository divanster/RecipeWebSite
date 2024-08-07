// src/screens/RecipeDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import { Button, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

interface User {
  id: number;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  time_minutes: number;
  price: string;
  is_liked: boolean;
  average_rating: number;
  ratings_count: number;
  user: User;
  ratings: { score: number; user: number }[];
  comments: { id: number; content: string; user: number; created_at: string }[];
}

const RecipeDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const fetchRecipe = async () => {
    try {
      const response = await axiosInstance.get<Recipe>(`/recipe/recipes/${id}/`);
      setRecipe(response.data);
    } catch (error) {
      setError('Error fetching recipe details.');
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (recipe) {
      try {
        const url = recipe.is_liked ? `/recipe/recipes/${id}/unlike/` : `/recipe/recipes/${id}/like/`;
        await axiosInstance.post(url);
        fetchRecipe();
      } catch (error) {
        console.error('Error liking/unliking recipe:', error);
      }
    }
  };

  const handleRate = async (newRating: number) => {
    if (recipe) {
      try {
        await axiosInstance.post(`/recipe/recipes/${id}/rate/`, { score: newRating });
        setRating(0);  // Clear the rating after submission
        fetchRecipe();
      } catch (error) {
        console.error('Error rating recipe:', error);
      }
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe) {
      try {
        await axiosInstance.post(`/recipe/recipes/${id}/add-comment/`, { content: comment });
        setComment('');
        fetchRecipe();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axiosInstance.delete(`/recipe/comments/${commentId}/delete-comment/`);
      fetchRecipe(); // Refresh the recipe details to update the comments
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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
      <p>Average Rating: {recipe.average_rating} ({recipe.ratings_count} ratings)</p>
      <p>Posted by: {recipe.user.name}</p>
      <Button variant="primary" onClick={handleLike}>
        {recipe.is_liked ? 'Unlike' : 'Like'}
      </Button>
      <div className="mt-4">
        <Form.Label>Rate this recipe</Form.Label>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          changeRating={handleRate}
          numberOfStars={5}
          name='rating'
          starDimension="30px"
          starSpacing="5px"
        />
      </div>
      <Form onSubmit={handleComment} className="mt-4">
        <Form.Group controlId="comment">
          <Form.Label>Add a Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>
      <h2 className="mt-4">Comments</h2>
      <ul className="list-group">
        {recipe.comments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            <p>{comment.content}</p>
            <small>By User {comment.user} on {new Date(comment.created_at).toLocaleString()}</small>
            <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetailScreen;
