import { useEffect, useState } from "react";
import { Container, Typography, TextField, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";

function App() {
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
