import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
