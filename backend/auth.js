const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = "your-secret-key"; // В продакшене спрячь в .env

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };
