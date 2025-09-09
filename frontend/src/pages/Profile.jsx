import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";

function Profile({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get("/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookings(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <Container>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="h6">Booking History</Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings yet</Typography>
      ) : (
        bookings.map((booking) => (
          <Box key={booking.id} mb={2}>
            <Typography>Car ID: {booking.car_id}</Typography>
            <Typography>From: {booking.start_date}</Typography>
            <Typography>To: {booking.end_date}</Typography>
          </Box>
        ))
      )}
    </Container>
  );
}

export default Profile;
