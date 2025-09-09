import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, TextField, Grid, Card, CardContent, Button, Box } from "@mui/material";
import axios from "axios";

function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/cars").then((res) => setCars(res.data));
  }, []);

  const filteredCars = cars.filter((car) => car.model.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <Typography variant="h4">Car Rental</Typography>
      <TextField label="Search cars" fullWidth onChange={(e) => setSearch(e.target.value)} margin="normal" />
      <Grid container spacing={2}>
        {filteredCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{car.model}</Typography>
                <Typography>Year: {car.year}</Typography>
                <Typography>Price: ${car.price_per_day}/day</Typography>
                <Button component={Link} to={`/book/${car.id}`}>
                  Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function BookCar({ token }) {
  const [carId, setCarId] = useState(window.location.pathname.split("/")[2]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBook = async () => {
    try {
      await axios.post(
        "http://localhost:3000/bookings",
        { car_id: carId, start_date: startDate, end_date: endDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Booking created!");
    } catch (err) {
      alert(err.response.data.error);
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

function Profile({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data));
  }, [token]);

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">Booking History</Typography>
      {bookings.map((booking) => (
        <Box key={booking.id} mb={2}>
          <Typography>Car ID: {booking.car_id}</Typography>
          <Typography>From: {booking.start_date}</Typography>
          <Typography>To: {booking.end_date}</Typography>
        </Box>
      ))}
    </Container>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Box mb={2}>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/profile">
          Profile
        </Button>
      </Box>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/book/:id" element={<BookCar token={token} />} />
        <Route path="/profile" element={<Profile token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
