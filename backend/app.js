const express = require("express");
const pool = require("./db");
const { generateToken } = require("./auth");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

app.use(express.json());

// Register
app.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 }), body("name").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "INSERT INTO clients (name, email, password) VALUES ($1, $2, $3) RETURNING id, role",
        [name, email, hashedPassword]
      );
      const user = result.rows[0];
      const token = generateToken(user);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM clients WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "OK", message: "Backend and DB connected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
