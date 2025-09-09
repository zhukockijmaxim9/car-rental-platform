import { useState } from "react";
import { Container, Typography, TextField, Button, Rating } from "@mui/material";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Review({ token }) {
  const [carId] = useState(window.location.pathname.split("/")[2]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "/reviews",
        { car_id: parseInt(carId), rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Review submitted!");
    } catch (err) {
      alert(err.response?.data?.error || "Error submitting review");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Leave a Review</Typography>
      <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} />
      <TextField
        label="Comment"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Container>
  );
}

export default Review;
