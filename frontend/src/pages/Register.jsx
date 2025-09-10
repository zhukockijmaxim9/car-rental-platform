import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3000/register", { name, email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      const errorMsg = err.response?.data?.errors
        ? err.response.data.errors.map((e) => e.msg).join(", ")
        : err.response?.data?.error || "Registration failed";
      alert(`Error: ${errorMsg}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <TextField label="Name" fullWidth margin="normal" onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
