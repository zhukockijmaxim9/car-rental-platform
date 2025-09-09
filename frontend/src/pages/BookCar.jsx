import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function BookCar({ token }) {
  const [carId] = useState(window.location.pathname.split("/")[2]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBook = async () => {
    try {
      await axios.post(
        "/bookings",
        { car_id: parseInt(carId), start_date: startDate, end_date: endDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Booking created!");
    } catch (err) {
      alert(err.response?.data?.error || "Error booking car");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Book Car</Typography>
      <TextField
        label="Start Date"
        type="date"
        fullWidth
        margin="normal"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField label="End Date" type="date" fullWidth margin="normal" onChange={(e) => setEndDate(e.target.value)} />
      <Button variant="contained" onClick={handleBook}>
        Book
      </Button>
    </Container>
  );
}

export default BookCar;
