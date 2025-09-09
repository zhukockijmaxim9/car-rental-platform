import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import BookCar from "./pages/BookCar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Review from "./pages/Review";

function ProtectedRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <NavBar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute token={token}>
              <BookCar token={token} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token}>
              <Profile token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/review/:id"
          element={
            <ProtectedRoute token={token}>
              <Review token={token} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
