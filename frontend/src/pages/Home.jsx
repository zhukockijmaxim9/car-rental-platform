import { useEffect, useState } from "react";
import { Container, Typography, TextField, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
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
                <Button component={Link} to={`/review/${car.id}`}>
                  Leave Review
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
